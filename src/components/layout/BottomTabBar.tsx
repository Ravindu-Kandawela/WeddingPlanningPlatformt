import type { Screen } from "../../data/categories";
const TABS: [Screen, string][] = [["budget", "Budget"], ["style", "Style"], ["recs", "Matches"], ["shortlist", "Saved"]];
export function BottomTabBar({ screen, go }: { screen: Screen; go: (s: Screen) => void }) {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-[#E8E2DA] grid grid-cols-4 z-20">
      {TABS.map(([x, l]) => <button key={x} onClick={() => go(x)} aria-current={screen === x ? "page" : undefined} className={`min-h-14 text-[13px] ${screen === x ? "text-[#7A1F3D] font-semibold" : "text-[#6b6460]"}`}>{l}</button>)}
    </nav>
  );
}
