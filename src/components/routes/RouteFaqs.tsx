import type { RouteFaq } from '@/types';

/** Native <details> accordion — no client JavaScript. */
export default function RouteFaqs({ faqs }: { faqs: RouteFaq[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      {faqs.map((f, i) => (
        <details key={f.question} className={`group ${i > 0 ? 'border-t border-border' : ''}`}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-text transition-colors hover:bg-surface/70 [&::-webkit-details-marker]:hidden">
            {f.question}
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface text-muted transition-all group-open:rotate-180 group-open:bg-red-accent/10 group-open:text-red-accent">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <p className="px-5 pb-5 pr-14 leading-relaxed text-muted">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
