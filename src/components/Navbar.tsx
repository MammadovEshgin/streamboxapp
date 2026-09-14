import { useState } from "react";
import { Menu, X } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { cssVars } from "@/lib/style";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "App Preview", href: "#app-preview" },
] as const;

const MOBILE_MENU_ID = "mobile-menu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className="glass-surface animate-enter fixed inset-x-0 top-0 z-50"
      style={cssVars({ "--enter-y": "-40px", "--enter-duration": "600ms" })}
    >
      <nav
        aria-label="Primary"
        className="container flex h-16 items-center justify-between md:h-20 short:h-16"
      >
        <a href="#top">
          <BrandMark size="md" />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {label}
            </a>
          ))}
          <a
            href="#download"
            className="rounded-[4px] bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-[filter] duration-200 hover:brightness-110"
          >
            Get the App
          </a>
        </div>

        <button
          type="button"
          className="text-foreground md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls={MOBILE_MENU_ID}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X aria-hidden className="h-6 w-6" />
          ) : (
            <Menu aria-hidden className="h-6 w-6" />
          )}
        </button>
      </nav>

      <div
        id={MOBILE_MENU_ID}
        className="mobile-menu md:hidden"
        data-open={isMenuOpen || undefined}
        inert={!isMenuOpen}
      >
        <div className="overflow-hidden">
          <div className="container flex flex-col gap-3 border-t border-border py-4">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
            <a
              href="#download"
              onClick={closeMenu}
              className="py-2 text-sm font-semibold text-primary"
            >
              Get the App
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
