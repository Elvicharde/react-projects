import { Suspense, useEffect, useState } from "react";
import MemePreview from "../components/meme-preview";
import MemeControl from "../components/meme-control";
import { fetchMemeData } from "../services/api";
import { getRandomIndex } from "../lib/utils";

export interface MemeText {
  topText: string;
  bottomText: string;
}

export interface MemeData {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
  captions: number;
}

const MemeDisplay = () => {
  const [memeText, setMemeText] = useState<MemeText>({
    topText: "",
    bottomText: "",
  });
  const [memeData, setMemeData] = useState<MemeData[] | null>(null);
  const [currentMemeData, setCurrentMemeData] = useState<MemeData | null>(null);

  useEffect(() => {
    (async () => {
      const apiData = await fetchMemeData();
      if (apiData) {
        setMemeData(apiData);
        const newMemeIndex = getRandomIndex(0, memeData?.length ?? 0);
        setCurrentMemeData(apiData[newMemeIndex]);
      }
    })();
  }, []);

  return (
    <>
      <MemeControl {...{ memeData, setMemeText, setCurrentMemeData }} />
      <Suspense fallback={<Loading />}>
        <MemePreview {...{ ...memeText, imageUrl: currentMemeData?.url }} />
      </Suspense>
    </>
  );
};

export default MemeDisplay;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
