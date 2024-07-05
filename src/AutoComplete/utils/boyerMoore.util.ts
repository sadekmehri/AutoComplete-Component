function preprocessPattern(pattern: string) {
  const nbAsciiChars = 256
  const table: Array<number> = new Array(nbAsciiChars).fill(pattern.length)
  for (let i = 0; i < pattern.length - 1; i++) {
    table[pattern.charCodeAt(i)] = pattern.length - 1 - i
  }

  return table
}

function boyerMoore(haystack: string, needle: string): boolean {
  const n = haystack.length
  const m = needle.length

  if (m === 0) return true // Empty needle matches at position 0

  const jumpTable = preprocessPattern(needle)

  let i: number = m - 1 // Index for haystack
  let j: number = m - 1 // Index for needle

  while (i < n) {
    if (haystack[i] === needle[j]) {
      if (j === 0) return true // Match found
      i--
      j--
    } else {
      i += jumpTable[haystack.charCodeAt(i)]
      j = m - 1 // Reset j to the end of needle
    }
  }

  return false // Match not found
}

export const BoyerMooreUtil = {
  searchPattern: boyerMoore,
}
