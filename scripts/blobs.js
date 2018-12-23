// process.env.NODE_ENV is a magic variable that gets compiled away into the
// environment that we are in.
const BLOBS_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? 'https://blobs_testing.snowyluma.com/emoji/blobs'
    : 'https://api.mousey.app/emoji/blobs'

const elements = {
  emojiCount: document.querySelector('#emoji-count'),
}

function grabData() {
  return fetch(BLOBS_ENDPOINT).then((resp) => resp.json())
}

function randomizeBlobs(data) {
  console.log(data)
  elements.emojiCount.textContent = data.emoji_count
}

if (window.fetch) {
  grabData().then(randomizeBlobs)
}
