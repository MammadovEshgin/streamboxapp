import { screens, type ScreenSources } from "@/assets/screens/manifest";

export interface ScreenSlide {
  sources: ScreenSources;
  label: string;
}

interface ShowcaseTabCopy {
  label: string;
  tagline: string;
  body: string;
  bullets: readonly string[];
}

export type ShowcaseTab = ShowcaseTabCopy &
  ({ type: "single"; sources: ScreenSources } | { type: "multi"; slides: readonly ScreenSlide[] });

export const SHOWCASE_TABS: readonly ShowcaseTab[] = [
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
