import { useState } from "react";
import type { Screen } from "./data/categories";
import { usePlanner } from "./hooks/usePlanner";
import { Header } from "./components/layout/Header";
import { BottomTabBar } from "./components/layout/BottomTabBar";
import { Toast } from "./components/ui";
import { Landing } from "./screens/Landing";
import { Login } from "./screens/Login";
import { BudgetPlanner } from "./screens/BudgetPlanner";
import { StylePreferences } from "./screens/StylePreferences";
import { Recommendations } from "./screens/Recommendations";
import { Shortlist } from "./screens/Shortlist";

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const planner = usePlanner();
  const go = (s: Screen) => { setScreen(s); window.scrollTo(0, 0); };

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#2B2B2B] font-sans pb-20 md:pb-0">
      <Header screen={screen} savedCount={planner.saved.length} go={go} />
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        {screen === "landing" && <Landing onStart={() => go("login")} />}
        {screen === "login" && <Login onSuccess={() => go("budget")} />}
        {screen === "budget" && <BudgetPlanner planner={planner} onNext={() => go("style")} />}
        {screen === "style" && <StylePreferences planner={planner} onNext={() => go("recs")} />}
        {screen === "recs" && <Recommendations planner={planner} />}
        {screen === "shortlist" && <Shortlist planner={planner} onBrowse={() => go("recs")} />}
      </main>
      <BottomTabBar screen={screen} go={go} />
      <Toast message={planner.toast} />
    </div>
  );
}
