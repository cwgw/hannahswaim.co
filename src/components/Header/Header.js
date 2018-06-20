import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { Transition } from 'react-transition-group'

import GatsbyLink from 'gatsby-link'

import media from 'utils/media'
import colors from 'utils/colors'
import breakpoints from 'utils/breakpoints'

import Container from 'components/Container'
import FlexContainer from 'components/FlexContainer'
import Navigation from './components/Navigation'
import MobileNavigation from './components/MobileNavigation'
import Hamburger from './components/Hamburger'

const propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

const defaultProps = {}

const Default = styled.header`
  padding: 0.75rem 0;

  ${media.min.sm`
    margin-bottom: 1.75rem;
    padding: 1.5rem 0;
  `}

  ${media.min.md`
    margin-bottom: 5.125rem;
    padding: 0;
  `}
`

const Brand = styled(GatsbyLink)`
  font-family: 'Tinos';
  font-weight: 700;
  font-size: 1.5rem;
  text-decoration: none;
  color: ${colors.body};

  ${media.max.modal`
    position: relative;
    z-index: 1000;
  `}
`

function Header ({siteTitle, pages, UIStore}) {

  return (
    <Default>
      <Container>
        <FlexContainer
          breakpoint="none"
          justifyContent={UIStore.viewportWidth >= breakpoints.nav ? 'flex-start' : 'space-between'}
          alignItems={'baseline'}
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
    </Default>
  )
}

Header.propTypes = propTypes

Header.defaultProps = defaultProps

export default inject('UIStore')(observer(Header))
