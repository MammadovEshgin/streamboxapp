import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import PhoneMockup from "./PhoneMockup";
import screenDiscover from "@/assets/screen-discover.jpeg";
import screenMovies from "@/assets/screen-movies.jpeg";
import screenSeries from "@/assets/screen-series.jpeg";
import screenStats from "@/assets/screen-stats.jpeg";
import screenActors from "@/assets/screen-actors.jpeg";
import screenPersona from "@/assets/screen-persona.jpeg";
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
      { src: screenActors, label: "Top Actors" },
      { src: screenPersona, label: "Persona" },
    ],
  },
];

const ScreenshotsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const activeTab = tabs[activeIndex];

  return (
    <section id="app-preview" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="container relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
          className="flex flex-col md:flex-row gap-8 md:gap-12 items-start"
        >
          {/* Vertical tab buttons - left side */}
          <div className="flex md:flex-col gap-2 md:gap-1.5 w-full md:w-52 shrink-0 flex-wrap md:flex-nowrap md:sticky md:top-32">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveIndex(i)}
                className={`relative px-4 py-3 text-left text-sm font-medium transition-all duration-300 rounded-[3px] ${
                  activeIndex === i
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content area */}
          <div className="flex-1 flex justify-center min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                {activeTab.type === "single" ? (
                  <PhoneMockup
                    src={activeTab.src}
                    alt={activeTab.label}
                    className="w-60 sm:w-72 md:w-80 phone-shadow"
                  />
                ) : (
                  <div className="flex flex-wrap justify-center gap-6">
                    {activeTab.screens.map((screen, i) => (
                      <motion.div
                        key={screen.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="flex flex-col items-center"
                      >
                        <PhoneMockup
                          src={screen.src}
                          alt={screen.label}
                          className="w-48 sm:w-56 md:w-64 phone-shadow"
                        />
                        <p className="mt-3 text-sm font-medium text-muted-foreground">
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
        </motion.div>
      </div>
    </section>
  );
};

export default ScreenshotsSection;
