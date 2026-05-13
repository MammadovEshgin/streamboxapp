import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="relative w-7 h-7 flex items-center justify-center">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full bg-primary/40 blur-md"
          />
          <img
            src={logo}
            alt="StreamBox logo"
            className="relative w-7 h-7 object-contain"
            width={28}
            height={28}
          />
        </div>
        <span className="font-display font-semibold text-sm text-foreground">StreamBox</span>
      </div>
      <p className="text-xs italic text-muted-foreground/70 font-display tracking-wide">
        "What is <span className="text-primary font-medium">Earth</span> without <span className="text-primary font-medium">art</span>? Just a rock."
      </p>
      <p className="text-xs text-muted-foreground">Made by <span className="text-foreground font-medium">Eshgin</span></p>
    </div>
  </footer>
);

export default Footer;
