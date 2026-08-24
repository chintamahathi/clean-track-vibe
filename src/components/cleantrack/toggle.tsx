/** Pill switch used across settings screens. */
export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${
        checked ? "bg-emerald" : "bg-forest/15"
      }`}
    >
      <span
        className={`absolute top-1 size-5 rounded-full bg-cream shadow transition-all duration-300 ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}
