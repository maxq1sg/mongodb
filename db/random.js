function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomName() {
  const names = ["max", "ivan", "misha", "vito", "yaebaln"];
  const randomIdx = getRandomArbitrary(0, 5);
  const rnd = getRandomArbitrary(0, 100);
  return names[randomIdx] + `-${rnd}`;
}
module.exports = { getRandomArbitrary,getRandomName };
