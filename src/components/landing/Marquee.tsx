interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-card/40 py-4">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground flex items-center gap-12"
          >
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
