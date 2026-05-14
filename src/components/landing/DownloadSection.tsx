import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Smartphone } from "lucide-react";

const AndroidIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.463 11.463 0 00-8.94 0L5.65 5.67c-.19-.29-.54-.37-.83-.22-.31.16-.43.54-.26.85L6.4 9.48A10.78 10.78 0 002 18h20a10.78 10.78 0 00-4.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
  </svg>
);

const DownloadSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="download" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/8 blur-[150px] pointer-events-none" />

      <div className="container relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Smartphone className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient-white mb-4">
            Start Streaming Today
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            Download StreamBox and unlock unlimited movies and series — right at your fingertips.
          </p>

          <div className="flex justify-center">
            <motion.a
              href="https://github.com/MammadovEshgin/streamboxapp/releases/latest/download/StreamBox.apk"
              download="StreamBox.apk"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-4 px-7 py-4 rounded-2xl bg-gradient-card border-gradient hover:border-primary/40 transition-all duration-300 group"
            >
              <div className="text-foreground group-hover:text-primary transition-colors duration-300">
                <AndroidIcon />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                  Download for
                </p>
                <p className="text-base font-display font-semibold text-foreground -mt-0.5">
                  Android
                </p>
              </div>
            </motion.a>
          </div>

          <p className="mt-6 text-[10px] font-mono text-muted-foreground/60 break-all px-4">
            sha256:01df895faba952a1b13090b655053a1d981a9aec10a73feac03ac43fb8d6a882
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Direct APK download • iOS coming later
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadSection;
