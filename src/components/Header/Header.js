import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import { Link as GatsbyLink } from 'gatsby'

import media from 'utils/media'
import spacing from 'utils/spacing'
import { colors, breakpoints, ease, zIndex } from 'utils/constants'

import Container from 'components/Container'
import FlexContainer from 'components/FlexContainer'
import Navigation from './components/Navigation'
import MobileNavigation from './components/MobileNavigation'
import Hamburger from './components/Hamburger'

const propTypes = {
  siteTitle: PropTypes.string.isRequired,
  UIStore: PropTypes.object.isRequired,
  pages: PropTypes.array,
  isAboveHero: PropTypes.bool,
  location: PropTypes.object,
}

const defaultProps = {
  pages: [],
  isAboveHero: false,
}

const Default = styled.header`
  position: relative;
  z-index: ${zIndex.banner};
  margin: 0 0 ${spacing(1)};
  color: ${colors.navbar};

  ${media.min.sm`
    margin: ${spacing(2)} 0 ${spacing(4)};
  `}

  ${media.min.md`
    margin: ${spacing(-1)} 0 ${spacing(8)};
  `}

  ${({isAboveHero}) => isAboveHero && media.min.lg`
    position: absolute;
    top: ${spacing(4)};
    left: ${spacing(4)};
    width: calc(100% - ${spacing(4)} * 2);
    margin-bottom: 0;
    padding: 0 ${spacing(1)};
    color: ${colors.link};
  `}

`

const Brand = styled(GatsbyLink)`
  position: relative;
  margin-left: -${spacing(0)};
  padding: ${spacing(-1)} ${spacing(0)} ${spacing(-2)};
  font-family: 'Tinos';
  font-weight: 700;
  font-size: ${spacing(2)};
  text-decoration: none;
  color: inherit;
  transition: color 175ms ${ease},
              background-color 175ms ${ease};

  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    bottom: -1px;
    border: 1px solid transparent;
    border-top-color: currentColor;
    border-radius: 4px;
    z-index: -1;
    transform: scale(0,1);
    transform-origin: center center;
    opacity: 0;
    transition: transform 350ms ${ease},
                opacity 350ms ${ease},
                border 350ms ${ease},
                top 175ms ${ease};
  }

  &:focus {
    outline: none;

    &:before {
      top: 0;
      border-color: currentColor;
      transform: scale(1,1);
      transition-duration: 175ms;
      opacity: 1;
    }
  }
`

function Header (props) {

  const {
    siteTitle,
    pages,
    UIStore,
    isAboveHero,
    location,
  } = props

  return (
    <Default
      role="banner"
      isAboveHero={isAboveHero}
    >
      <Container>
        <FlexContainer
          breakpoint="none"
          alignItems="baseline"
        >
          <Brand to={'/'} >{siteTitle}</Brand>
          {UIStore.viewportWidth >= breakpoints.nav
            ? (
              <Navigation
                pages={pages}
                location={location}
              />
            ) : (
              <Hamburger />
            )
          }
        </FlexContainer>
        {UIStore.viewportWidth < breakpoints.nav && (
          <MobileNavigation pages={pages} />
        )}
      </Container>
    </Default>
  )
}

Header.propTypes = propTypes

Header.defaultProps = defaultProps

export default inject('UIStore')(observer(Header))
