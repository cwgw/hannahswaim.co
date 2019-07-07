import React from 'react';

let io;
const listeners = new WeakMap();
const rootMargin = 100;

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
                data: {
                  range:
                    entry.rootBounds.height + entry.boundingClientRect.height,
                  center:
                    window.pageYOffset +
                    entry.boundingClientRect.top +
                    rootMargin -
                    entry.rootBounds.height,
                  y: null,
                },
              });
              step(entry.target);
            } else {
              stop(entry.target);
            }
          }
        });
      },
      { rootMargin: `${rootMargin}px`, threshold: 0 }
    );
  }

  return io;
}

const listenToIntersections = (el, cb) => {
  const observer = getIO();

  if (observer) {
    observer.observe(el);
    listeners.set(el, {
      cb,
      rafID: null,
      data: {},
    });
  }

  return () => {
    observer.unobserve(el);
    listeners.delete(el);
  };
};

function step(el) {
  const { cb, data } = listeners.get(el);
  let y = (window.pageYOffset - data.center) / data.range;
  if (data.y !== y) {
    data.y = y;
    cb(y, { ref: el });
  }
  listeners.set(el, { cb, data, rafID });
  let rafID = window.requestAnimationFrame(() => {
    step(el);
  });
}

function stop(el) {
  const { cb, data, rafID } = listeners.get(el);
  if (rafID) {
    window.cancelAnimationFrame(rafID);
    listeners.set(el, { cb, data, rafID: null });
  }
}

const useParallax = cb => {
  if (typeof window === 'undefined') return null;
  if (typeof window.IntersectionObserver !== 'function') return null;

  const [ref, setRef] = React.useState(null);

  React.useLayoutEffect(() => {
    if (ref) {
      listenToIntersections(ref, cb);
    }
  }, [ref]);

  return setRef;
};

export default useParallax;
