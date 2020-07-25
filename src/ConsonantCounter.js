const VowelPercentage = ({ string, isWelsh }) => {
  string = string.toLowerCase();
  const singleConsonants = isWelsh
    ? ["b", "c", "d", "f", "g", "h", "j", "l", "m", "n", "p", "r", "s", "t"]
    : [
        "b",
        "c",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        "m",
        "n",
        "p",
        "q",
        "r",
        "s",
        "t",
        "v",
        "w",
        "x",
        "y",
        "z"
      ];
  const doubleConsonants = isWelsh
    ? ["ch", "dd", "ff", "ng", "ll", "ph", "rh", "th"]
    : [];
  const vowels = ["a", "e", "i", "o", "u", "w", "y"];
  let countConsonants = 0;
  let countVowels = 0;

  for (let index = 0; index < string.length; index++) {
    if (doubleConsonants.includes(string[index] + string[index + 1])) {
      countConsonants++;
      index++;
    } else if (singleConsonants.includes(string[index])) {
      countConsonants++;
    } else if (vowels.includes(string[index])) {
      countVowels++;
    }
  }
  return (
    Math.round(((100 * countVowels) / (countVowels + countConsonants)) * 1e2) /
      1e2 || 0
  );
};

export default VowelPercentage;
