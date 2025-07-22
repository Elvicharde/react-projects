// useElementSize.ts
import { useLayoutEffect, useState } from "react";

export function useElementSize<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const resize = () => {
      const rect = el.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };

    resize(); // Initial measure

    const observer = new ResizeObserver(resize);
    observer.observe(el);

    return () => observer.disconnect();
  }, [ref]);

  return size;
}
