export default function StatusDot({ className = "" }) {
  return (
    <span className={`relative inline-flex h-2 w-2 ${className}`} aria-hidden="true">
      <span className="absolute inline-flex h-full w-full rounded-full bg-ok opacity-60 motion-safe:animate-ping2" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
    </span>
  );
}
