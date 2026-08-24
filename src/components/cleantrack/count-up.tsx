import { useEffect, useRef, useState } from "react";

/** Smoothly animates between numeric values (ETA changes, metric count-ups). */
export function CountUp({
  to,
  duration = 900,
  decimals = 0,
  className = "",
}: {
  to: number;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(to);
  const fromRef = useRef(to);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const from = fromRef.current;
    if (from === to) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (to - from) * eased);
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [to, duration]);

  return <span className={className}>{display.toFixed(decimals)}</span>;
}
