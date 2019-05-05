const breakpoints = new Map([
  ['xs', 480],
  ['sm', 576],
  ['md', 768],
  ['lg', 992],
  ['xl', 1200],
]);

const navBreakpoint = 'sm';

const modalBreakpoint = 'sm';

const rootFontSize = 18;

const grays = [
  '#191720',
  '#343040',
  '#504a5b',
  '#7b7483',
  '#a9a4ae',
  '#cac7cc',
  '#ededee',
];

const greens = [
  '#02201c',
  '#053630',
  '#185c4c',
  '#5cb899',
  '#89d6b4',
  '#bbedd2',
  '#e4fbea',
];

const brandColors = [
  '#19000e',
  '#530d1b',
  '#862828',
  '#b86e5c',
  '#ead4c0',
  '#f5ede3',
  '#fffbf5',
];

const colors = {
  background: '#fff',
  black: brandColors[0],
  body: grays[1],
  brand: brandColors,
  coolBlack: grays[0],
  gray: grays,
  green: greens,
  link: brandColors[2],
  navbar: brandColors[2],
  white: brandColors[6],
};

const boxShadow = [
  'none', // depth 0
  '0  2px 2px  0 rgba(0, 0, 0, 0.16), 0  0    2px 0 rgba(0, 0, 0, 0.12)', // depth 1
  '0  2px 5px  0 rgba(0, 0, 0, 0.16), 0  2px 10px 0 rgba(0, 0, 0, 0.12)', // depth 2
  '0  8px 17px 0 rgba(0, 0, 0, 0.20), 0  6px 20px 0 rgba(0, 0, 0, 0.19)', // depth 3
  '0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19)', // depth 4
  '0 16px 28px 0 rgba(0, 0, 0, 0.22), 0 25px 55px 0 rgba(0, 0, 0, 0.21)', // depth 5
  '0 27px 24px 0 rgba(0, 0, 0, 0.20), 0 40px 77px 0 rgba(0, 0, 0, 0.22)', // depth 6
];

const ease = {
  in: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  out: 'cubic-bezier(0.4, 0.0, 1, 1)',
  inOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
};

export {
  boxShadow,
  brandColors,
  breakpoints,
  colors,
  ease,
  grays,
  greens,
  rootFontSize,
  modalBreakpoint,
  navBreakpoint,
};
