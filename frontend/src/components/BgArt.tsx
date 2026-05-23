export function BgArt() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-grain opacity-40" />
    </>
  );
}
