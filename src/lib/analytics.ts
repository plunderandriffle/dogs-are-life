type W = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; plausible?: (e: string, o?: unknown) => void };

export function trackEvent(name: string, props: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as W;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: name, ...props });
  w.gtag?.("event", name, props);
  w.plausible?.(name, { props });
  if (import.meta.env.DEV) console.info("[analytics]", name, props);
}
