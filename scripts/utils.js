export function log(...info) {
  console.log(
    '%c[blobs.gg]%c',
    'color: lightgreen; font-weight: bold',
    'color: inherit; font-weight: inherit',
    ...info
  )
}

/**
 * Shuffles an array using the Fisher-Yates shuffle algorithm.
 */
export function shuffleArray(source) {
  // Copy the source array.
  let array = [...source]

  let length = array.length
  let index

  // While there remain elements to shuffle…
  while (length) {
    // Pick a remaining element…
    index = Math.floor(Math.random() * length--)

    // And swap it with the current element.
    ;[array[length], array[index]] = [array[index], array[length]]
  }

  return array
}
