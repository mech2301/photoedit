import { FEATURES } from '@/lib/constants';

export default function FeatureGrid() {
  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="sr-only">Features</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
