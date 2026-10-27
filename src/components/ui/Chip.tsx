export function Chip({ label, selected, onClick, tone = "maroon" }: { label: string; selected: boolean; onClick: () => void; tone?: "maroon" | "teal" }) {
  const on = tone === "teal" ? "bg-[#2A7F82] text-white border-[#2A7F82]" : "bg-[#7A1F3D] text-white border-[#7A1F3D]";
  return <button aria-pressed={selected} onClick={onClick} className={`min-h-11 px-4 rounded-full border text-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] ${selected ? on : "bg-white border-[#E8E2DA] hover:border-[#7A1F3D]"}`}>{label}</button>;
}
