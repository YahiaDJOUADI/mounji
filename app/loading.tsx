export default function Loading() {
  return (
    <div className="fixed inset-0 bg-arch-black flex flex-col items-center justify-center z-50">
      {/* Gold shimmer bar */}
      <div className="w-48 h-px bg-arch-border overflow-hidden mb-6">
        <div className="h-full bg-arch-gold animate-shimmer" style={{ width: '60%', backgroundSize: '200% auto' }} />
      </div>
      <p className="section-label animate-pulse">Loading</p>
    </div>
  );
}
