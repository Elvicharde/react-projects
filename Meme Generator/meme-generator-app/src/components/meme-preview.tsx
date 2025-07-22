import { useRef } from "react";
import { useDraggable } from "../hooks/use-draggable";

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
  const topTextDrag = useDraggable({ x: 100, y: 20 });
  const bottomTextDrag = useDraggable({ x: 100, y: 300 });
  return (
    <div className="meme" ref={memeRef}>
      <img src={imageUrl} alt="meme-image" />
      <span
        className="top-text text"
        onMouseDown={topTextDrag.onMouseDown}
        style={{
          left: topTextDrag.position.x,
          top: topTextDrag.position.y,
          cursor: "move",
          userSelect: "none",
        }}
      >
        {topText}
      </span>
      <span
        className="bottom-text text"
        onMouseDown={bottomTextDrag.onMouseDown}
        style={{
          left: bottomTextDrag.position.x,
          top: bottomTextDrag.position.y,
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
