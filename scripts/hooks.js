import { useEffect } from 'react'

export function useScrollNearEnd(callback, threshold = window.innerHeight / 2) {
  useEffect(() => {
    function listener() {
      // The total scroll height of the page, minus the height of the screen.
      const ending = document.body.scrollHeight - window.innerHeight

      // `window.scrollY` refers to the distance from the top of the page of
      // the upper border of the viewport.
      if (ending - window.scrollY <= threshold) {
        callback()
      }
    }

    window.addEventListener('scroll', listener)

    return () => {
      window.removeEventListener('scroll', listener)
    }
  })
}
