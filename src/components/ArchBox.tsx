/** A clickable architecture box (button) with hover/selected highlight. Shared
 *  by the Ask VALIANT and SpIQ diagrams. */
export function ArchBox({
  id,
  label,
  sub,
  accent,
  selected,
  onSelect,
}: {
  id: string;
  label: string;
  sub?: string;
  accent?: boolean;
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      className={`arch-box arch-box--btn${accent ? " arch-box--key" : ""}${
        selected === id ? " is-selected" : ""
      }`}
      aria-pressed={selected === id}
      onClick={() => onSelect(id)}
    >
      {label}
      {sub && <small>{sub}</small>}
    </button>
  );
}
