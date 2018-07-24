import PropTypes from 'prop-types'

import media from 'utils/media'

import Box from 'components/Box'

const propTypes = {
  noWrap: PropTypes.bool,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  stretch: PropTypes.bool,
  breakpoint: PropTypes.string,
  direction: PropTypes.string,
  overflow: PropTypes.string,
}

const defaultProps = {
  noWrap: false,
  alignItems: 'stretch',
  justifyContent: 'space-between',
  stretch: false,
  breakpoint: 'sm',
  direction: 'row',
  overflow: null,
}

const FlexContainer = Box.extend`

  ${({breakpoint}) => media.min[breakpoint]`
    display: flex;
  `}

  ${({stretch}) => stretch && `
    height: 100vh;
  `}

  ${({overflow}) => overflow && `
    overflow: ${overflow};
  `}

  ${({direction}) => direction && `
    flex-direction: ${direction};
  `}

  ${({noWrap}) => noWrap && `
    flex-wrap: nowrap;
  `}

  ${({alignItems}) => alignItems && `
    align-items: ${alignItems};
  `}

  ${({justifyContent}) => justifyContent && `
    justify-content: ${justifyContent};
  `}
`

FlexContainer.propTypes = propTypes

FlexContainer.defaultProps = defaultProps

export default FlexContainer
