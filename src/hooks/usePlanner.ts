import { useState } from "react";
import { PRESETS } from "../data/categories";

export function usePlanner() {
  const [budgets, setBudgets] = useState(PRESETS.Balanced);
  const [prefs, setPrefs] = useState<Record<string, string[]>>({ Hotels: ["Outdoor", "Beachfront"], Photography: ["Candid"] });
  const [saved, setSaved] = useState<string[]>([]);
  const [toast, setToast] = useState("");

  const setBudget = (i: number, v: number) => setBudgets((b) => b.map((x, j) => (j === i ? v : x)));
  const togglePref = (cat: string, tag: string) =>
    setPrefs((p) => ({ ...p, [cat]: p[cat]?.includes(tag) ? p[cat].filter((x) => x !== tag) : [...(p[cat] || []), tag] }));
  const toggleSave = (name: string) => {
    const was = saved.includes(name);
    setSaved((p) => (was ? p.filter((x) => x !== name) : [...p, name]));
    setToast(was ? "Removed from shortlist" : "Saved to shortlist");
    setTimeout(() => setToast(""), 2000);
  };
  const total = budgets.reduce((a, c) => a + c, 0);
  return { budgets, setBudgets, setBudget, prefs, togglePref, saved, toggleSave, toast, total };
}
export type Planner = ReturnType<typeof usePlanner>;
