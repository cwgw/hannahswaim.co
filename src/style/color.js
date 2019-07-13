import { transparentize as _transparentize } from 'polished';
import has from 'lodash/has';

import { colors } from 'style/tokens';

const color = Object.keys(colors).reduce(
  (o, key) => ({
    ...o,
    [key]: ({ theme }) => (has(theme, key) ? theme[key] : colors[key]),
  }),
  {}
);

const transparentize = (amount, colorName) => props =>
  _transparentize(amount, colorName(props));

const paint = () => ({ painted, ...props }) => {
  if (painted) {
    return {
      backgroundColor: color.primary(props),
      color: color.secondary(props),
    };
  }
};

export { color, transparentize, paint };
