import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { FEATURES } from "@/content/features";

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-12 md:py-16 lg:py-20">
      <div className="container">
        <SectionHeading
          className="mb-16"
          eyebrow="Features"
          title="Everything You Need"
          description="Stream, discover, and track — your complete entertainment experience in one app."
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }, index) => (
            <li key={title}>
              <Reveal y={30} delayMs={index * 100} durationMs={500} className="h-full">
                <article className="surface-card group h-full rounded-2xl p-6 transition-colors duration-500 hover:border-primary/30 md:p-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    <Icon aria-hidden className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
