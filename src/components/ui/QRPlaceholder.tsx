const GRID = 11;
// Deterministic pseudo-QR pattern (visual placeholder only — not a scannable code)
function cellOn(x: number, y: number) {
  if ((x < 3 && y < 3) || (x > GRID - 4 && y < 3) || (x < 3 && y > GRID - 4)) {
    const edge = x === 0 || x === 2 || y === 0 || y === 2;
    const edgeR = x === GRID - 1 || x === GRID - 3 || y === 0 || y === 2;
    const edgeB = x === 0 || x === 2 || y === GRID - 1 || y === GRID - 3;
    return edge || edgeR || edgeB || (x === 1 && y === 1) || (x === GRID - 2 && y === 1) || (x === 1 && y === GRID - 2);
  }
  return (x * 7 + y * 13 + x * y) % 5 === 0;
}

export default function QRPlaceholder({ size = 128 }: { size?: number }) {
  const cells = [];
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      if (cellOn(x, y)) cells.push({ x, y });
    }
  }

  return (
    <div
      className="relative shrink-0 rounded-2xl border border-border-strong bg-white p-3"
      style={{ width: size, height: size }}
    >
      <svg viewBox={`0 0 ${GRID} ${GRID}`} width="100%" height="100%">
        {cells.map(({ x, y }) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#0a0a0c" />
        ))}
      </svg>
    </div>
  );
}
