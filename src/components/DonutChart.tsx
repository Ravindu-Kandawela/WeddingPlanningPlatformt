import { COLORS } from "../data/categories";
export function DonutChart({ values }: { values: number[] }) {
  const total = values.reduce((a, c) => a + c, 0) || 1;
  let acc = 0;
  const bg = `conic-gradient(${values.map((v, i) => { const a = acc; acc += (v / total) * 360; return `${COLORS[i]} ${a}deg ${acc}deg`; }).join(",")})`;
  return <div role="img" aria-label="Budget allocation chart" className="w-44 h-44 rounded-full mx-auto my-6 grid place-items-center" style={{ background: bg }}><div className="w-28 h-28 rounded-full bg-white" /></div>;
}
