import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const playPhaseEndSound = async () => {
  const audio = new Audio("./assets/audio/default-beep.mp3");

  try {
    await audio.play();
    // Wait 1 second manually in case the audio is shorter or fails
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (e) {
    console.warn("Could not play sound:", e);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // fallback delay
  }
};
