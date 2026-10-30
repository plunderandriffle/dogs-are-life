import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-primary text-primary-foreground",
  dark: "bg-foreground text-background",
  light: "bg-card text-foreground",
  blue: "bg-pup-blue text-primary-foreground",
};

export function Cta({
  href,
  id,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  id: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  const base = cn(
    "inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground px-7 py-4 font-display text-base font-extrabold uppercase tracking-wide shadow-sticker transition-transform",
    variants[variant],
    className,
  );
  if (!href) {
    return (
      <span aria-disabled="true" title="Link coming soon" className={cn(base, "cursor-not-allowed opacity-60")}>
        {children} <span className="text-xs normal-case opacity-80">(soon)</span>
      </span>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => trackEvent("cta_click", { cta: id, href })}
      className={cn(base, "hover:-translate-y-1 hover:rotate-[-1deg] active:translate-y-0")}
    >
      {children}
    </a>
  );
}
