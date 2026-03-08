import { Clapperboard } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container flex flex-col gap-6">
      <p className="text-center font-display italic text-lg md:text-xl text-muted-foreground/80 tracking-wide">
        "What is <span className="text-primary font-semibold not-italic">Earth</span> without{" "}
        <span className="text-primary font-semibold not-italic">art</span>? Just a rock."
      </p>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-[4px] bg-primary flex items-center justify-center">
            <Clapperboard className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-sm text-foreground">StreamBox</span>
        </div>
        <div className="flex flex-col items-center md:items-end gap-1">
          <p className="text-xs text-muted-foreground">
            © 2026 StreamBox. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made by <span className="text-foreground font-medium">Eshgin</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
