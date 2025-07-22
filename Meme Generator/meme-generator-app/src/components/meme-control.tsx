import { getRandomIndex } from "../lib/utils";
import type { MemeData, MemeText } from "../pages/meme-display";

interface MemeControlProps {
  setMemeText: React.Dispatch<React.SetStateAction<MemeText>>;
  memeData: MemeData[] | null;
  setCurrentMemeData: React.Dispatch<React.SetStateAction<MemeData | null>>;
}

const MemeControl = ({
  memeData,
  setCurrentMemeData,
  setMemeText,
}: MemeControlProps) => {
  const handleGetNextMeme = () => {
    const newMemeIndex = getRandomIndex(0, memeData?.length ?? 0);
    if (memeData) {
      setCurrentMemeData(memeData[newMemeIndex]);
    }
    return;
  };

  const handleSetMemeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    // get event name and value to decide the update
    const { value, name } = event.currentTarget;
    setMemeText((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form">
      <label>
        {" "}
        Top Text
        <input
          type="text"
          placeholder="One does not simply"
          name="topText"
          className="text topText"
          onChange={handleSetMemeText}
        />
      </label>
      <label>
        {" "}
        Bottom Text
        <input
          type="text"
          placeholder="Walk into Mordor"
          name="bottomText"
          className="text bottomText"
          onChange={handleSetMemeText}
        />
      </label>
      <button className="meme-control" onClick={handleGetNextMeme}>
        Get a new meme image 🖼
      </button>
    </div>
  );
};

export default MemeControl;
