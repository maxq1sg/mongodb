const { getRandomArbitrary } = require("../db/random");

module.exports = function randomCountry() {
  const countries = ["Belarus", "Russia", "Ukraine", "India", "Usa"];
  const idx = getRandomArbitrary(0, countries.length - 1);
  return countries[idx];
};
