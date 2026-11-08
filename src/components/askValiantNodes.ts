import type { CodeExcerpt } from "@/data/portfolio";

/**
 * Explanations for the clickable architecture nodes. Every detail here is drawn
 * from the actual Ask VALIANT implementation (app.py: route_query /
 * ROUTER_SYSTEM_PROMPT, match_faculty, and the chat dispatch) — nothing invented.
 *
 * `summary` is the 1–2 sentence blurb shown immediately; `details` + `code` live
 * behind a collapsed "View technical details" toggle for interested visitors.
 */
export interface NodeDetail {
  title: string;
  /** 1–2 sentence technical purpose, shown immediately on select. */
  summary: string;
  /** Deeper explanation, revealed by the "View technical details" toggle. */
  details?: string[];
  /** Optional faithful (lightly trimmed) code excerpt, shown with the details. */
  code?: CodeExcerpt;
}

/** The ids of the interactive boxes, in reading order. */
export const INTERACTIVE_NODES = [
  "router",
  "main",
  "research",
  "followup",
  "matching",
] as const;
export type NodeId = (typeof INTERACTIVE_NODES)[number];

export const NODE_DETAILS: Record<NodeId, NodeDetail> = {
  router: {
    title: "Router",
    summary:
      "A dedicated LLM router reads the full conversation and classifies each message into one of four intents, dispatching it to the right assistant.",
    details: [
      "Intents are SIMPLE_QUERY, RESEARCH_QUERY, FOLLOW_UP, and NEEDS_CLARIFICATION. Most of the logic is follow-up detection — pronouns (\"summarize this\"), affirmatives (\"yes please\"), or references to earlier turns — so follow-ups are answered from context and skip re-searching and re-matching faculty.",
      "It returns strict JSON and falls back to SIMPLE_QUERY if parsing fails.",
    ],
    code: {
      filename: "app.py · route_query",
      language: "python",
      snippet: `def route_query(user_message, history, profile=None):
    msgs = [{"role": "system", "content": ROUTER_SYSTEM_PROMPT}]
    msgs += history                       # full conversation context
    msgs.append({"role": "user", "content": user_message})

    resp, ok = call_amplify_api(msgs, ROUTER_ASSISTANT_ID, user_message)
    if not ok:
        return {"decision": "SIMPLE_QUERY", ...}   # safe default
    return json.loads(resp)
    # -> {decision, is_follow_up, references_message_index,
    #     previous_assistant}`,
    },
  },
  main: {
    title: "Main Assistant",
    summary:
      "Answers general VALIANT questions (programs, membership, events) by searching pre-loaded site content.",
    details: [
      "Routed the SIMPLE_QUERY intent. It pulls relevant passages from the in-memory VALIANT site content, then responds with that context and include_faculty=False.",
    ],
  },
  research: {
    title: "Research Assistant",
    summary:
      "Handles research questions with a multi-pass pipeline: match faculty → fetch their recent PubMed papers → compose a cited answer.",
    details: [
      "Pass 1 runs the 3-tier faculty match. Pass 2 pulls each match's recent PubMed papers (default 2 each, or a count parsed from the query like \"list 10 papers\"). Pass 3 composes the response citing the matched faculty and publications. If nothing matches, it points the user to VALIANT directly rather than guessing.",
    ],
    code: {
      filename: "app.py · RESEARCH_QUERY",
      language: "python",
      snippet: `# PASS 1 — match faculty from the database
matched_faculty, method = match_faculty(user_message, profile)

# PASS 2 — recent PubMed papers for each match
publications = fetch_pubmed(matched_faculty, papers_per_faculty)

# PASS 3 — answer with faculty + cited publications
answer = call_amplify_api(history, RESEARCH_ASSISTANT_ID,
                          user_message, matched_faculty=matched_faculty,
                          publications=publications)`,
    },
  },
  followup: {
    title: "Follow-up Assistant",
    summary:
      "Answers follow-ups (\"summarize that\", \"yes please\") purely from conversation context, skipping faculty matching and PubMed for instant replies.",
    details: [
      "Routed the FOLLOW_UP intent with include_faculty=False. If the recent turns offered a faculty list, it supplies the relevant slice of the database so a bare \"yes\" resolves correctly.",
    ],
  },
  matching: {
    title: "Faculty Matching",
    summary:
      "A 3-tier cascade — keyword match → research-area text search → LLM department fallback — that stops at the first tier confident enough to answer.",
    details: [
      "An explicit \"Dr. X\" mention short-circuits all tiers. Tier 1 matches extracted query keywords against curated research keywords (≥2 hits). Tier 2 falls back to a text search over full research-area descriptions. Tier 3 falls back to an LLM department match so no query goes unanswered. A score-gap filter keeps only clearly-relevant results, and the tier used is recorded for the admin dashboard.",
    ],
    code: {
      filename: "app.py · match_faculty",
      language: "python",
      snippet: `kws = extract_query_keywords(user_message)   # drop stop/generic words

# TIER 1 — research keywords (exact)
if tier1 and tier1[0].score >= 2:            # need >= 2 keyword hits
    min_score = max(2, top_score * 0.5)      # score-gap filter
    return top3(tier1, min_score), "Research Keywords"

# TIER 2 — research-area text (semantic)
if tier2:
    return top3(tier2, min_score), "Research Area"

# TIER 3 — department fallback (LLM)
return llm_department_match(user_message), "Department"`,
    },
  },
};
