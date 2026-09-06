import type { RoutePoint } from '@/types';
import { formatTime } from '@/lib/routes';

/** Boarding or dropping points as a vertical timeline. */
export default function PointsList({ points, note }: { points: RoutePoint[]; note?: string }) {
  if (!points.length) return null;
  return (
    <div>
      <ol className="overflow-hidden rounded-2xl border border-border bg-white">
        {points.map((p, i) => (
          <li key={p.name} className={`flex items-start gap-3.5 p-4 ${i > 0 ? 'border-t border-border' : ''}`}>
            <span className="relative mt-1 flex shrink-0 flex-col items-center self-stretch" aria-hidden="true">
              <span
                className={
                  i === 0
                    ? 'h-2.5 w-2.5 rounded-full bg-red-accent ring-4 ring-red-accent/15'
                    : 'h-2.5 w-2.5 rounded-full border border-muted/50 bg-white ring-4 ring-border/40'
                }
              />
              {i < points.length - 1 && <span className="mt-1 w-px flex-1 bg-border" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-text">{p.name}</p>
              <p className="mt-0.5 text-sm text-muted">{p.landmark}</p>
            </div>
            <p className="shrink-0 whitespace-nowrap font-display text-sm font-bold text-navy">
              {p.time.includes(':') ? formatTime(p.time) : p.time}
            </p>
          </li>
        ))}
      </ol>
      {note && <p className="mt-2.5 text-sm text-muted">{note}</p>}
    </div>
  );
}
