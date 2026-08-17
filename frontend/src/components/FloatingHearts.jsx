import { useMemo } from 'react';

export default function FloatingHearts() {
  const hearts = useMemo(() => Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    delay: `${(i * 0.83) % 9}s`,
    duration: `${6 + ((i * 1.17) % 5)}s`,
    size: `${10 + ((i * 3) % 10)}px`,
    drift: `${-30 + ((i * 17) % 60)}px`
  })), []);
  return <div className="hearts" aria-hidden="true">
    {hearts.map(h => <span key={h.id} style={{left:h.left, animationDelay:h.delay, animationDuration:h.duration, fontSize:h.size, '--drift':h.drift}}>♥</span>)}
  </div>;
}
