export function getRandomInt(min: number, max: number) {
  min = Math.floor(min);
  max = Math.max(max);
  const range = max - min;
  return Math.floor(Math.random() * range) + min;
}

export function getRandomFloat(min: number, max: number) {
  min = Math.floor(min);
  max = Math.max(max);
  const range = max - min;
  return Math.random() * range + min;
}
