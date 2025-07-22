export const getRandomIndex = (min: number, max: number) => {
  // returns a random number within an inclusive range
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
