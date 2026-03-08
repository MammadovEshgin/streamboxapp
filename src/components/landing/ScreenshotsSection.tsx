import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import PhoneMockup from "./PhoneMockup";
import screenDiscover from "@/assets/screen-discover.jpeg";
import screenMovies from "@/assets/screen-movies.jpeg";
import screenSeries from "@/assets/screen-series.jpeg";
import screenStats from "@/assets/screen-stats.jpeg";
import screenActors from "@/assets/screen-actors.jpeg";
import screenPersona from "@/assets/screen-persona.jpeg";
import screenGenreRadar from "@/assets/screen-genre-radar.jpeg";
import screenTasteProfile from "@/assets/screen-taste-profile.jpeg";
import screenMovieDetail from "@/assets/screen-movie-detail.jpeg";
import screenSeriesDetail from "@/assets/screen-series-detail.jpeg";
import screenActorDetail from "@/assets/screen-actor-detail.jpeg";
import screenEpisodes from "@/assets/screen-episodes.jpeg";

type ScreenTab = {
  label: string;
  desc: string;
} & (
  | { type: "single"; src: string }
  | { type: "multi"; screens: { src: string; label: string }[] }
);

const tabs: ScreenTab[] = [
  { type: "single", src: screenDiscover, label: "Discover", desc: "Find your next binge" },
  { type: "single", src: screenMovies, label: "Movies", desc: "Browse the full catalog" },
  { type: "single", src: screenMovieDetail, label: "Movie Detail", desc: "Rich info at a glance" },
  { type: "single", src: screenSeries, label: "Series", desc: "Follow every show" },
  { type: "single", src: screenSeriesDetail, label: "Series Detail", desc: "Seasons, ratings & more" },
  { type: "single", src: screenEpisodes, label: "Episodes", desc: "Track every episode" },
  { type: "single", src: screenActorDetail, label: "Actor Profile", desc: "Full filmography & bio" },
  {
    type: "multi",
    label: "Stats",
    desc: "Deep viewing insights & your viewer DNA",
    screens: [
      { src: screenStats, label: "Stats" },
      { src: screenGenreRadar, label: "Genres" },
      { src: screenActors, label: "Top Actors" },
      { src: screenTasteProfile, label: "Taste Profile" },
      { src: screenPersona, label: "Persona" },
    ],
  },
];

const ScreenshotsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const safeIndex = activeIndex < tabs.length ? activeIndex : 0;
  const activeTab = tabs[safeIndex];

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

        {/* Horizontal tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
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

        {/* Content area */}
        <div className="flex justify-center items-start" style={{ minHeight: "580px" }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={safeIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center"
            >
              {activeTab.type === "single" ? (
                <PhoneMockup
                  src={activeTab.src}
                  alt={activeTab.label}
                  className="w-52 sm:w-60 md:w-64 phone-shadow"
                />
              ) : (
                <div className="flex flex-wrap justify-center gap-4">
                  {activeTab.screens.map((screen, i) => (
                    <motion.div
                      key={screen.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.08 }}
                      className="flex flex-col items-center"
                    >
                      <PhoneMockup
                        src={screen.src}
                        alt={screen.label}
                        className="w-40 sm:w-44 md:w-48 phone-shadow"
                      />
                      <p className="mt-2 text-xs font-medium text-muted-foreground">
                        {screen.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
              <div className="mt-6 text-center">
                <p className="font-display font-semibold text-foreground text-lg">
                  {activeTab.label}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activeTab.desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotsSection;
