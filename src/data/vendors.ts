import { AREAS, CATS } from "./categories";

export type Model = 1 | 2;
export interface Vendor { name: string; area: string; price: number; score: number; tags: string[]; why: string }

export const MODEL_LABELS: Record<Model, string> = {
  1: "Model 1: Similar Couples (KNN)",
  2: "Model 2: Style Match (Content-Based)",
};

// Mock recommendations until the ML APIs are connected.
export function getVendors(cat: number, model: Model, budget: number): Vendor[] {
  return [0, 1, 2].map((j) => ({
    name: `${["Lighthouse", "Coral Bay", "Fort Heritage", "Jungle Beach", "Rampart"][(cat + j + model) % 5]} ${CATS[cat].k.replace(/s$/, "")}`,
    area: AREAS[(cat * 2 + j + model) % 5],
    price: Math.round(budget * [0.82, 0.97, 1.12][(j + model) % 3]),
    score: model === 1 ? 91 - j * 6 - cat : 94 - j * 5 - cat,
    tags: CATS[cat].tags.slice(j % 2, (j % 2) + 2),
    why: model === 1 ? `Chosen by ${9 - j * 2} couples with a similar budget` : `${94 - j * 5}% match with ${CATS[cat].tags.slice(0, 2).join(" + ")}`,
  }));
}
