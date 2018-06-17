import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import media from 'utils/media'
import breakpoints from 'utils/breakpoints'

const propTypes = {
  flex: PropTypes.bool,
  noWrap: PropTypes.bool,
  alignItems: PropTypes.string,
  breakpoint: PropTypes.string,
}

const defaultProps = {
  flex: false,
  noWrap: null,
  alignItems: null,
  breakpoint: 'sm',
}

const Default = styled.div`
  margin: 0 auto;
  width: 1028px;
  max-width: 100%;

  ${({breakpoint}) => media.min[breakpoint]`
    padding: 0 1.5rem;
  `}

  ${({background}) => background && `
    background: ${background};
  `}
`

const Flex = styled.div`
  flex-wrap: wrap;

  ${({breakpoint}) => media.min[breakpoint]`
    display: flex;
    justify-content: space-between;
    margin: 0 -1.5rem;
  `}

  ${({noWrap}) => noWrap && `
    flex-wrap: nowrap;
  `}

  ${({alignItems}) => alignItems && `
    align-items: ${alignItems};
  `}
`

function Container ({children, flex, breakpoint, noWrap, alignItems, ...props}) {
  return (
    <Default
      breakpoint={breakpoint}
      {...props}
    >
      {flex
        ? <Flex
            breakpoint={breakpoint}
            noWrap={noWrap}
            alignItems={alignItems}
          >
            {children}
          </Flex>
        : children
      }
    </Default>
  )
}

Container.propTypes = propTypes

Container.defaultProps = defaultProps

export default Container
