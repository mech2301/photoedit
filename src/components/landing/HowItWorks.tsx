import { Upload, MousePointerClick, Download } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload',
    description: 'Select the image you want to edit text and upload it to PhoText.',
  },
  {
    icon: MousePointerClick,
    title: 'Edit Text',
    description:
      'Click text in your image you want to fix and replace it with the new text you want. You can also adjust the font, color, size, and position.',
  },
  {
    icon: Download,
    title: 'Download',
    description:
      'When you are finish editing text, click the "Download" button at the top to save the new image.',
  },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-3xl font-bold">How to Edit Text In Image?</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {i + 1}
              </div>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
