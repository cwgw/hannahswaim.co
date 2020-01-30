import React from 'react';
import throttle from 'lodash/throttle';

let io;
let isInstantiated = false;
const listeners = new WeakMap();
const animationQueue = new Set([]);
const rootMargin = 100;
let pageYOffset = null;

function getIO() {
  if (
    typeof io === `undefined` &&
    typeof window !== `undefined` &&
    window.IntersectionObserver
  ) {
    io = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (listeners.has(entry.target)) {
            const { cb } = listeners.get(entry.target);
            // Edge doesn't currently support isIntersecting, so also test for an intersectionRatio > 0
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              listeners.set(entry.target, {
                cb,
                entry: {
                  range:
                    entry.rootBounds.height + entry.boundingClientRect.height,
                  center:
                    pageYOffset +
                    entry.boundingClientRect.top +
                    rootMargin -
                    entry.rootBounds.height,
                },
              });
              animationQueue.add(entry.target);
              animate();
            } else {
              animationQueue.delete(entry.target);
            }
          }
        });
      },
      { rootMargin: `${rootMargin}px`, threshold: 0 }
    );
  }

  return io;
}

const animate = throttle(
  () => {
    if (!animationQueue.size) return;
    pageYOffset = window.pageYOffset;
    animationQueue.forEach(callAnimation);
  },
  1000 / 30,
  { leading: true, trailing: true }
);

const listenToIntersections = (el, cb) => {
  const observer = getIO();

  if (observer) {
    if (!isInstantiated) {
      window.addEventListener('scroll', animate);
      isInstantiated = true;
    }

    observer.observe(el);
    listeners.set(el, { cb, entry: {} });
  }

  return () => {
    observer.unobserve(el);
    listeners.delete(el);

    if (!listeners.size) {
      window.removeEventListener('scroll', animate);
      isInstantiated = false;
    }
  };
};

const callAnimation = el => {
  const { cb, entry } = listeners.get(el);
  const y = (pageYOffset - entry.center) / entry.range;
  cb(y, { ref: entry.target });
};

const useParallax = cb => {
  const [ref, setRef] = React.useState(null);

  React.useLayoutEffect(() => {
    if (ref) {
      listenToIntersections(ref, cb);
    }
  }, [ref]);

  if (
    typeof window === 'undefined' ||
    typeof window.IntersectionObserver !== 'function'
  ) {
    return null;
  }

  return setRef;
};

export default useParallax;
