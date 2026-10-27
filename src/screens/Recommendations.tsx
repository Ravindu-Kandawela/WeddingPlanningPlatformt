import { useState } from "react";
import { CATS } from "../data/categories";
import { getVendors, MODEL_LABELS, type Model } from "../data/vendors";
import type { Planner } from "../hooks/usePlanner";
import { VendorCard } from "../components/VendorCard";
import { Chip, Heading } from "../components/ui";

export function Recommendations({ planner: p }: { planner: Planner }) {
  const [both, setBoth] = useState(false);
  const [model, setModel] = useState<Model>(1);
  const [cat, setCat] = useState(0);
  const models: Model[] = both ? [1, 2] : [model];
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Heading>Your matches</Heading>
        <label className="flex items-center gap-2 text-sm min-h-11"><input type="checkbox" checked={both} onChange={(e) => setBoth(e.target.checked)} className="w-5 h-5 accent-[#2A7F82]" />Show both models side by side</label>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">{CATS.map((c, i) => <Chip key={c.k} tone="teal" label={`${c.i} ${c.k}`} selected={cat === i} onClick={() => setCat(i)} />)}</div>
      {!both && (
        <div role="tablist" className="grid grid-cols-2 border-b border-[#E8E2DA]">
          {([1, 2] as Model[]).map((m) => <button key={m} role="tab" aria-selected={model === m} onClick={() => setModel(m)} className={`min-h-11 text-sm font-medium border-b-2 ${model === m ? "border-[#7A1F3D] text-[#7A1F3D]" : "border-transparent text-[#6b6460]"}`}>{MODEL_LABELS[m]}</button>)}
        </div>
      )}
      <div className={both ? "grid md:grid-cols-2 gap-6" : ""}>
        {models.map((m) => (
          <section key={m}>
            {both && <h3 className="font-serif text-xl mb-3 text-[#7A1F3D]">{MODEL_LABELS[m]}</h3>}
            <div className={`grid gap-4 sm:grid-cols-2 ${both ? "" : "lg:grid-cols-3"}`}>
              {getVendors(cat, m, p.budgets[cat]).map((v) => <VendorCard key={v.name} vendor={v} budget={p.budgets[cat]} saved={p.saved.includes(v.name)} onToggleSave={() => p.toggleSave(v.name)} />)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
