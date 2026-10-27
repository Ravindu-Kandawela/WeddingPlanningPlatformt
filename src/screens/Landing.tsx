import { CATS } from "../data/categories";
import { Button, Heading } from "../components/ui";

const STEPS = [["Set budgets", "One budget per category, in LKR."], ["Pick your style", "Outdoor, candid, Kandyan and more."], ["Get matched", "Compare KNN and style-match picks."]];

export function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="space-y-16">
      <section className="rounded-xl bg-gradient-to-br from-[#7A1F3D] via-[#8d3550] to-[#2A7F82] text-white p-8 md:p-16">
        <p className="text-[#E8C877] tracking-widest text-xs uppercase">Galle District, Sri Lanka</p>
        <h1 className="font-serif text-[36px] leading-[44px] md:text-[44px] md:leading-[52px] max-w-xl mt-3">Plan your Galle wedding, one budget at a time</h1>
        <p className="mt-4 max-w-md text-white/85">Set a separate budget for each category and get matched with local vendors by two recommendation models.</p>
        <Button onClick={onStart} className="mt-8 !bg-[#C9A24B] !text-[#2B2B2B] hover:!bg-[#d6b363]">Start planning</Button>
      </section>
      <section>
        <Heading className="text-center mb-8">How it works</Heading>
        <div className="grid md:grid-cols-3 gap-4">{STEPS.map(([t, d], i) => <div key={t} className="bg-white rounded-xl p-6 border border-[#E8E2DA]"><div className="font-serif text-3xl text-[#C9A24B]">0{i + 1}</div><h3 className="font-serif text-2xl mt-2">{t}</h3><p className="text-[#6b6460] mt-1">{d}</p></div>)}</div>
      </section>
      <section className="grid grid-cols-2 md:grid-cols-6 gap-3">{CATS.map((c) => <div key={c.k} className="bg-white rounded-xl p-5 text-center border border-[#E8E2DA]"><div className="text-3xl text-[#7A1F3D]">{c.i}</div><div className="mt-2 font-medium">{c.k}</div></div>)}</section>
      <blockquote className="text-center font-serif text-2xl max-w-2xl mx-auto">"We spent on the beachfront venue and saved on the cake. Exactly how we wanted it."<footer className="text-sm font-sans text-[#6b6460] mt-3">Nadeesha & Ruwan, Unawatuna</footer></blockquote>
    </div>
  );
}
