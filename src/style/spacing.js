import { spacingScale, spacingSizes, rootFontSize } from 'style/tokens';

const spacing = (i = 'default', units = 'px') => {
  if (typeof i === 'string') {
    return typeof spacingSizes[i] === 'number'
      ? spacing(spacingSizes[i], units)
      : i;
  }

  if (typeof i === 'number') {
    switch (units) {
      case 'px':
        return `${spacingScale[i] * rootFontSize}px`;
      case 'rem':
        return `${spacingScale[i]}rem`;
      default:
        return spacingScale[i];
    }
  }

  return i;
};

export default spacing;
