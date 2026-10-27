import { CATS, COLORS, PRESETS, lkr } from "../data/categories";
import type { Planner } from "../hooks/usePlanner";
import { DonutChart } from "../components/DonutChart";
import { Button, Heading, TextField } from "../components/ui";

export function BudgetPlanner({ planner: p, onNext }: { planner: Planner; onNext: () => void }) {
  return (
    <div className="grid md:grid-cols-12 gap-6">
      <div className="md:col-span-8 space-y-4">
        <Heading>Budget planner</Heading>
        <p className="text-[#6b6460]">Spend more on the hotel, less on the cake: set each category separately.</p>
        <div className="flex gap-2 flex-wrap">{Object.keys(PRESETS).map((k) => <Button key={k} variant="secondary" onClick={() => p.setBudgets(PRESETS[k])}>{k}</Button>)}</div>
        {CATS.map((c, i) => {
          const error = p.budgets[i] < 10000 ? "Enter at least LKR 10,000 for this category." : undefined;
          return (
            <div key={c.k} className="bg-white rounded-xl border border-[#E8E2DA] p-4">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 grid place-items-center rounded-full text-xl text-white" style={{ background: COLORS[i] }}>{c.i}</span>
                <span className="font-medium flex-1">{c.k}</span>
                <div className="w-36"><TextField aria-label={`${c.k} budget`} type="number" value={p.budgets[i]} error={error} className="text-right" onChange={(e) => p.setBudget(i, +e.target.value)} /></div>
              </div>
              <input type="range" aria-label={`${c.k} budget slider`} min={0} max={2500000} step={10000} value={p.budgets[i]} onChange={(e) => p.setBudget(i, +e.target.value)} className="w-full mt-3 accent-[#7A1F3D] h-11" />
              {error && <p className="text-[13px] text-[#C62828]">{error}</p>}
            </div>
          );
        })}
      </div>
      <aside className="md:col-span-4">
        <div className="md:sticky md:top-24 bg-white rounded-xl border border-[#E8E2DA] p-6 text-center">
          <div className="text-[13px] uppercase tracking-wide text-[#6b6460]">Total budget</div>
          <div className="font-serif text-3xl text-[#7A1F3D] mt-1">{lkr(p.total)}</div>
          <DonutChart values={p.budgets} />
          <ul className="text-sm space-y-1 text-left">{CATS.map((c, i) => <li key={c.k} className="flex justify-between"><span><span className="inline-block w-2.5 h-2.5 rounded-full mr-2" style={{ background: COLORS[i] }} />{c.k}</span><span>{Math.round((p.budgets[i] / (p.total || 1)) * 100)}%</span></li>)}</ul>
          <Button className="w-full mt-6" onClick={onNext}>Next: Style</Button>
        </div>
      </aside>
    </div>
  );
}
