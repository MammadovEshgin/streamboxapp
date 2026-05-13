import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, BarChart3, Users, Play, Film, Tv } from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Discover",
    desc: "Explore trending movies and series with personalized recommendations tailored to your taste.",
  },
  {
    icon: Play,
    title: "Stream Instantly",
    desc: "Watch your favorite movies and series anytime, anywhere — no waiting, just press play.",
  },
  {
    icon: Film,
    title: "Movie Library",
    desc: "Browse an ever-growing catalog of movies with rich details, trailers, ratings, and cast info.",
  },
  {
    icon: Tv,
    title: "Series & Episodes",
    desc: "Track seasons, mark episodes, and never miss a premiere of your favorite shows.",
  },
  {
    icon: Users,
    title: "Actor Profiles",
    desc: "Dive deep into actor bios, filmographies, and discover more content from stars you love.",
  },
  {
    icon: BarChart3,
    title: "Watch Stats",
    desc: "Get detailed insights — genre breakdowns, watch heatmaps, and taste evolution over time.",
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
    <section id="features" className="py-12 md:py-16 lg:py-20 relative">
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
            Stream, discover, and track — your complete entertainment experience in one app.
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
