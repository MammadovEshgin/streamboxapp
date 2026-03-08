import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import PhoneMockup from "./PhoneMockup";
import screenDiscover from "@/assets/screen-discover.jpeg";
import screenMovies from "@/assets/screen-movies.jpeg";
import screenSeries from "@/assets/screen-series.jpeg";
import screenStats from "@/assets/screen-stats.jpeg";
import screenActors from "@/assets/screen-actors.jpeg";
import screenPersona from "@/assets/screen-persona.jpeg";

const screens = [
  { src: screenDiscover, label: "Discover", desc: "Find your next watch" },
  { src: screenMovies, label: "Movies", desc: "Track your film journey" },
  { src: screenSeries, label: "Series", desc: "Follow every episode" },
  { src: screenStats, label: "Stats", desc: "Deep viewing insights" },
  { src: screenActors, label: "Actors", desc: "Your star leaderboard" },
  { src: screenPersona, label: "Persona", desc: "Unlock your viewer DNA" },
];

const ScreenshotsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="screenshots" className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="container relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            Screenshots
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient-white mb-4">
            Beautifully Crafted
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Every screen designed with obsessive attention to detail.
          </p>
        </motion.div>

        {/* Tab pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {screens.map((screen, i) => (
            <button
              key={screen.label}
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeIndex === i
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {screen.label}
            </button>
          ))}
        </motion.div>

        {/* Phone display */}
        <div className="flex justify-center">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative"
          >
            <PhoneMockup
              src={screens[activeIndex].src}
              alt={screens[activeIndex].label}
              className="w-60 sm:w-72 md:w-80 phone-shadow"
            />
            <div className="mt-6 text-center">
              <p className="font-display font-semibold text-foreground text-lg">
                {screens[activeIndex].label}
              </p>
              <p className="text-sm text-muted-foreground">
                {screens[activeIndex].desc}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotsSection;
