import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import media from 'utils/media'
import breakpoints from 'utils/breakpoints'

import Container from 'components/Container'

const propTypes = {
  noWrap: PropTypes.bool,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  stretch: PropTypes.bool,
  breakpoint: PropTypes.string,
}

const defaultProps = {
  noWrap: false,
  alignItems: 'stretch',
  justifyContent: 'space-between',
  stretch: false,
  breakpoint: 'sm',
}

    // ${Container} > & {
    //   margin: 0 -1.5rem;
    // }

const FlexContainer = styled.div`

  ${({breakpoint}) => media.min[breakpoint]`
    display: flex;
  `}

  ${({stretch}) => stretch && `
    height: 100vh;
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
