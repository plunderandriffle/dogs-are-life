import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Cta } from "@/components/Cta";
import { community, isTokenLive } from "@/config/community";
import { trackEvent } from "@/lib/analytics";
import hero from "@/assets/hero-golden.jpg";
import dogzilla from "@/assets/dogzilla.png";
import memeWalk from "@/assets/meme-walk.jpg";
import memeToys from "@/assets/meme-toys.jpg";
import meme3am from "@/assets/meme-3am.jpg";
import memeBoss from "@/assets/meme-boss.jpg";

const TITLE = "DOGS ARE LIFE 🐶 — The Internet's Favorite Dog Community";
const DESC =
  "Daily dog memes, ridiculous dog moments, competitions, giveaways and Dogzilla — your AI-powered, dog-obsessed bot. Join the pack.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: Index,
});

const { telegramGroupUrl: GROUP, telegramBotUrl: BOT } = community;

function Sticker({ children, className, r = "0deg" }: { children: string; className: string; r?: string }) {
  return (
    <span
      style={{ ["--r" as string]: r }}
      className={`animate-floaty absolute z-10 whitespace-nowrap rounded-full border-2 border-foreground px-4 py-2 font-display text-xs font-extrabold uppercase shadow-sticker sm:text-sm ${className}`}
    >
      {children}
    </span>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="mb-4 inline-block rounded-full border-2 border-foreground bg-card px-3 py-1 font-display text-xs font-bold uppercase tracking-widest">
      {children}
    </p>
  );
}

function H2({ children }: { children: string }) {
  return (
    <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
      {children}
    </h2>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-foreground bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="font-display text-lg font-extrabold uppercase tracking-tight sm:text-xl">
          Dogs Are Life 🐶
        </a>
        <nav className="hidden gap-6 font-semibold md:flex">
          <a href="#dogzilla" className="hover:text-primary">Dogzilla</a>
          <a href="#memes" className="hover:text-primary">Memes</a>
          <a href="#pack" className="hover:text-primary">The Pack</a>
          <a href="#dogz" className="hover:text-primary">$DOGZ</a>
        </nav>
        <Cta href={GROUP} id="nav_join" className="px-4 py-2 text-xs sm:text-sm">Join 🐾</Cta>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-2 lg:pt-16">
        <div>
          <Eyebrow>The internet's dog-loving community</Eyebrow>
          <h1 className="font-display text-6xl font-extrabold uppercase leading-[0.85] tracking-tighter sm:text-8xl xl:text-9xl">
            Dogs <span className="text-primary">are</span> life.<span className="inline-block">🐶</span>
          </h1>
          <p className="mt-6 font-display text-2xl font-bold leading-tight sm:text-3xl">
            For the people who stop walking because they saw a dog.
          </p>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Welcome to the internet's dog-loving community. Daily memes, ridiculous dog moments, competitions,
            giveaways, and your own AI-powered dog-obsessed bot.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Cta href={GROUP} id="hero_join">Join the pack 🐾</Cta>
            <Cta href="#dogzilla" id="hero_meet_dogzilla" variant="light">Meet Dogzilla</Cta>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute inset-4 -z-0 rotate-3 rounded-[2.5rem] bg-secondary" />
          <img
            src={hero}
            width={1024}
            height={1152}
            fetchPriority="high"
            alt="Golden retriever in black sunglasses grinning at the camera"
            className="relative aspect-[8/9] w-full -rotate-2 rounded-[2.5rem] border-2 border-foreground object-cover shadow-sticker"
          />
          <Sticker className="-left-2 top-6 bg-secondary" r="-8deg">Good boy</Sticker>
          <Sticker className="-right-2 top-1/3 bg-pup-blue text-primary-foreground" r="6deg">Treat time</Sticker>
          <Sticker className="-left-4 bottom-1/4 bg-card" r="4deg">Who's a good dog?</Sticker>
          <Sticker className="bottom-4 right-4 bg-primary text-primary-foreground" r="-5deg">Dog people only</Sticker>
        </div>
      </div>
      <Marquee />
    </section>
  );
}

function Marquee() {
  const items = ["Daily memes", "Good boys", "Giveaways", "Zoomies", "Every breed", "Belly rubs", "Competitions", "Treats"];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y-2 border-foreground bg-foreground py-3 text-background">
      <div className="animate-marquee flex w-max gap-8 font-display text-xl font-extrabold uppercase">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8">
            {t} <span className="text-secondary">🐾</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Dogzilla() {
  const powers = [
    "Creates original dog memes",
    "Shares daily dog humor",
    "Welcomes new members",
    "Runs meme competitions",
    "Announces giveaways",
    "Answers dog-related questions",
    "Celebrates every breed",
    "Speaks multiple languages",
  ];
  return (
    <section id="dogzilla" className="scroll-mt-20 bg-pup-blue-soft">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:py-28">
        <img
          src={dogzilla}
          width={1024}
          height={1024}
          loading="lazy"
          alt="Dogzilla, a cartoon French bulldog kaiju wearing headphones"
          className="animate-floaty mx-auto w-full max-w-md drop-shadow-xl"
        />
        <div>
          <Eyebrow>Meet Dogzilla</Eyebrow>
          <H2>Your new favorite dog obsession.</H2>
          <p className="mt-5 text-xl font-semibold">Your AI-powered dog community companion.</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {powers.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-2xl border-2 border-foreground bg-card px-4 py-3 font-semibold">
                <span aria-hidden>🦴</span> {p}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Cta href={BOT} id="dogzilla_chat" variant="dark">Chat with Dogzilla</Cta>
          </div>
        </div>
      </div>
    </section>
  );
}

const memes = [
  { img: memeWalk, top: "My dog when I say", bottom: "we're going for a walk.", alt: "Corgi leaping toward the door with a leash in its mouth", tone: "bg-secondary" },
  { img: memeToys, top: "Me: I need to save money.", bottom: "Also me: buying my dog another toy.", alt: "Smug dachshund on a mountain of plush toys", tone: "bg-primary text-primary-foreground" },
  { img: meme3am, top: "Nobody: Absolutely nobody:", bottom: "My dog at 3 AM.", alt: "French bulldog with glowing eyes staring at the bed at night", tone: "bg-foreground text-background" },
  { img: memeBoss, top: "Working from home means", bottom: "my boss has four legs.", alt: "Golden retriever puppy in glasses and a tie at a laptop", tone: "bg-pup-blue text-primary-foreground" },
];

function Memes() {
  return (
    <section id="memes" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="max-w-3xl">
          <Eyebrow>The meme feed</Eyebrow>
          <H2>The internet needs more dogs.</H2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {memes.map((m, i) => (
            <figure
              key={m.bottom}
              className={`overflow-hidden rounded-[2rem] border-2 border-foreground shadow-sticker transition-transform hover:-translate-y-1 ${m.tone} ${i % 2 ? "sm:translate-y-10 sm:rotate-1" : "sm:-rotate-1"}`}
            >
              <figcaption className="px-6 pt-5 font-display text-lg font-bold">{m.top}</figcaption>
              <img src={m.img} width={816} height={816} loading="lazy" alt={m.alt} className="mt-4 aspect-square w-full border-y-2 border-foreground object-cover" />
              <p className="px-6 py-5 font-display text-2xl font-extrabold uppercase leading-tight">{m.bottom}</p>
            </figure>
          ))}
        </div>
        <div className="mt-20 text-center">
          <Cta href={BOT} id="memes_make_more">Make more memes with Dogzilla</Cta>
        </div>
      </div>
    </section>
  );
}

function Pack() {
  const perks = [
    ["📸", "Daily dog memes"],
    ["🐕", "Share pictures of your dog"],
    ["🌍", "Meet dog lovers worldwide"],
    ["🏷️", "Breed-specific conversations"],
    ["🏆", "Weekly competitions"],
    ["🎁", "Community giveaways"],
    ["✨", "Exclusive content"],
  ];
  return (
    <section id="pack" className="scroll-mt-20 border-y-2 border-foreground bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>Join the pack</Eyebrow>
            <H2>Your people are here.</H2>
          </div>
          <p className="text-xl font-semibold">A global community for anyone who thinks dogs make everything better.</p>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map(([icon, label]) => (
            <li key={label} className="rounded-3xl border-2 border-foreground bg-card p-6 shadow-sticker">
              <span className="text-4xl" aria-hidden>{icon}</span>
              <p className="mt-4 font-display text-xl font-bold leading-tight">{label}</p>
            </li>
          ))}
          <li className="flex items-center justify-center rounded-3xl border-2 border-dashed border-foreground p-6">
            <Cta href={GROUP} id="pack_join_telegram" variant="dark" className="text-sm">Join our Telegram pack</Cta>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Dogz() {
  const live = isTokenLive();
  const t = community.token;
  const alloc = [
    { pct: 25, label: "Referral rewards", tone: "bg-primary" },
    { pct: 25, label: "Permanent burn", tone: "bg-foreground" },
    { pct: 50, label: "Community incentives, giveaways & treasury", tone: "bg-pup-blue" },
  ];
  return (
    <section id="dogz" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <Eyebrow>The $DOGZ community economy</Eyebrow>
        <H2>Good dogs. Good memes. Good rewards.</H2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          $DOGZ is the community token. The pack is designed to reward participation, referrals, meme creators and
          everyone who makes this corner of the internet better.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-[2rem] border-2 border-foreground bg-card p-6 shadow-sticker sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-2xl font-extrabold uppercase">Proposed allocation</h3>
              <span className="rounded-full border-2 border-foreground bg-secondary px-3 py-1 text-xs font-bold uppercase">
                Proposal · not on-chain
              </span>
            </div>
            <div className="mt-6 flex h-6 overflow-hidden rounded-full border-2 border-foreground">
              {alloc.map((a) => (
                <div key={a.label} className={a.tone} style={{ width: `${a.pct}%` }} />
              ))}
            </div>
            <ul className="mt-6 space-y-4">
              {alloc.map((a) => (
                <li key={a.label} className="flex items-center gap-4">
                  <span className={`h-5 w-5 shrink-0 rounded-full border-2 border-foreground ${a.tone}`} />
                  <span className="font-display text-3xl font-extrabold">{a.pct}%</span>
                  <span className="font-semibold">{a.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              These are planned allocations only. No transfers or burns are shown here as completed — verified
              on-chain activity will be linked from a public explorer once it happens.
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-[2rem] border-2 border-foreground bg-foreground p-8 text-background shadow-soft">
            {live ? (
              <>
                <p className="font-display text-sm font-bold uppercase tracking-widest text-secondary">Verified token</p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div><dt className="opacity-70">Network</dt><dd className="font-semibold">{t.network}</dd></div>
                  <div><dt className="opacity-70">Contract</dt><dd className="break-all font-mono">{t.contractAddress}</dd></div>
                </dl>
                <div className="mt-6"><Cta href={t.explorerUrl} id="dogz_explorer" className="text-sm">View on explorer</Cta></div>
              </>
            ) : (
              <>
                <span className="text-5xl" aria-hidden>🪙</span>
                <p className="mt-4 font-display text-3xl font-extrabold uppercase leading-tight">Community token coming soon</p>
                <p className="mt-3 opacity-80">Join the pack to hear first when $DOGZ launches.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["Join the pack.", "Join the Telegram community.", "bg-primary text-primary-foreground"],
    ["Meet Dogzilla.", "Chat with your own dog-obsessed AI companion.", "bg-pup-blue text-primary-foreground"],
    ["Have fun and earn.", "Share memes, invite friends, participate in competitions, and discover community rewards.", "bg-secondary"],
  ];
  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <Eyebrow>How it works</Eyebrow>
        <H2>Three steps. Zero boring.</H2>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(([t, d, tone], i) => (
            <li key={t} className={`rounded-[2rem] border-2 border-foreground p-8 shadow-sticker ${tone}`}>
              <span className="font-display text-7xl font-extrabold">0{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl font-extrabold uppercase">{t}</h3>
              <p className="mt-2 font-medium">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Share() {
  const [copied, setCopied] = useState(false);
  const text = "DOGS ARE LIFE 🐶 — the internet's dog-loving community. Join the pack!";
  const getUrl = () => community.siteUrl || window.location.origin;
  const open = (net: string, url: string) => {
    trackEvent("share_click", { network: net });
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const btn = "rounded-full border-2 border-foreground bg-card px-4 py-2 text-sm font-bold hover:bg-secondary";
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
      <span className="font-semibold">Tell a dog person:</span>
      <button className={btn} onClick={async () => {
        const url = getUrl();
        if (navigator.share) {
          trackEvent("share_click", { network: "native" });
          try { await navigator.share({ title: "DOGS ARE LIFE", text, url }); } catch { /* cancelled */ }
        } else {
          await navigator.clipboard.writeText(url);
          trackEvent("share_click", { network: "copy" });
          setCopied(true); setTimeout(() => setCopied(false), 2000);
        }
      }}>{copied ? "Copied! 🐾" : "Share"}</button>
      <button className={btn} onClick={() => open("x", `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(getUrl())}`)}>X</button>
      <button className={btn} onClick={() => open("telegram", `https://t.me/share/url?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(text)}`)}>Telegram</button>
      <button className={btn} onClick={() => open("whatsapp", `https://wa.me/?text=${encodeURIComponent(`${text} ${getUrl()}`)}`)}>WhatsApp</button>
      <button className={btn} onClick={() => open("facebook", `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`)}>Facebook</button>
    </div>
  );
}

function FinalCta() {
  return (
    <section className="border-t-2 border-foreground bg-primary text-primary-foreground">
      <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32">
        <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tighter sm:text-7xl lg:text-8xl">
          Life is better with dogs.
        </h2>
        <p className="mt-6 font-display text-2xl font-bold">Your dog would want you to join.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Cta href={GROUP} id="final_join" variant="light">Join the pack 🐾</Cta>
          <Cta href={BOT} id="final_chat" variant="dark">Chat with Dogzilla</Cta>
        </div>
        <div className="text-foreground"><Share /></div>
      </div>
    </section>
  );
}

function FooterLink({ href, id, children }: { href: string; id: string; children: string }) {
  if (!href) return <span className="opacity-50" title="Coming soon">{children}</span>;
  const ext = href.startsWith("http");
  return (
    <a href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} onClick={() => trackEvent("cta_click", { cta: id, href })} className="hover:text-secondary">
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-3xl font-extrabold uppercase">Dogs Are Life 🐶</p>
          <p className="mt-1 opacity-70">Powered by Plunder &amp; Riffle.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 font-semibold">
          <FooterLink href={GROUP} id="footer_group">Telegram Community</FooterLink>
          <FooterLink href={BOT} id="footer_bot">Dogzilla Bot</FooterLink>
          <FooterLink href={community.rulesUrl} id="footer_rules">Community Rules</FooterLink>
          <FooterLink href="#dogz" id="footer_token">Token Information</FooterLink>
          <FooterLink href={community.contactUrl} id="footer_contact">Contact</FooterLink>
        </nav>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Nav />
      <main>
        <Hero />
        <Dogzilla />
        <Memes />
        <Pack />
        <Dogz />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
