import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Film, Clock, Star, TrendingUp } from "lucide-react";

const stats = [
  { icon: Film, value: "10M+", label: "Movies Tracked", color: "text-primary" },
  { icon: Clock, value: "2B+", label: "Hours Logged", color: "text-primary" },
  { icon: Star, value: "50K+", label: "Active Users", color: "text-gold" },
  { icon: TrendingUp, value: "99%", label: "Accuracy Rate", color: "text-primary" },
];

const StatsShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="stats" className="py-24 md:py-32 relative">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            By the Numbers
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient-white">
            Growing Every Day
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-6 md:p-8 rounded-2xl bg-gradient-card border-gradient text-center group hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsShowcase;
