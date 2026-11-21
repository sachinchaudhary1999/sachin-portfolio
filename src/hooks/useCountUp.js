import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./useMediaQuery";

// Counts from 0 to `target` once, easing out. Jumps straight to the value for reduced motion.
export function useCountUp(target, ms = 900) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);
  useEffect(() => {
    if (reduced) return setValue(target);
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / ms);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms, reduced]);
  return value;
}
