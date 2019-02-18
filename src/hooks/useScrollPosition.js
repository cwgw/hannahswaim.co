import { useEffect } from 'react'
import { useSpring } from 'react-spring'

function useScrollPosition(options = {}) {
  const isWindowDefined = typeof window !== 'undefined'

  const [ { y }, setY ] = useSpring(() => ({
    y: isWindowDefined ? window.pageYOffset : 0,
    ...options
  }));

  useEffect(() => {
    let RAFId;

    const handleScrollChange = () => {
      if (RAFId) return;

      console.log(typeof window.pageYOffset)

      RAFId = window.requestAnimationFrame(() => {
        setY({ y: window.pageYOffset })
        RAFId = null;
      });
    }

    if (isWindowDefined) {
      window.addEventListener('scroll', handleScrollChange);
    }

    return () => {
      if (isWindowDefined) {
        window.removeEventListener('scroll', handleScrollChange);
        if (RAFId) window.cancelAnimationFrame(RAFId);
      }
    }
  });

  return y;
}

export {
  useScrollPosition as default,
  useScrollPosition
}
