import type { InputHTMLAttributes } from "react";
export function TextField({ label, error, className = "", ...p }: InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }) {
  const input = <input {...p} aria-invalid={!!error} className={`w-full h-11 rounded-lg border bg-white px-3 focus:outline-none focus:ring-2 ${error ? "border-[#C62828] focus:ring-[#C62828]" : "border-[#E8E2DA] focus:ring-[#C9A24B]"} ${className}`} />;
  if (!label) return input;
  return <label className="block text-sm font-medium">{label}<div className="mt-1">{input}</div>{error && <p className="text-[13px] text-[#C62828] mt-1">{error}</p>}</label>;
}
