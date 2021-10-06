export function log(...info) {
  console.log(
    "%c[blobs.gg]%c",
    "color: lightgreen; font-weight: bold",
    "color: inherit; font-weight: inherit",
    ...info
  );
}

export function warn(...info) {
  console.log(
    "%c[blobs.gg]%c",
    "color: red; font-weight: bold",
    "color: inherit; font-weight: inherit",
    ...info
  );
}

// Shuffles an array using the Fisher-Yates shuffle algorithm.
export function shuffleArray(source) {
  // Copy the source array.
  let array = [...source];

  let length = array.length;
  let index;

  // While there remain elements to shuffle…
  while (length) {
    // Pick a remaining element…
    index = Math.floor(Math.random() * length--);

    // And swap it with the current element.
    [array[length], array[index]] = [array[index], array[length]];
  }

  return array;
}

export function titleCase(sourceString) {
  return sourceString[0].toUpperCase() + sourceString.slice(1).toLowerCase();
}

const hour12Format = {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export const DateTimeFormatter = new Intl.DateTimeFormat("en-US", hour12Format);

export const DateTimeFormatter24 = new Intl.DateTimeFormat(
  "en-US",
  Object.assign(hour12Format, { hour12: false })
);

export function getDefaultHourFormat() {
  const date = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
  }).resolvedOptions();
  return date.hour12;
}

export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export function calculateEmojiCount(data) {
  let count = 0;

  // Using nested `for` loops here instead of `Array.prototype.reduce` for
  // the sake of readability.
  for (const guilds of Object.values(data)) {
    for (const guild of Object.values(guilds)) {
      count += guild.emoji.length;
    }
  }

  return count;
}

export function formatEmojiCount(count) {
  return new Intl.NumberFormat().format(count);
}

/**
 * Splits a input array into chunks
 *
 * @param {Array} inputArray The input Array that is to be Chunked
 * @param {Number} chunkSize The size of the chunk
 * @returns {Array} The chunked array
 */
export function chunker(inputArray, chunkSize = 6) {
  return inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
}

/**
 * @param {String} key The key to check with
 * @param {Boolean} value The value in case there isn't a key/LS
 * @returns {[Boolean, Boolean]} Returns Value & if it used the LS
 */
export function getKeyWrapper(key, value) {
  const trans = {
    1: true,
    2: false,
    3: "automated",
  };

  // If I can use LS then use it
  if (storageAvailable("localStorage")) {
    const keyCheck = localStorage.getItem(key);
    // If it is automated
    if (keyCheck === "3") {
      return [value, false];
    } else if (Object.keys(trans).includes(keyCheck)) {
      // Return the fetched value as something useful
      return [trans[keyCheck], true];
    }
    // If key not in DB
    warn(`Setting key for ${key}`);
    if (storageAvailable("localStorage")) {
      localStorage.setItem(key, "3");
    }
    return [value, false];
  }
  // Can't use LS, have whatever I'm given
  return [value, false];
}

export function getHourFormat() {
  return getKeyWrapper("prefers12Hour", getDefaultHourFormat())[0];
}

/**
 * @returns {Intl.DateTimeFormat} Date formatter
 */
export function getDateTimeFormatter() {
  if (getHourFormat()) {
    return DateTimeFormatter;
  }

  return DateTimeFormatter24;
}

/**
 * Returns a array from smallest to biggest value
 * @param {Number} min
 * @param {Number} max
 * @returns {Number[]}
 */
export function arrayRange(min, max) {
  return [...Array(max - min + 1).keys()].map((i) => i + min);
}
