import type { MemeData } from "../pages/meme-display";

interface RequestResponse<T> {
  success: boolean;
  data: { memes: T[] };
}

export const fetchMemeData = async () => {
  const URL = "https://api.imgflip.com/get_memes";
  const response: RequestResponse<MemeData> = await (await fetch(URL)).json();
  return response.success ? response.data.memes : null;
};
