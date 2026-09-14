import type { LucideIcon } from "lucide-react";
import { ChartColumn, Compass, Film, Heart, Play, Tv, Users, Zap } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FEATURES: readonly Feature[] = [
  {
    icon: Compass,
    title: "Discover",
    description:
      "Explore trending movies and series with personalized recommendations tailored to your taste.",
  },
  {
    icon: Play,
    title: "Stream Instantly",
    description:
      "Watch your favorite movies and series anytime, anywhere — no waiting, just press play.",
  },
  {
    icon: Film,
    title: "Movie Library",
    description:
      "Browse an ever-growing catalog of movies with rich details, trailers, ratings, and cast info.",
  },
  {
    icon: Tv,
    title: "Series & Episodes",
    description: "Track seasons, mark episodes, and never miss a premiere of your favorite shows.",
  },
  {
    icon: Users,
    title: "Actor Profiles",
    description:
      "Dive deep into actor bios, filmographies, and discover more content from stars you love.",
  },
  {
    icon: ChartColumn,
    title: "Watch Stats",
    description:
      "Get detailed insights — genre breakdowns, watch heatmaps, and taste evolution over time.",
  },
];

export const HIGHLIGHTS: readonly Feature[] = [
  {
    icon: Play,
    title: "One Tap Streaming",
    description:
      "Find something you love? Just hit play. No redirects, no hassle — pure seamless streaming.",
  },
  {
    icon: Heart,
    title: "Curated For You",
    description:
      "Our algorithm learns your taste and surfaces movies and series you'll actually enjoy.",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "New episodes, trending titles, and fresh recommendations updated in real time.",
  },
];
