import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _has from 'lodash/has';
import _uniqueId from 'lodash/uniqueId';

const propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  atts: PropTypes.shape({
    viewBox: PropTypes.string,
    fill: PropTypes.string,
    stroke: PropTypes.string,
  }),
  inline: PropTypes.bool,
};

const defaultProps = {
  type: 'close',
  style: {},
  className: null,
  atts: {},
  inline: false,
};

const icons = {
  close: {
    paths: [
      ['line', { x1: 0, y1: 0, x2: 100, y2: 100 }],
      ['line', { x1: 100, y1: 0, x2: 0, y2: 100 }],
    ],
  },
  previous: {
    paths: [
      [
        'polyline',
        { points: '50,0 0,50 50,100', transform: 'translate(25,0)' },
      ],
    ],
  },
  next: {
    paths: [
      ['polyline', { points: '0,0 50,50 0,100', transform: 'translate(25,0)' }],
    ],
  },
  instagram: {
    atts: {
      viewBox: '0 0 512 512',
      fill: 'currentColor',
      stroke: 'none',
    },
    paths: [
      [
        'path',
        {
          transform: 'translate(32,0)',
          d:
            'M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z',
        },
      ],
    ],
  },
  mail: {
    atts: {
      viewBox: '0 0 512 512',
      fill: 'currentColor',
      stroke: 'none',
    },
    paths: [
      [
        'path',
        {
          d:
            'M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z',
        },
      ],
    ],
  },
};

const Svg = styled.svg``;

const Icon = React.forwardRef(
  ({ atts, className, inline, style, title, type }, ref) => {
    const name = type.slice().toLowerCase();

    const defaultAtts = {
      viewBox: '0 0 100 100',
      fill: 'none',
      stroke: 'currentColor',
      preserveAspectRatio: 'none',
    };

    const additionalStyle = inline
      ? {
          display: 'inline-block',
          verticalAlign: '-.175em',
          width: '1em',
          height: '1em',
        }
      : {
          display: 'block',
          width: '100%',
          height: 'auto',
        };

    if (_has(icons, name)) {
      const { atts: iconAtts, paths } = icons[name];

      const titleId = _uniqueId('iconTitle_');

      return (
        <Svg
          style={{
            ...additionalStyle,
            ...style,
          }}
          className={className}
          {...{
            ...defaultAtts,
            ...iconAtts,
            ...atts,
          }}
          {...(title
            ? { 'aria-labelledby': titleId }
            : { 'aria-hidden': true })}
          ref={ref}
        >
          {title && <title id={titleId}>{title}</title>}
          {paths.map(([Element, pathAtts], index) => (
            <Element
              key={Element + index}
              vectorEffect="non-scaling-stroke"
              {...pathAtts}
            />
          ))}
        </Svg>
      );
    } else return null;
  }
);

Icon.propTypes = propTypes;

Icon.defaultProps = defaultProps;

export default Icon;
