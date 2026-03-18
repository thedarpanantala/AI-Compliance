export type EvidenceEvent = { id: string; title: string; source: string; at: string };

export function EvidenceTimeline({ events }: { events: EvidenceEvent[] }) {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-3">Evidence Timeline</h2>
      <ul className="space-y-3">
        {events.map((event) => (
          <li key={event.id} className="border-l-2 border-slate-300 pl-3">
            <p className="font-medium">{event.title}</p>
            <p className="text-xs text-slate-500">{event.source} · {event.at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
