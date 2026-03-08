import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import screenDiscover from "@/assets/screen-discover.jpeg";
import screenMovies from "@/assets/screen-movies.jpeg";
import screenSeries from "@/assets/screen-series.jpeg";

const HeroSection = () => {
  const scrollToDownload = () => {
    document.getElementById("download")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden noise-overlay">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow pointer-events-none" />

      <div className="container relative pt-32 md:pt-40 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 mb-6"
            >
              <Star className="w-3.5 h-3.5 text-primary fill-primary" />
              <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                Track Every Frame
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight mb-6">
              <span className="text-gradient-white">Your Movies.</span>
              <br />
              <span className="text-gradient-white">Your Series.</span>
              <br />
              <span className="text-gradient-primary">Your Stats.</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              Discover, track, and analyze your watching habits with beautiful insights. 
              The ultimate companion app for movie and series enthusiasts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToDownload}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all duration-200 shadow-lg shadow-primary/25"
              >
                <Play className="w-4 h-4 fill-current" />
                Download Now
              </button>
              <button
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-border text-foreground font-semibold text-sm hover:bg-secondary/50 transition-all duration-200"
              >
                Explore Features
              </button>
            </div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background bg-secondary"
                    style={{
                      background: `hsl(${24 + i * 30} 40% ${25 + i * 5}%)`,
                    }}
                  />
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">50K+ Users</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 text-gold fill-gold" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">4.9 rating</span>
                </div>
              </div>
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
                  src={screenMovies}
                  alt="Movies screen"
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
                  src={screenDiscover}
                  alt="Discover screen"
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
                  src={screenSeries}
                  alt="Series screen"
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
