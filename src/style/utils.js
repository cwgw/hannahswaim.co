import { transparentize as _transparentize, mix as _mix } from 'polished';
import { get } from 'styled-system';

import theme from './theme';

// based on https://github.com/developit/dlv
export const delve = (obj, key, def, p, undef) => {
  key = key && key.split ? key.split('.') : [key];
  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }
  return obj === undef ? def : obj;
};

const getToken = (scale, key) => props => {
  const theme = delve(props, 'theme', props);
  return get(theme, `${scale}.${key}`);
};

const space = Object.keys(theme.space).reduce(
  (f, n) => {
    f[n] = getToken('space', n)({ theme });
    return f;
  },
  n => (props = theme) => getToken('space', n)(props)
);

const color = Object.keys(theme.colors).reduce(
  (f, color) => {
    f[color] = f(color)({ theme });
    return f;
  },
  color => (props = theme) => getToken('colors', color)(props)
);

const transparentize = (n, c) => props => {
  return _transparentize(n, color(c)(props));
};

const mix = (n, color1, color2) => props => {
  return _mix(n, color(color1)(props), color(color2)(props));
};

const gridColumnTemplate = (count = 6) => {
  const templateColumns = [];
  const colWidth = `minmax(0, ${space.xxl}px)`;
  const gutterWidth = `minmax(0, 1fr)`;

  for (let i = 0; i <= count; i++) {
    let line = [];
    if (i < count) line.push(`col${i + 1}Start`);
    if (i > 0) line.push(`col${i}End`);
    if (i === 0) line.push('contentStart');
    if (i === count) line.push('contentEnd');
    templateColumns.push(`[${line.join(' ')}]`);
  }

  return [
    '[bleedStart]',
    gutterWidth,
    templateColumns.join(` ${colWidth} `),
    gutterWidth,
    '[bleedEnd]',
  ].join(' ');
};

export { color, gridColumnTemplate, mix, space, transparentize };
