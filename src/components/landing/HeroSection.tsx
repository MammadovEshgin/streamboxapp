import { motion } from "framer-motion";
import { Play, Smartphone, Film, Sparkles, Tv2 } from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import { screens } from "@/assets/screens/manifest";

const HeroSection = () => {
  const scrollToDownload = () => {
    document.getElementById("download")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] xl:min-h-screen flex items-center bg-gradient-hero overflow-hidden noise-overlay">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow pointer-events-none" />

      <div className="container relative pt-32 pb-12 md:pt-36 md:pb-16 lg:pt-40 lg:pb-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-8 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 mb-6"
            >
              <Smartphone className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                Now on Android
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-6">
              <span className="text-gradient-white">Stream Movies.</span>
              <br />
              <span className="text-gradient-white">Binge Series.</span>
              <br />
              <span className="text-gradient-primary">All in One App.</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed">
              Discover what to watch next, track every episode, and see your taste come into focus —
              all from a single Android app.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={scrollToDownload}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-[4px] bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all duration-200 shadow-lg shadow-primary/25"
              >
                <Play className="w-4 h-4 fill-current" />
                Start Watching
              </button>
              <button
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[4px] border border-border text-foreground font-semibold text-sm hover:bg-secondary/50 transition-all duration-200"
              >
                Explore Features
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-2.5 justify-center md:justify-start"
            >
              {[
                { icon: Film, label: "Movies & series" },
                { icon: Tv2, label: "Track every episode" },
                { icon: Sparkles, label: "Personal insights" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/60 border border-border/70"
                >
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right phone mockups */}
          <div className="relative flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              {/* Back phone left */}
              <motion.div
                className="absolute -left-8 sm:-left-16 top-8 z-0"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <PhoneMockup
                  sources={screens.movieDetail}
                  alt="Movie detail screen"
                  className="w-36 sm:w-44 md:w-52 opacity-50 blur-[1px] scale-90 rotate-[-8deg]"
                />
              </motion.div>

              {/* Main phone center */}
              <motion.div
                className="relative z-10"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <PhoneMockup
                  sources={screens.discover}
                  alt="Discover screen"
                  eager
                  className="w-52 sm:w-60 md:w-72 phone-shadow"
                />
              </motion.div>

              {/* Back phone right */}
              <motion.div
                className="absolute -right-8 sm:-right-16 top-8 z-0"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <PhoneMockup
                  sources={screens.seriesDetailV2}
                  alt="Series detail screen"
                  className="w-36 sm:w-44 md:w-52 opacity-50 blur-[1px] scale-90 rotate-[8deg]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
