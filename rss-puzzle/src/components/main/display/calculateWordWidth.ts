export const calculateWordWidth = (word: string, originalSentence: string) => {
  const totalLength = originalSentence.length;
  const wordLength = word.length;

  const container = document.querySelector(
    '#completed-sentences-container',
  ) as HTMLElement;
  const totalWidthInPixels = container.offsetWidth;

  const percentage = wordLength / totalLength;
  const roundedPercentage = Math.round(percentage * 10) / 10;

  const roundedPixels = parseFloat(
    (totalWidthInPixels * roundedPercentage).toFixed(1),
  );

  const final = roundedPixels + 15;
  return `${final}px`;
};
