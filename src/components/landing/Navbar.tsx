import { motion } from "framer-motion";
import { Clapperboard, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = ["Features", "App Preview"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const idMap: Record<string, string> = {
    Features: "features",
    "App Preview": "app-preview",
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-card"
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[4px] bg-primary flex items-center justify-center">
            <Clapperboard className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground tracking-tight">
            CineTrack
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(idMap[link])}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("download")}
            className="px-4 py-2 text-sm font-semibold rounded-[4px] bg-primary text-primary-foreground hover:brightness-110 transition-all duration-200"
          >
            Get the App
          </button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border"
        >
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(idMap[link])}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 text-left font-medium"
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo("download")}
              className="text-sm text-left py-2 font-semibold text-primary"
            >
              Get the App
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
