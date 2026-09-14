import BrandMark from "@/components/BrandMark";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <a href="#top">
          <BrandMark size="sm" />
        </a>
        <p className="font-display text-xs italic tracking-wide text-muted-foreground/70">
          "What is <span className="font-medium text-primary">Earth</span> without{" "}
          <span className="font-medium text-primary">art</span>? Just a rock."
        </p>
        <p className="text-xs text-muted-foreground">
          Made by <span className="font-medium text-foreground">Eshgin</span>
        </p>
      </div>
    </footer>
  );
}
