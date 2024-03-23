export function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  let arrayCopy = array.slice();
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = arrayCopy[currentIndex];
    arrayCopy[currentIndex] = arrayCopy[randomIndex];
    arrayCopy[randomIndex] = temporaryValue;
  }
  return arrayCopy;
}
