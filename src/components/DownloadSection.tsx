import { Smartphone } from "lucide-react";
import Reveal from "@/components/Reveal";
import { APK_DOWNLOAD_URL, APK_SHA256 } from "@/content/release";

function AndroidIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.463 11.463 0 00-8.94 0L5.65 5.67c-.19-.29-.54-.37-.83-.22-.31.16-.43.54-.26.85L6.4 9.48A10.78 10.78 0 002 18h20a10.78 10.78 0 00-4.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
    </svg>
  );
}

export default function DownloadSection() {
  return (
    <section id="download" className="relative overflow-hidden py-24 md:py-32 short:py-16">
      <div className="container relative">
        <Reveal y={30} className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Smartphone aria-hidden className="h-8 w-8 text-primary" />
          </div>

          <h2 className="mb-4 font-display text-3xl font-bold text-gradient-white md:text-4xl lg:text-5xl">
            Start Streaming Today
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-muted-foreground">
            Download StreamBox and unlock unlimited movies and series — right at your fingertips.
          </p>

          <a
            href={APK_DOWNLOAD_URL}
            className="surface-card group inline-flex items-center gap-4 rounded-2xl px-7 py-4 transition-[transform,border-color] duration-300 hover:scale-[1.03] hover:border-primary/40 active:scale-[0.97]"
          >
            <span className="text-foreground transition-colors duration-300 group-hover:text-primary">
              <AndroidIcon />
            </span>
            <span className="text-left">
              <span className="block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Download for
              </span>{" "}
              <span className="-mt-0.5 block font-display text-base font-semibold text-foreground">
                Android
              </span>
            </span>
          </a>

          <p className="mt-6 break-all px-4 font-mono text-[10px] text-muted-foreground/60">
            sha256:{APK_SHA256}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Direct APK download • Android TV coming soon
          </p>
        </Reveal>
      </div>
    </section>
  );
}
