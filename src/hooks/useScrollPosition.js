import { useEffect } from 'react'
import { useSpring } from 'react-spring'
import _throttle from 'lodash/throttle'

function useScrollPosition(options = {}) {
  const isWindowDefined = typeof window !== 'undefined'

  const [ { y }, setY ] = useSpring(() => ({
    y: isWindowDefined ? window.pageYOffset : 0,
    ...options
  }));

  useEffect(() => {
    const handleScrollChange = _throttle(() => {
      console.log('handling scroll');
      setY({ y: window.pageYOffset })
    }, 67, { leading: true, trailing: true });

    if (isWindowDefined) {
      window.addEventListener('scroll', handleScrollChange);
    }

    return () => {
      if (isWindowDefined) {
        window.removeEventListener('scroll', handleScrollChange);
      }
    }
  });

  return y;
}

export {
  useScrollPosition as default,
  useScrollPosition
}
