import { useRef } from "react";
import { useDraggable } from "../hooks/use-draggable";
import { useElementSize } from "../hooks/use-element-size";

interface MemePreviewProps {
  imageUrl?: string;
  topText: string;
  bottomText: string;
}

const MemePreview = ({
  topText,
  bottomText,
  imageUrl = "/",
}: MemePreviewProps) => {
  const memeRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLSpanElement>(null);
  const bottomRef = useRef<HTMLSpanElement>(null);

  const topSize = useElementSize(topRef);
  const bottomSize = useElementSize(bottomRef);

  const topDrag = useDraggable({
    initial: { x: 100, y: 20 },
    boundsRef: memeRef,
    elementSize: topSize,
  });

  const bottomDrag = useDraggable({
    initial: { x: 100, y: 300 },
    boundsRef: memeRef,
    elementSize: bottomSize,
  });

  return (
    <div className="meme" ref={memeRef}>
      <img src={imageUrl} alt="meme-image" />
      <span
        ref={topRef}
        className="top-text text"
        onMouseDown={topDrag.onMouseDown}
        style={{
          left: topDrag.position.x,
          top: topDrag.position.y,
          cursor: "move",
          userSelect: "none",
        }}
      >
        {topText}
      </span>
      <span
        ref={bottomRef}
        className="bottom-text text"
        onMouseDown={bottomDrag.onMouseDown}
        style={{
          left: bottomDrag.position.x,
          top: bottomDrag.position.y,
          cursor: "move",
          userSelect: "none",
        }}
      >
        {bottomText}
      </span>
    </div>
  );
};

export default MemePreview;
