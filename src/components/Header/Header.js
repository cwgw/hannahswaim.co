import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { Transition } from 'react-transition-group'

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
  absolutePositioning: PropTypes.bool,
}

const defaultProps = {
  absolutePositioning: false
}

const Default = styled.header`
  position: relative;
  z-index: ${zIndex.banner};
  margin: 0 0 ${spacing(1)};
  color: ${colors.link};

  ${media.min.sm`
    margin: ${spacing(2)} 0 ${spacing(4)};
  `}

  ${media.min.md`
    margin: 0 0 5.125rem;
    margin: 0 0 ${spacing(8)};
  `}
`

const Absolute = Default.extend`
  ${media.min.lg`
    position: absolute;
    top: ${spacing(4)};
    left: ${spacing(4)};
    width: calc(100% - ${spacing(4)} * 2);
    padding: 0 ${spacing(1)};
    color: ${colors.white};
  `}
`

const Brand = styled(GatsbyLink)`
  font-family: 'Tinos';
  font-weight: 700;
  font-size: ${spacing(2)};
  margin-left: -${spacing(0)};
  padding: ${spacing(-1)} ${spacing(0)} ${spacing(-2)};
  text-decoration: none;
  color: inherit;
  transition: color 175ms ${ease},
              background-color 175ms ${ease};

  &:focus {
    outline: none;
    background-color: ${colors.link};
    color: ${colors.white};
  }

  ${media.min.nav`
    border-bottom: 1px solid currentColor;
  `}
`

function Header (props) {

  const {
    siteTitle,
    pages,
    UIStore,
    absolutePositioning,
  } = props

  const Element = absolutePositioning ? Absolute : Default

  return (
    <Element role="banner" >
      <Container>
        <FlexContainer
          breakpoint="none"
          justifyContent={UIStore.viewportWidth >= breakpoints.nav ? 'flex-start' : 'space-between'}
          alignItems="baseline"
        >
          <Brand to={'/'} >{siteTitle}</Brand>
          {UIStore.viewportWidth >= breakpoints.nav
            ? (
              <Navigation pages={pages} />
            ) : (
              <Hamburger />
            )
          }
        </FlexContainer>
        {UIStore.viewportWidth < breakpoints.nav && (
          <Transition
            in={UIStore.isNavOpen}
            timeout={300}
            mountOnEnter
            unmountOnExit
          >
            {(state) => (
              <MobileNavigation
                pages={pages}
                transitionState={state}
              />
            )}
          </Transition>
        )}
      </Container>
    </Element>
  )
}

Header.propTypes = propTypes

Header.defaultProps = defaultProps

export default inject('UIStore')(observer(Header))
