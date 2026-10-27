export type Screen = "landing" | "login" | "budget" | "style" | "recs" | "shortlist";

export const CATS = [
  { k: "Hotels", i: "⌂", tags: ["Outdoor", "Beachfront", "Indoor Ballroom", "Heritage"] },
  { k: "Salons", i: "✂", tags: ["Bridal Classic", "Modern", "Traditional Kandyan"] },
  { k: "Photography", i: "◎", tags: ["Candid", "Cinematic", "Traditional", "Drone"] },
  { k: "Decorations", i: "❀", tags: ["Traditional", "Floral", "Minimalist", "Modern"] },
  { k: "Costumes", i: "♢", tags: ["Saree", "Osari", "Western", "Kandyan"] },
  { k: "Cakes", i: "◇", tags: ["Classic tiered", "Fondant", "Fusion", "Minimal"] },
];
export const COLORS = ["#7A1F3D", "#C9A24B", "#2A7F82", "#B5577A", "#8A6D2E", "#5FA8AA"];
export const PRESETS: Record<string, number[]> = {
  Balanced: [1200000, 250000, 350000, 300000, 250000, 100000],
  "Venue-focused": [1800000, 200000, 250000, 250000, 200000, 80000],
  "Photography-focused": [1000000, 200000, 700000, 250000, 200000, 80000],
};
export const AREAS = ["Galle Fort", "Unawatuna", "Hikkaduwa", "Habaraduwa", "Karapitiya"];
export const lkr = (n: number) => "LKR " + n.toLocaleString("en-LK");
