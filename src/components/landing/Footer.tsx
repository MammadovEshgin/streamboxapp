import { Film } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
          <Film className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-display font-semibold text-sm text-foreground">CineTrack</span>
      </div>
      <p className="text-xs text-muted-foreground">
        © 2026 CineTrack. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
