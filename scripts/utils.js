export function log(...info) {
  console.log(
    '%c[blobs.gg]%c',
    'color: lightgreen; font-weight: bold',
    'color: inherit; font-weight: inherit',
    ...info
  )
}

export function warn(...info) {
  console.log(
    '%c[blobs.gg]%c',
    'color: red; font-weight: bold',
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

export function titleCase(sourceString) {
  return sourceString[0].toUpperCase() + sourceString.slice(1).toLowerCase()
}

export const DateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
})

export function storageAvailable(type) {
  let storage
  try {
    storage = window[type]
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    )
  }
}
