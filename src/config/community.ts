/**
 * Central community configuration. Every link on the site reads from here.
 * Set values via environment variables (VITE_*) — never hardcode fake links.
 * Empty values render as clearly-disabled "coming soon" buttons.
 */
const env = import.meta.env;

const clean = (v: unknown) => (typeof v === "string" && /^https?:\/\//.test(v.trim()) ? v.trim() : "");

export type TokenStatus = "coming_soon" | "live";

export const community = {
  telegramGroupUrl: clean(env.VITE_TELEGRAM_GROUP_URL),
  telegramBotUrl: clean(env.VITE_TELEGRAM_BOT_URL),
  rulesUrl: clean(env.VITE_COMMUNITY_RULES_URL),
  contactUrl: clean(env.VITE_CONTACT_URL),
  siteUrl: clean(env.VITE_SITE_URL),
  token: {
    // Only flip to "live" once the contract is deployed and verified.
    status: (env.VITE_DOGZ_STATUS === "live" ? "live" : "coming_soon") as TokenStatus,
    contractAddress: (env.VITE_DOGZ_CONTRACT_ADDRESS as string | undefined)?.trim() ?? "",
    network: (env.VITE_DOGZ_NETWORK as string | undefined)?.trim() ?? "",
    explorerUrl: clean(env.VITE_DOGZ_EXPLORER_URL),
  },
};

/** Token is shown as live only when every verified field is present. */
export function isTokenLive() {
  const t = community.token;
  return t.status === "live" && !!t.contractAddress && !!t.network && !!t.explorerUrl;
}
