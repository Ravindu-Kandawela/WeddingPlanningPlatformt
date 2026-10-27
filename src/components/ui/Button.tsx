import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" };
const styles = {
  primary: "bg-[#7A1F3D] text-white hover:bg-[#5f1730]",
  secondary: "border border-[#7A1F3D] text-[#7A1F3D] hover:bg-[#7A1F3D]/5",
  ghost: "text-[#2A7F82] hover:bg-[#2A7F82]/10",
};

export function Button({ variant = "primary", className = "", ...p }: Props) {
  return <button {...p} className={`min-h-11 px-5 rounded-lg font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B] focus-visible:ring-offset-2 disabled:opacity-40 ${styles[variant]} ${className}`} />;
}
