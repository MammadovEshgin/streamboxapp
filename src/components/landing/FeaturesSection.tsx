import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, BarChart3, Users, TrendingUp, Film, Tv } from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Discover",
    desc: "Find trending movies and series with personalized recommendations powered by your taste.",
  },
  {
    icon: Film,
    title: "Track Movies",
    desc: "Log every movie you watch. See your movie of the day and browse IMDb's Top 250.",
  },
  {
    icon: Tv,
    title: "Track Series",
    desc: "Keep up with your favorite shows, mark episodes, and never miss a premiere.",
  },
  {
    icon: BarChart3,
    title: "Deep Stats",
    desc: "Watch activity heatmaps, genre breakdowns, decade analysis, and rating distributions.",
  },
  {
    icon: Users,
    title: "Top Actors",
    desc: "See which actors dominate your watchlist with ranked leaderboards and appearance counts.",
  },
  {
    icon: TrendingUp,
    title: "Taste Evolution",
    desc: "Track how your genre preferences evolve month by month with beautiful visualizations.",
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative p-6 md:p-8 rounded-2xl bg-gradient-card border-gradient hover:border-primary/30 transition-all duration-500"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
        <feature.icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
        {feature.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {feature.desc}
      </p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="container">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient-white mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            A complete toolkit to discover, track, and understand your entertainment journey.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
