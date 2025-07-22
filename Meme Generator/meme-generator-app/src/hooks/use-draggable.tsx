import { useState, useRef, useEffect } from "react";

type Position = { x: number; y: number };

export function useDraggable(initial: Position) {
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
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
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
  }, []);

  return {
    position,
    onMouseDown,
  };
}
