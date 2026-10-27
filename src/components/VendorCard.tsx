import { lkr } from "../data/categories";
import type { Vendor } from "../data/vendors";
import { Button } from "./ui";

interface Props { vendor: Vendor; budget: number; saved: boolean; onToggleSave: () => void }

export function VendorCard({ vendor: v, budget, saved, onToggleSave }: Props) {
  const over = v.price > budget;
  const pct = Math.min(100, (v.price / budget) * 100);
  return (
    <article className="bg-white rounded-xl shadow-[0_2px_12px_rgba(43,43,43,0.06)] border border-[#E8E2DA] overflow-hidden">
      <div className="h-32 bg-gradient-to-br from-[#2A7F82]/30 via-[#C9A24B]/20 to-[#7A1F3D]/30 relative">
        <span className="absolute top-2 left-2 bg-white/95 text-[#7A1F3D] text-[13px] font-semibold px-2 py-1 rounded-md">{v.score}% match</span>
        <button aria-label={saved ? "Remove from shortlist" : "Save"} onClick={onToggleSave} className="absolute top-1 right-1 w-11 h-11 rounded-full text-xl text-[#7A1F3D] focus-visible:ring-2 focus-visible:ring-[#C9A24B]">{saved ? "♥" : "♡"}</button>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-serif text-lg">{v.name}</h3>
        <p className="text-[13px] text-[#6b6460]">{v.area}, Galle</p>
        <div className="text-sm flex justify-between"><span>{lkr(v.price)}</span><span className={over ? "text-[#C62828]" : "text-[#2E7D32]"}>{over ? "Over budget" : "Within budget"}</span></div>
        <div className="h-1.5 bg-[#E8E2DA] rounded"><div className="h-full rounded" style={{ width: pct + "%", background: over ? "#C62828" : "#2E7D32" }} /></div>
        <div className="flex gap-1 flex-wrap">{v.tags.map((t) => <span key={t} className="text-[12px] bg-[#2A7F82]/10 text-[#1f6366] px-2 py-0.5 rounded-full">{t}</span>)}</div>
        <p className="text-[13px] text-[#6b6460] italic border-t border-[#C9A24B]/40 pt-2">Why this? {v.why}</p>
        <Button variant="secondary" className="w-full">View</Button>
      </div>
    </article>
  );
}
