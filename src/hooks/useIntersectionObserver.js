import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
// import debounce from 'lodash/debounce'

const useIntersectionObserver = (cb, ref) => {
  if (typeof window === 'undefined') return false;
  // if (typeof window.IntersectionObserver !== 'function') return false;

  const rootMargin = 100;

  const RAF = React.useRef(null);
  const intersectionY = React.useRef(window.pageYOffset);
  const contextHeight = React.useRef();
  const relativeY = React.useRef(0);

  const requestAnimationFrame = (args) => {
    let offset = (window.pageYOffset - intersectionY.current) / contextHeight.current;
    if (relativeY.current !== offset) {
      relativeY.current = offset;
      cb({ offset });
    }
    RAF.current = window.requestAnimationFrame(requestAnimationFrame);
  }

  const cancelAnimationFrame = () => {
    if (RAF.current) {
      window.cancelAnimationFrame(RAF.current);
      RAF.current = null
    }
  }

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      const { isIntersecting, rootBounds, boundingClientRect, intersectionRect } = entry
      contextHeight.current = rootBounds.height + boundingClientRect.height;
      intersectionY.current = window.pageYOffset + boundingClientRect.top + rootMargin - rootBounds.height;
      if (isIntersecting) {
        requestAnimationFrame();
      } else {
        cancelAnimationFrame();
      }
    });
  }

  const io = new IntersectionObserver(handleIntersection, { rootMargin: `${rootMargin}px`, threshold: 0 });

  React.useEffect(() => {
    if (ref) {
      io.observe(ref.current);
    }
    return () => { io.unobserve(ref.current) }
  }, [ref]);
}

const Rect = styled(animated.div)`
  border: 3px solid currentColor;
  position: absolute;
  z-index: 10;
`

const Box = styled.div`
  position: relative;
  width: 75vw;
  height: 100px;
  margin: 20px auto;
  border: 1px solid black;
  background: #666;
`

const Dummy = () => {

  const ref = React.useRef();

  const [ pointer, setPointer ] = useSpring(() => ({
    top: 0,
    config: {
      friction: 60,
      tension: 500,
    },
  }));

  useIntersectionObserver(({offset}) => {
    // console.log(offset);
    setPointer({ top: offset });
  }, ref);

  return (
    <Box ref={ref} >
      <Rect
        style={{
          color: 'blue',
          transform: pointer.top.interpolate(n => `translate(0%, ${n * 100}%)`),
          width: '100%',
          height: '100%',
        }}
        >
        {'Pointer'}
      </Rect>
    </Box>
  )
}

export {
  useIntersectionObserver as default,
  useIntersectionObserver,
  Dummy
}
