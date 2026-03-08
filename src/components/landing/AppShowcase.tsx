import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Heart, Zap } from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import screenMovieDetail from "@/assets/screen-movie-detail.jpeg";
import screenActorDetail from "@/assets/screen-actor-detail.jpeg";

const highlights = [
  {
    icon: Play,
    title: "One Tap Streaming",
    desc: "Find something you love? Just hit play. No redirects, no hassle — pure seamless streaming.",
  },
  {
    icon: Heart,
    title: "Curated For You",
    desc: "Our algorithm learns your taste and surfaces movies and series you'll actually enjoy.",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    desc: "New episodes, trending titles, and fresh recommendations updated in real time.",
  },
];

const AppShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: phones */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <PhoneMockup
                  src={screenMovieDetail}
                  alt="Movie detail"
                  className="w-48 sm:w-56 md:w-64 phone-shadow"
                />
              </motion.div>
              <motion.div
                className="absolute -right-12 sm:-right-20 top-16 z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              >
                <PhoneMockup
                  src={screenActorDetail}
                  alt="Actor profile"
                  className="w-40 sm:w-48 md:w-52 phone-shadow"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
              Why CineTrack
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient-white mb-6">
              Your Entertainment,{" "}
              <span className="text-gradient-primary">Reimagined</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg leading-relaxed">
              CineTrack isn't just another streaming app. It's a beautifully designed experience 
              that combines streaming, discovery, and personal insights into one seamless platform.
            </p>

            <div className="space-y-6">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                  className="flex gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
