/**
 * Ask VALIANT's real multi-agent architecture, drawn as a compact vertical flow
 * so it fits in a column beside the demo video. Same pipeline as the horizontal
 * diagram — a user query is classified by the router, handled by one of three
 * assistants, with research questions running 3-tier faculty matching and a live
 * PubMed lookup, then a response is generated and logged. Sizing is em-relative
 * off the `.arch` font-size, so the enlarge view just scales that up.
 */
export function AskValiantArchitecture() {
  return (
    <div
      className="arch"
      role="img"
      aria-label="Architecture: a user query is classified by a router and handled by one of three assistants (main, research, follow-up). Research questions run a 3-tier faculty-matching cascade and a live PubMed lookup, then a response is generated and logged to the database and admin dashboard."
    >
      <div className="arch-row arch-row--1">
        <span className="arch-box">User query</span>
      </div>
      <span className="arch-arrow" aria-hidden="true">
        ↓
      </span>
      <div className="arch-row arch-row--1">
        <span className="arch-box arch-box--router">
          Router
          <small>classify intent</small>
        </span>
      </div>
      <span className="arch-arrow" aria-hidden="true">
        ↓
      </span>
      <div className="arch-row arch-row--3">
        <span className="arch-box">
          Main
          <small>info &amp; FAQs</small>
        </span>
        <span className="arch-box arch-box--key">
          Research
          <small>matching</small>
        </span>
        <span className="arch-box">
          Follow-up
          <small>context</small>
        </span>
      </div>
      <span className="arch-arrow" aria-hidden="true">
        ↓
      </span>
      <div className="arch-row arch-row--2">
        <span className="arch-box">
          Faculty matching
          <small>3-tier cascade</small>
        </span>
        <span className="arch-box">
          PubMed
          <small>live papers</small>
        </span>
      </div>
      <span className="arch-arrow" aria-hidden="true">
        ↓
      </span>
      <div className="arch-row arch-row--1">
        <span className="arch-box arch-box--resp">Response generation</span>
      </div>
      <span className="arch-arrow" aria-hidden="true">
        ↓
      </span>
      <div className="arch-row arch-row--2">
        <span className="arch-box arch-box--muted">
          Database
          <small>history &amp; analytics</small>
        </span>
        <span className="arch-box arch-box--muted">
          Admin
          <small>analytics &amp; errors</small>
        </span>
      </div>
    </div>
  );
}
