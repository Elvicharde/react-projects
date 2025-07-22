import { useState, useRef, useEffect } from "react";

type Position = { x: number; y: number };

interface UseDraggableOptions {
  initial: Position;
  boundsRef?: React.RefObject<HTMLElement | null>; // the container to stay inside
  elementSize?: { width: number; height: number }; // optional for precise edge checking
}

export function useDraggable({
  initial,
  boundsRef,
  elementSize,
}: UseDraggableOptions) {
  const [position, setPosition] = useState<Position>(initial);
  const draggingRef = useRef(false);
  const offset = useRef<Position>({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    draggingRef.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;

      let x = e.clientX - offset.current.x;
      let y = e.clientY - offset.current.y;

      if (boundsRef?.current) {
        const bounds = boundsRef.current.getBoundingClientRect();
        const maxX = bounds.width - (elementSize?.width || 0);
        const maxY = bounds.height - (elementSize?.height || 0);

        x = Math.max(0, Math.min(x, maxX));
        y = Math.max(0, Math.min(y, maxY));
      }

      setPosition({ x, y });
    };

    const handleMouseUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [boundsRef, elementSize]);

  return {
    position,
    onMouseDown,
  };
}
