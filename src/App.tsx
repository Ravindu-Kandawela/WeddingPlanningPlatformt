import { useState } from "react";

const CATS = [
  { k: "Hotels", i: "⌂", tags: ["Outdoor", "Beachfront", "Indoor Ballroom", "Heritage"] },
  { k: "Salons", i: "✂", tags: ["Bridal Classic", "Modern", "Traditional Kandyan"] },
  { k: "Photography", i: "◎", tags: ["Candid", "Cinematic", "Traditional", "Drone"] },
  { k: "Decorations", i: "❀", tags: ["Traditional", "Floral", "Minimalist", "Modern"] },
  { k: "Costumes", i: "♢", tags: ["Saree", "Osari", "Western", "Kandyan"] },
  { k: "Cakes", i: "◇", tags: ["Classic tiered", "Fondant", "Fusion", "Minimal"] },
];
const COLORS = ["#7A1F3D", "#C9A24B", "#2A7F82", "#B5577A", "#8A6D2E", "#5FA8AA"];
const PRESETS: Record<string, number[]> = {
  Balanced: [1200000, 250000, 350000, 300000, 250000, 100000],
  "Venue-focused": [1800000, 200000, 250000, 250000, 200000, 80000],
  "Photography-focused": [1000000, 200000, 700000, 250000, 200000, 80000],
};
const AREAS = ["Galle Fort", "Unawatuna", "Hikkaduwa", "Habaraduwa", "Karapitiya"];
const lkr = (n: number) => "LKR " + n.toLocaleString("en-LK");
type Screen = "landing" | "login" | "budget" | "style" | "recs" | "shortlist";

const Btn = ({ v = "primary", ...p }: any) => (
  <button {...p} className={`min-h-11 px-5 rounded-lg font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] focus-visible:ring-offset-2 disabled:opacity-40 ${v === "primary" ? "bg-[#7A1F3D] text-white hover:bg-[#5f1730]" : v === "secondary" ? "border border-[#7A1F3D] text-[#7A1F3D] hover:bg-[#7A1F3D]/5" : "text-[#2A7F82] hover:bg-[#2A7F82]/10"} ${p.className || ""}`} />
);
const H = ({ c, children }: any) => <h2 className={`font-serif text-[32px] leading-10 ${c || ""}`}>{children}</h2>;

function vendors(cat: number, model: 1 | 2, budget: number) {
  return [0, 1, 2].map((j) => {
    const price = Math.round(budget * [0.82, 0.97, 1.12][(j + model) % 3]);
    return {
      name: `${["Lighthouse", "Coral Bay", "Fort Heritage", "Jungle Beach", "Rampart"][(cat + j + model) % 5]} ${CATS[cat].k.replace(/s$/, "")}`,
      area: AREAS[(cat * 2 + j + model) % 5], price,
      score: model === 1 ? 91 - j * 6 - cat : 94 - j * 5 - cat,
      tags: CATS[cat].tags.slice(j % 2, (j % 2) + 2),
      why: model === 1 ? `Chosen by ${9 - j * 2} couples with a similar budget` : `${94 - j * 5}% match with ${CATS[cat].tags.slice(0, 2).join(" + ")}`,
    };
  });
}

export default function App() {
  const [s, setS] = useState<Screen>("landing");
  const [b, setB] = useState(PRESETS.Balanced);
  const [prefs, setPrefs] = useState<Record<string, string[]>>({ Hotels: ["Outdoor", "Beachfront"], Photography: ["Candid"] });
  const [saved, setSaved] = useState<string[]>([]);
  const [both, setBoth] = useState(false);
  const [model, setModel] = useState<1 | 2>(1);
  const [cat, setCat] = useState(0);
  const [toast, setToast] = useState("");
  const total = b.reduce((a, c) => a + c, 0);
  const go = (x: Screen) => { setS(x); window.scrollTo(0, 0); };
  const toggleSave = (n: string) => { setSaved((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n])); setToast(saved.includes(n) ? "Removed from shortlist" : "Saved to shortlist"); setTimeout(() => setToast(""), 2000); };

  let acc = 0;
  const donut = `conic-gradient(${b.map((v, i) => { const a = acc; acc += (v / total) * 360; return `${COLORS[i]} ${a}deg ${acc}deg`; }).join(",")})`;

  const Card = ({ v, m }: any) => {
    const over = v.price > b[cat];
    const pct = Math.min(100, (v.price / b[cat]) * 100);
    return (
      <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(43,43,43,0.06)] border border-[#E8E2DA] overflow-hidden">
        <div className="h-32 bg-gradient-to-br from-[#2A7F82]/30 via-[#C9A24B]/20 to-[#7A1F3D]/30 relative">
          <span className="absolute top-2 left-2 bg-white/95 text-[#7A1F3D] text-[13px] font-semibold px-2 py-1 rounded-md">{v.score}% match</span>
          <button aria-label="Save" onClick={() => toggleSave(v.name)} className="absolute top-1 right-1 w-11 h-11 rounded-full text-xl text-[#7A1F3D] focus-visible:ring-2 focus-visible:ring-[#C9A24B]">{saved.includes(v.name) ? "♥" : "♡"}</button>
        </div>
        <div className="p-4 space-y-2">
          <div className="font-serif text-lg">{v.name}</div>
          <div className="text-[13px] text-[#6b6460]">{v.area}, Galle</div>
          <div className="text-sm flex justify-between"><span>{lkr(v.price)}</span><span className={over ? "text-[#C62828]" : "text-[#2E7D32]"}>{over ? "Over budget" : "Within budget"}</span></div>
          <div className="h-1.5 bg-[#E8E2DA] rounded"><div className="h-full rounded" style={{ width: pct + "%", background: over ? "#C62828" : "#2E7D32" }} /></div>
          <div className="flex gap-1 flex-wrap">{v.tags.map((t: string) => <span key={t} className="text-[12px] bg-[#2A7F82]/10 text-[#1f6366] px-2 py-0.5 rounded-full">{t}</span>)}</div>
          <div className="text-[13px] text-[#6b6460] italic border-t border-[#C9A24B]/40 pt-2">Why this? {v.why}</div>
          <Btn v="secondary" className="w-full">View</Btn>
        </div>
        <span className="sr-only">Model {m}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FBF7F2] text-[#2B2B2B] font-sans pb-20 md:pb-0">
      <header className="sticky top-0 z-20 bg-[#FBF7F2]/95 backdrop-blur border-b border-[#E8E2DA]">
        <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => go("landing")} className="font-serif text-2xl text-[#7A1F3D]">Vivaha <span className="text-[#C9A24B]">Galle</span></button>
          <nav className="hidden md:flex gap-1 text-sm">
            {(["budget", "style", "recs", "shortlist"] as Screen[]).map((x) => <Btn key={x} v="ghost" onClick={() => go(x)} className={s === x ? "!text-[#7A1F3D] font-semibold" : ""}>{{ budget: "Budget", style: "Style", recs: "Recommendations", shortlist: `Shortlist (${saved.length})` }[x as "budget"]}</Btn>)}
          </nav>
          <div className="flex items-center gap-2">
            <select aria-label="Language" className="h-11 rounded-lg border border-[#E8E2DA] bg-white px-2 text-sm"><option>EN</option><option>සිං</option><option>தமி</option></select>
            <Btn v="secondary" className="hidden sm:block" onClick={() => go("login")}>Log in</Btn>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 py-8">
        {s === "landing" && (
          <div className="space-y-16">
            <section className="rounded-xl overflow-hidden relative bg-gradient-to-br from-[#7A1F3D] via-[#8d3550] to-[#2A7F82] text-white p-8 md:p-16">
              <p className="text-[#E8C877] tracking-widest text-xs uppercase">Galle District, Sri Lanka</p>
              <h1 className="font-serif text-[36px] leading-[44px] md:text-[44px] md:leading-[52px] max-w-xl mt-3">Plan your Galle wedding, one budget at a time</h1>
              <p className="mt-4 max-w-md text-white/85">Set a separate budget for each category and get matched with local vendors by two recommendation models.</p>
              <Btn onClick={() => go("login")} className="mt-8 !bg-[#C9A24B] !text-[#2B2B2B] hover:!bg-[#d6b363]">Start planning</Btn>
            </section>
            <section><H c="text-center mb-8">How it works</H>
              <div className="grid md:grid-cols-3 gap-4">{["Set budgets", "Pick your style", "Get matched"].map((t, i) => <div key={t} className="bg-white rounded-xl p-6 border border-[#E8E2DA]"><div className="font-serif text-3xl text-[#C9A24B]">0{i + 1}</div><h3 className="font-serif text-2xl mt-2">{t}</h3><p className="text-[#6b6460] mt-1">{["One budget per category, in LKR.", "Outdoor, candid, Kandyan and more.", "Compare KNN and style-match picks."][i]}</p></div>)}</div>
            </section>
            <section className="grid grid-cols-2 md:grid-cols-6 gap-3">{CATS.map((c) => <div key={c.k} className="bg-white rounded-xl p-5 text-center border border-[#E8E2DA]"><div className="text-3xl text-[#7A1F3D]">{c.i}</div><div className="mt-2 font-medium">{c.k}</div></div>)}</section>
            <blockquote className="text-center font-serif text-2xl max-w-2xl mx-auto">"We spent on the beachfront venue and saved on the cake. Exactly how we wanted it." <footer className="text-sm font-sans text-[#6b6460] mt-3">Nadeesha & Ruwan, Unawatuna</footer></blockquote>
          </div>
        )}

        {s === "login" && (
          <div className="max-w-md mx-auto bg-white rounded-xl border border-[#E8E2DA] p-6 space-y-4">
            <H>Welcome</H>
            <div role="tablist" className="grid grid-cols-2 bg-[#FBF7F2] rounded-lg p-1"><button className="min-h-11 rounded-md bg-white shadow font-medium">I'm a couple</button><button className="min-h-11 rounded-md text-[#6b6460]">I'm a vendor</button></div>
            {["Email", "Password"].map((l) => <label key={l} className="block text-sm font-medium">{l}<input type={l === "Password" ? "password" : "email"} className="mt-1 w-full h-11 rounded-lg border border-[#E8E2DA] px-3 focus:outline-none focus:ring-2 focus:ring-[#C9A24B]" /></label>)}
            <Btn className="w-full" onClick={() => go("budget")}>Create account</Btn>
            <Btn v="secondary" className="w-full">Continue with Google</Btn>
          </div>
        )}

        {s === "budget" && (
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-8 space-y-4">
              <H>Budget planner</H>
              <p className="text-[#6b6460]">Spend more on the hotel, less on the cake: set each category separately.</p>
              <div className="flex gap-2 flex-wrap">{Object.keys(PRESETS).map((p) => <Btn key={p} v="secondary" onClick={() => setB(PRESETS[p])}>{p}</Btn>)}</div>
              {CATS.map((c, i) => {
                const err = b[i] < 10000;
                return (
                  <div key={c.k} className="bg-white rounded-xl border border-[#E8E2DA] p-4">
                    <div className="flex items-center gap-3"><span className="w-11 h-11 grid place-items-center rounded-full text-xl text-white" style={{ background: COLORS[i] }}>{c.i}</span><span className="font-medium flex-1">{c.k}</span>
                      <input aria-label={c.k + " budget"} type="number" value={b[i]} onChange={(e) => setB(b.map((x, j) => (j === i ? +e.target.value : x)))} className={`w-36 h-11 rounded-lg border px-3 text-right focus:outline-none focus:ring-2 ${err ? "border-[#C62828] focus:ring-[#C62828]" : "border-[#E8E2DA] focus:ring-[#C9A24B]"}`} /></div>
                    <input type="range" min={0} max={2500000} step={10000} value={b[i]} onChange={(e) => setB(b.map((x, j) => (j === i ? +e.target.value : x)))} className="w-full mt-3 accent-[#7A1F3D] h-11" />
                    {err && <p className="text-[13px] text-[#C62828]">Enter at least LKR 10,000 for this category.</p>}
                  </div>
                );
              })}
            </div>
            <aside className="md:col-span-4"><div className="md:sticky md:top-24 bg-white rounded-xl border border-[#E8E2DA] p-6 text-center">
              <div className="text-[13px] uppercase tracking-wide text-[#6b6460]">Total budget</div>
              <div className="font-serif text-3xl text-[#7A1F3D] mt-1">{lkr(total)}</div>
              <div className="w-44 h-44 rounded-full mx-auto my-6 grid place-items-center" style={{ background: donut }}><div className="w-28 h-28 rounded-full bg-white" /></div>
              <ul className="text-sm space-y-1 text-left">{CATS.map((c, i) => <li key={c.k} className="flex justify-between"><span><span className="inline-block w-2.5 h-2.5 rounded-full mr-2" style={{ background: COLORS[i] }} />{c.k}</span><span>{Math.round((b[i] / total) * 100)}%</span></li>)}</ul>
              <Btn className="w-full mt-6" onClick={() => go("style")}>Next: Style</Btn>
            </div></aside>
          </div>
        )}

        {s === "style" && (
          <div className="space-y-6 max-w-3xl">
            <H>Style preferences</H>
            <div className="grid grid-cols-2 gap-4"><label className="text-sm font-medium">Guest count<input type="number" defaultValue={250} className="mt-1 w-full h-11 rounded-lg border border-[#E8E2DA] px-3" /></label><label className="text-sm font-medium">Wedding date<input type="date" className="mt-1 w-full h-11 rounded-lg border border-[#E8E2DA] px-3" /></label></div>
            {CATS.map((c) => <div key={c.k}><h3 className="font-serif text-2xl mb-2">{c.k}</h3><div className="flex flex-wrap gap-2">{c.tags.map((t) => { const on = prefs[c.k]?.includes(t); return <button key={t} aria-pressed={on} onClick={() => setPrefs({ ...prefs, [c.k]: on ? prefs[c.k].filter((x) => x !== t) : [...(prefs[c.k] || []), t] })} className={`min-h-11 px-4 rounded-full border text-sm focus-visible:ring-2 focus-visible:ring-[#C9A24B] ${on ? "bg-[#7A1F3D] text-white border-[#7A1F3D]" : "bg-white border-[#E8E2DA] hover:border-[#7A1F3D]"}`}>{t}</button>; })}</div></div>)}
            <Btn onClick={() => go("recs")}>Get recommendations</Btn>
          </div>
        )}

        {s === "recs" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4"><H>Your matches</H>
              <label className="flex items-center gap-2 text-sm min-h-11"><input type="checkbox" checked={both} onChange={(e) => setBoth(e.target.checked)} className="w-5 h-5 accent-[#2A7F82]" />Show both models side by side</label></div>
            <div className="flex gap-2 overflow-x-auto pb-1">{CATS.map((c, i) => <button key={c.k} onClick={() => setCat(i)} className={`min-h-11 px-4 rounded-full whitespace-nowrap text-sm border ${cat === i ? "bg-[#2A7F82] text-white border-[#2A7F82]" : "bg-white border-[#E8E2DA]"}`}>{c.i} {c.k}</button>)}</div>
            {!both && <div role="tablist" className="grid grid-cols-2 border-b border-[#E8E2DA]">{[1, 2].map((m) => <button key={m} onClick={() => setModel(m as 1)} className={`min-h-11 text-sm font-medium border-b-2 ${model === m ? "border-[#7A1F3D] text-[#7A1F3D]" : "border-transparent text-[#6b6460]"}`}>{m === 1 ? "Model 1: Similar Couples (KNN)" : "Model 2: Style Match (Content-Based)"}</button>)}</div>}
            <div className={both ? "grid md:grid-cols-2 gap-6" : ""}>
              {(both ? [1, 2] : [model]).map((m) => <div key={m}>{both && <h3 className="font-serif text-xl mb-3 text-[#7A1F3D]">{m === 1 ? "Model 1: Similar Couples (KNN)" : "Model 2: Style Match"}</h3>}
                <div className={`grid gap-4 ${both ? "sm:grid-cols-2 xl:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>{vendors(cat, m as 1, b[cat]).map((v) => <Card key={v.name} v={v} m={m} />)}</div></div>)}
            </div>
          </div>
        )}

        {s === "shortlist" && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex justify-between items-end"><H>Shortlist</H><Btn v="secondary" onClick={() => window.print()}>Export / Print</Btn></div>
            {saved.length === 0 ? <div className="bg-white rounded-xl border border-dashed border-[#C9A24B] p-10 text-center"><div className="text-4xl text-[#C9A24B]">♡</div><p className="mt-2">No saved vendors yet.</p><Btn className="mt-4" onClick={() => go("recs")}>See recommendations</Btn></div> : <>
              <div className="bg-white rounded-xl border border-[#E8E2DA] p-5"><div className="flex justify-between text-sm"><span>Estimated vs budget</span><span>{saved.length} vendors / {lkr(total)}</span></div><div className="h-2 bg-[#E8E2DA] rounded mt-2"><div className="h-full bg-[#2A7F82] rounded" style={{ width: Math.min(100, saved.length * 15) + "%" }} /></div></div>
              <ul className="space-y-2">{saved.map((n) => <li key={n} className="bg-white rounded-xl border border-[#E8E2DA] p-4 flex justify-between items-center"><span>{n}</span><Btn v="ghost" onClick={() => toggleSave(n)}>Remove</Btn></li>)}</ul></>}
          </div>
        )}
      </main>

      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-[#E8E2DA] grid grid-cols-4 z-20">
        {([["budget", "Budget"], ["style", "Style"], ["recs", "Matches"], ["shortlist", "Saved"]] as [Screen, string][]).map(([x, l]) => <button key={x} onClick={() => go(x)} className={`min-h-14 text-[13px] ${s === x ? "text-[#7A1F3D] font-semibold" : "text-[#6b6460]"}`}>{l}</button>)}
      </nav>
      {toast && <div role="status" className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 bg-[#2B2B2B] text-white px-4 py-3 rounded-lg shadow-lg z-30">{toast}</div>}
    </div>
  );
}
