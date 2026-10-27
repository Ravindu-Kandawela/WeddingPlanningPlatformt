import type { ReactNode } from "react";
export const Heading = ({ className = "", children }: { className?: string; children: ReactNode }) => (
  <h2 className={`font-serif text-[32px] leading-10 ${className}`}>{children}</h2>
);
