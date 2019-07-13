import { fontSizes, rootFontSize, sans, serif } from 'style/tokens';
import { mediaQueryString } from 'style/media-queries';

const rem = n => `${n}rem`;

const type = {
  body: {
    fontFamily: serif.family,
    fontSize: rem(fontSizes.body.sm),
    lineHeight: serif.lineHeight,
    [mediaQueryString('min', 'sm')]: {
      fontSize: rem(fontSizes.body.lg),
    },
  },
  button: {
    fontFamily: sans.family,
    lineHeight: sans.lineHeight,
  },
  h1: {
    fontSize: rem(fontSizes.h1),
    fontWeight: serif.weight,
  },
  h2: {
    fontSize: rem(fontSizes.h2),
    fontWeight: serif.weight,
  },
  h3: {
    fontSize: rem(fontSizes.h3),
    fontWeight: serif.weight,
  },
  h4: {
    fontSize: rem(fontSizes.h4),
    fontWeight: serif.weight,
  },
  h5: {
    fontSize: rem(fontSizes.h5),
    fontWeight: serif.weight,
  },
  h6: {
    fontSize: rem(fontSizes.h6),
    fontWeight: serif.weight,
  },
  hero: {
    fontSize: rem(fontSizes.display),
  },
  html: {
    fontSize: `${rootFontSize}px`,
  },
  icon: {
    fontSize: rem(fontSizes.icon),
  },
  lead: {
    fontFamily: sans.family,
    fontSize: rem(fontSizes.lead),
    lineHeight: sans.lineHeight,
  },
  small: {
    fontFamily: sans.family,
    fontSize: rem(fontSizes.small),
    lineHeight: sans.lineHeight,
  },
};

export default type;
