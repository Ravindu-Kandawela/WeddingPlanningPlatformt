import type { Screen } from "../../data/categories";
import { Button } from "../ui";

const LINKS: [Screen, string][] = [["budget", "Budget"], ["style", "Style"], ["recs", "Recommendations"], ["shortlist", "Shortlist"]];

export function Header({ screen, savedCount, go }: { screen: Screen; savedCount: number; go: (s: Screen) => void }) {
  return (
    <header className="sticky top-0 z-20 bg-[#FBF7F2]/95 backdrop-blur border-b border-[#E8E2DA]">
      <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => go("landing")} className="font-serif text-2xl text-[#7A1F3D]">Vivaha <span className="text-[#C9A24B]">Galle</span></button>
        <nav className="hidden md:flex gap-1 text-sm">
          {LINKS.map(([x, l]) => <Button key={x} variant="ghost" onClick={() => go(x)} className={screen === x ? "!text-[#7A1F3D] font-semibold" : ""}>{x === "shortlist" ? `${l} (${savedCount})` : l}</Button>)}
        </nav>
        <div className="flex items-center gap-2">
          <select aria-label="Language" className="h-11 rounded-lg border border-[#E8E2DA] bg-white px-2 text-sm"><option>EN</option><option>සිං</option><option>தமி</option></select>
          <Button variant="secondary" className="hidden sm:block" onClick={() => go("login")}>Log in</Button>
        </div>
      </div>
    </header>
  );
}
