const cases = [
  {
    title: 'Document Date Correction',
    description: 'Correct wrong dates on a document sample while keeping the original font and layout.',
    image: 'https://photext.ai/img/ai_guide/fix_date_in_invoice.webp',
  },
  {
    title: 'Chat Bubble Text Edit',
    description: 'Edit text in chat bubbles on a sample image, naturally matching the original style.',
    image: 'https://photext.ai/img/ai_guide/edit_text_in_chatbox.webp',
  },
  {
    title: 'Table Text Correction',
    description: 'Fix number and text entry errors on a report sample while preserving the table layout.',
    image: 'https://photext.ai/img/ai_guide/fix_text_in_table.webp',
  },
  {
    title: 'Certificate Text Correction',
    description: 'Correct names and titles on a certificate sample, keeping the exact font size and style.',
    image: 'https://photext.ai/img/ai_guide/fix_text_in_certificate.webp',
  },
  {
    title: 'Document Text Correction',
    description: 'Fix typos in names and text on a document sample, matching the original typography.',
    image: 'https://photext.ai/img/ai_guide/fix_text_in_invoice.webp',
  },
];

export default function UseCases() {
  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-bold">AI Text Edit Examples</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <div key={c.title} className="overflow-hidden rounded-xl border">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
