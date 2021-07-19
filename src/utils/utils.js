export const getHighlightedText = (text, isWelsh) => {
  // Split text on highlight term, include term itself into parts, ignore case
  // â, ê, î, ô, û, ŵ, ŷ
  const vowels = isWelsh
    ? ['a', 'â', 'e', 'ê', 'i', 'î', 'o', 'ô', 'u', 'û', 'w', 'ŵ', 'y', 'ŷ', "'"]
    : ['a', 'e', 'i', 'o', 'u', "'"]
  const parts = isWelsh
    ? text.split(new RegExp(`(a|â|e|ê|i|î|o|ô|u|û|w|ŵ|y|ŷ|')`, 'gi'))
    : text.split(new RegExp(`(a|e|i|o|u|')`, 'gi'))
  return { parts, vowels }
}

export const averageFromData = (data) => {
  let total = 0
  for (let entry of data) {
    total += entry.y
  }
  total /= data.length
  return Math.round(total * 1e2) / 1e2
}

export const validLength = (word) => word.length < 100 && word.length > 0

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const vowelPercentage = (string, isWelsh = false) => {
  string = string.toLowerCase()
  const singleConsonants = isWelsh
    ? ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'l', 'm', 'n', 'p', 'r', 's', 't']
    : ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']
  const doubleConsonants = isWelsh ? ['ch', 'dd', 'ff', 'ng', 'll', 'ph', 'rh', 'th'] : []
  const vowels = isWelsh
    ? ['a', 'â', 'e', 'ê', 'i', 'î', 'o', 'ô', 'u', 'û', 'w', 'ŵ', 'y', 'ŷ', "'"]
    : ['a', 'e', 'i', 'o', 'u', "'"]
  let countConsonants = 0
  let countVowels = 0

  for (let index = 0; index < string.length; index++) {
    if (doubleConsonants.includes(string[index] + string[index + 1])) {
      countConsonants++
      index++
    } else if (singleConsonants.includes(string[index])) {
      countConsonants++
    } else if (vowels.includes(string[index])) {
      countVowels++
    }
  }
  return Math.round(((100 * countVowels) / (countVowels + countConsonants)) * 1e2) / 1e2 || 0
}
