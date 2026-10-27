import { lkr } from "../data/categories";
import type { Planner } from "../hooks/usePlanner";
import { Button, Heading } from "../components/ui";

export function Shortlist({ planner: p, onBrowse }: { planner: Planner; onBrowse: () => void }) {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex justify-between items-end"><Heading>Shortlist</Heading><Button variant="secondary" onClick={() => window.print()}>Export / Print</Button></div>
      {p.saved.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-[#C9A24B] p-10 text-center">
          <div className="text-4xl text-[#C9A24B]">♡</div><p className="mt-2">No saved vendors yet.</p>
          <Button className="mt-4" onClick={onBrowse}>See recommendations</Button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl border border-[#E8E2DA] p-5">
            <div className="flex justify-between text-sm"><span>Estimated vs budget</span><span>{p.saved.length} vendors / {lkr(p.total)}</span></div>
            <div className="h-2 bg-[#E8E2DA] rounded mt-2"><div className="h-full bg-[#2A7F82] rounded" style={{ width: Math.min(100, p.saved.length * 15) + "%" }} /></div>
          </div>
          <ul className="space-y-2">{p.saved.map((n) => <li key={n} className="bg-white rounded-xl border border-[#E8E2DA] p-4 flex justify-between items-center"><span>{n}</span><Button variant="ghost" onClick={() => p.toggleSave(n)}>Remove</Button></li>)}</ul>
        </>
      )}
    </div>
  );
}
