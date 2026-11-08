import type { NodeDetail } from "./architectureNodes";

/**
 * Explanations for SpIQ's clickable architecture nodes. Drawn from the SpIQ deck
 * (the Mehrabian framing, the model-architecture and pipeline slides) and the
 * project's existing stack — no invented implementation details. SpIQ's source
 * isn't mirrored here, so these panels are text-only (no code excerpts).
 */
export const SPIQ_NODE_DETAILS: Record<string, NodeDetail> = {
  visual: {
    title: "Visual Model",
    summary:
      "Reads visual delivery from webcam video — facial expressions, eye contact/gaze, posture, and gestures — the channel that carries most of a message.",
    details: [
      "Built with MediaPipe and OpenCV: each frame yields facial and pose landmarks, from which behavioral signals are derived and tracked over rolling windows — one frame says little, so patterns are read over time.",
      "In Mehrabian's framing, visual cues account for ~55% of how a message lands, so this is the most heavily weighted channel.",
    ],
  },
  vocal: {
    title: "Vocal Model",
    summary:
      "Analyzes how you sound — pitch, pace, tone, and pauses — from the audio track.",
    details: [
      "Speech is transcribed with Whisper and the audio is analyzed for prosodic signals (pacing, pitch variation, pauses).",
      "Vocal delivery accounts for ~38% of how a message is received in Mehrabian's framing — far more than the words themselves.",
    ],
  },
  verbal: {
    title: "Verbal Model",
    summary:
      "Evaluates what you actually say — word choice, structure, clarity, and coherence — using GPT.",
    details: [
      "Though verbal content is only ~7% of perceived delivery, it grounds the feedback in the words and the question context so coaching stays specific.",
    ],
  },
  fusion: {
    title: "Fusion Layer",
    summary:
      "Combines the visual, vocal, and verbal channels — measuring cross-channel alignment and a congruence score — into the final score, breakdown, and coaching.",
    details: [
      "Delivery is scored as a whole rather than per channel: the fusion layer checks whether the channels agree — e.g. confident words matched by confident delivery — and surfaces where they don't.",
      "This is why evaluation has to be context-aware: the same behavior means different things across roles, industries, and seniority, and a label like \"confident\" is relative, not absolute.",
    ],
  },
};
