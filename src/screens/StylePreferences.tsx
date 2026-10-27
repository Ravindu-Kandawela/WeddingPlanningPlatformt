import { CATS } from "../data/categories";
import type { Planner } from "../hooks/usePlanner";
import { Button, Chip, Heading, TextField } from "../components/ui";

export function StylePreferences({ planner: p, onNext }: { planner: Planner; onNext: () => void }) {
  return (
    <div className="space-y-6 max-w-3xl">
      <Heading>Style preferences</Heading>
      <div className="grid grid-cols-2 gap-4"><TextField label="Guest count" type="number" defaultValue={250} /><TextField label="Wedding date" type="date" /></div>
      {CATS.map((c) => (
        <div key={c.k}>
          <h3 className="font-serif text-2xl mb-2">{c.k}</h3>
          <div className="flex flex-wrap gap-2">{c.tags.map((t) => <Chip key={t} label={t} selected={!!p.prefs[c.k]?.includes(t)} onClick={() => p.togglePref(c.k, t)} />)}</div>
        </div>
      ))}
      <Button onClick={onNext}>Get recommendations</Button>
    </div>
  );
}
