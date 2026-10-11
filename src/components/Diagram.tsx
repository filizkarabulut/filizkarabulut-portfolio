import type {
  Diagram as DiagramData,
  DiagramNode,
} from "@/data/portfolio";

/** Approx. monospace glyph advance relative to font-size, for wrapping. */
const CHAR_W = 0.62;
const FONT = 17; // viewBox units
const LINE_H = 20;

/** Greedy word-wrap so a label fits inside its box width. */
function wrapLabel(label: string, boxW: number): string[] {
  const maxChars = Math.max(6, Math.floor((boxW - 16) / (FONT * CHAR_W)));
  const words = label.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function NodeBox({ n }: { n: DiagramNode }) {
  const cx = n.x + n.w / 2;
  const cy = n.y + n.h / 2;
  const lines = wrapLabel(n.label, n.w);
  const startY = cy - ((lines.length - 1) * LINE_H) / 2;
  return (
    <g className="diagram-node">
      <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={10} />
      <text x={cx} y={startY} textAnchor="middle" dominantBaseline="middle">
        {lines.map((ln, i) => (
          <tspan key={i} x={cx} y={startY + i * LINE_H}>
            {ln}
          </tspan>
        ))}
      </text>
    </g>
  );
}

export function Diagram({ data }: { data: DiagramData }) {
  const byId = new Map(data.nodes.map((n) => [n.id, n]));

  return (
    <figure className="diagram">
      <div className="diagram-scroll">
        <svg
          viewBox={data.viewBox}
          role="img"
          aria-label={data.caption}
          className="diagram-svg"
        >
          <defs>
            <marker
              id="diagram-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="7"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L7,3 L0,6 Z" fill="currentColor" />
            </marker>
          </defs>

          {data.edges.map((e, i) => {
            const a = byId.get(e.from);
            const b = byId.get(e.to);
            if (!a || !b) return null;
            const rightward = b.x >= a.x;
            const sx = rightward ? a.x + a.w : a.x;
            const sy = a.y + a.h / 2;
            const tx = rightward ? b.x : b.x + b.w;
            const ty = b.y + b.h / 2;
            const midx = (sx + tx) / 2;
            const d = `M ${sx} ${sy} C ${midx} ${sy}, ${midx} ${ty}, ${tx} ${ty}`;
            return (
              <g key={i} className="diagram-edge">
                <path
                  d={d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeDasharray={e.dashed ? "6 5" : undefined}
                  markerEnd="url(#diagram-arrow)"
                />
                {e.label && (
                  <text
                    x={midx}
                    y={(sy + ty) / 2 - 7}
                    textAnchor="middle"
                    className="diagram-edge-label"
                  >
                    {e.label}
                  </text>
                )}
              </g>
            );
          })}

          {data.nodes.map((n) => (
            <NodeBox key={n.id} n={n} />
          ))}
        </svg>
      </div>
      <figcaption className="diagram-caption">{data.caption}</figcaption>
    </figure>
  );
}
