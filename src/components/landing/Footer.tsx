import { Clapperboard } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-[4px] bg-primary flex items-center justify-center">
          <Clapperboard className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-display font-semibold text-sm text-foreground">StreamBox</span>
      </div>
      <p className="text-xs italic text-muted-foreground/70 font-display tracking-wide">
        "What is <span className="text-primary font-medium">Earth</span> without <span className="text-primary font-medium">art</span>? Just a rock."
      </p>
      <div className="flex items-center gap-1">
        <p className="text-xs text-muted-foreground">Made by <span className="text-foreground font-medium">Eshgin</span></p>
        <p className="text-xs text-muted-foreground">Made by <span className="text-foreground font-medium">Eshgin</span></p>
      </div>
    </div>
  </footer>
);

export default Footer;
