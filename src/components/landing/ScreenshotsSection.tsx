import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Check } from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import ScreenshotCarousel from "./ScreenshotCarousel";
import { screens, type ScreenSources } from "@/assets/screens/manifest";

type ScreenTab = {
  label: string;
  tagline: string;
  body: string;
  bullets: string[];
} & (
  | { type: "single"; sources: ScreenSources }
  | { type: "multi"; slides: { sources: ScreenSources; label: string }[] }
);

const tabs: ScreenTab[] = [
  {
    type: "single",
    sources: screens.discover,
    label: "Discover",
    tagline: "Find your next binge.",
    body: "A handpicked feed that adapts to your taste. No infinite scroll — just the right thing, right now.",
    bullets: ["Trending today", "Hidden gems for your mood", "Personalized picks"],
  },
  {
    type: "single",
    sources: screens.movies,
    label: "Movies",
    tagline: "The full catalog, at a glance.",
    body: "Browse thousands of films sorted by genre, decade, and director. Fast filters, gorgeous posters.",
    bullets: ["50K+ titles", "Genre & decade filters", "Smart sort by rating"],
  },
  {
    type: "single",
    sources: screens.movieDetail,
    label: "Movie Detail",
    tagline: "Everything you need to decide.",
    body: "Cast, crew, synopsis, ratings, and where to watch — all on one tap. No tab-hopping.",
    bullets: ["Full cast & crew", "Aggregated ratings", "Where-to-watch links"],
  },
  {
    type: "single",
    sources: screens.series,
    label: "Series",
    tagline: "Every show worth following.",
    body: "From cult favorites to the latest premieres, organized so you'll never wonder what to watch next.",
    bullets: ["Currently airing", "Recently completed", "Worth a re-watch"],
  },
  {
    type: "multi",
    label: "Series Detail",
    tagline: "Two ways to dig into a show.",
    body: "We iterated on this screen until it felt right. Swipe between the two layouts — each surfaces seasons, ratings, and cast differently.",
    bullets: ["Season-by-season episodes", "Cast & character art", "Track what you've seen"],
    slides: [
      { sources: screens.seriesDetailV1, label: "Layout v1" },
      { sources: screens.seriesDetailV2, label: "Layout v2" },
    ],
  },
  {
    type: "single",
    sources: screens.journeys,
    label: "Journeys",
    tagline: "Cinematic journeys, curated.",
    body: "Hand-built collections that take you through eras, movements, and filmmaker careers — one film at a time.",
    bullets: ["Editorial collections", "Themed deep-dives", "Save journeys for later"],
  },
  {
    type: "single",
    sources: screens.franchise,
    label: "Franchise",
    tagline: "Every chapter, in order.",
    body: "Connected universes laid out cleanly. Watch in release order or chronologically — your call.",
    bullets: ["Release & chronological order", "Spin-offs surfaced", "Progress tracked"],
  },
  {
    type: "single",
    sources: screens.actor,
    label: "Actor Profile",
    tagline: "Filmographies, done right.",
    body: "Dig into any actor's full body of work, sorted by role, decade, or rating. Discover the films you've missed.",
    bullets: ["Full filmography", "Best-rated roles", "Frequent collaborators"],
  },
  {
    type: "single",
    sources: screens.profile,
    label: "Profile",
    tagline: "Your taste, at a glance.",
    body: "Your watched list, your favorites, your stats — all in one calm place. No vanity metrics.",
    bullets: ["Watched & to-watch", "Favorites & lists", "Personal milestones"],
  },
  {
    type: "multi",
    label: "Stats",
    tagline: "Five views into your viewer DNA.",
    body: "Quietly logs what you watch, then turns it into something beautiful. Five different lenses on the same data — pick your favorite.",
    bullets: ["Overview & milestones", "Genre & taste radar", "Top actors & directors"],
    slides: [
      { sources: screens.stats1, label: "Overview" },
      { sources: screens.stats2, label: "Genres" },
      { sources: screens.stats3, label: "Top Actors" },
      { sources: screens.stats4, label: "Taste Profile" },
      { sources: screens.stats5, label: "Persona" },
    ],
  },
];

const ScreenshotsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const safeIndex = activeIndex < tabs.length ? activeIndex : 0;
  const activeTab = tabs[safeIndex];
  const tabNumber = String(safeIndex + 1).padStart(2, "0");

  return (
    <section id="app-preview" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="container relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            Inside the App
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient-white mb-4">
            Beautifully Crafted
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Every screen designed with obsessive attention to detail.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveIndex(i)}
              className={`relative px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 rounded-[3px] ${
                safeIndex === i
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <div className="min-h-[480px] md:min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={safeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-center"
            >
              <div className="flex justify-center md:justify-end">
                {activeTab.type === "single" ? (
                  <PhoneMockup
                    sources={activeTab.sources}
                    alt={activeTab.label}
                    className="w-56 sm:w-64 md:w-72 phone-shadow"
                  />
                ) : (
                  <ScreenshotCarousel slides={activeTab.slides} />
                )}
              </div>

              <div className="max-w-md mx-auto md:mx-0 text-center md:text-left">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs text-primary tracking-widest">
                    {tabNumber}
                  </span>
                  <span className="h-px w-8 bg-primary/40" />
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                    {activeTab.label}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gradient-white mb-4 leading-tight">
                  {activeTab.tagline}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {activeTab.body}
                </p>

                <ul className="space-y-2.5">
                  {activeTab.bullets.map((bullet, i) => (
                    <motion.li
                      key={bullet}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 + i * 0.07 }}
                      className="flex items-start gap-2.5 justify-center md:justify-start"
                    >
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </span>
                      <span className="text-sm text-foreground/90">{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotsSection;
