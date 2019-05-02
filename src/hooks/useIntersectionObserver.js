import React from 'react';

const useIntersectionObserver = (cb, ref) => {
  if (typeof window === 'undefined') return false;
  if (typeof window.IntersectionObserver !== 'function') return false;

  const rootMargin = 100;

  const RAF = React.useRef(null);
  const intersectionY = React.useRef(window.pageYOffset);
  const contextHeight = React.useRef();
  const relativeY = React.useRef(0);

  const requestAnimationFrame = args => {
    let offset =
      (window.pageYOffset - intersectionY.current) / contextHeight.current;
    if (relativeY.current !== offset) {
      relativeY.current = offset;
      cb(offset);
    }
    RAF.current = window.requestAnimationFrame(requestAnimationFrame);
  };

  const cancelAnimationFrame = () => {
    if (RAF.current) {
      window.cancelAnimationFrame(RAF.current);
      RAF.current = null;
    }
  };

  const handleIntersection = entries => {
    entries.forEach(({ isIntersecting, rootBounds, boundingClientRect }) => {
      contextHeight.current = rootBounds.height + boundingClientRect.height;
      intersectionY.current =
        window.pageYOffset +
        boundingClientRect.top +
        rootMargin -
        rootBounds.height;
      if (isIntersecting) {
        requestAnimationFrame();
      } else {
        cancelAnimationFrame();
      }
    });
  };

  const io = new IntersectionObserver(handleIntersection, {
    rootMargin: `${rootMargin}px`,
    threshold: 0,
  });

  React.useEffect(() => {
    if (ref) {
      io.observe(ref.current);
    }
    return () => {
      io.unobserve(ref.current);
    };
  }, [ref]);
};

export default useIntersectionObserver;
