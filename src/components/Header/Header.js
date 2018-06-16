import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import GatsbyLink from 'gatsby-link'

import media from 'utils/media'

import Container from 'components/Container'

const propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

const defaultProps = {}

const Default = styled.header`
  margin-bottom: 2.25rem;

  ${media.min.md`
    margin-bottom: 5.125rem;
  `}
`

const Brand = styled(GatsbyLink)`
  font-family: 'Tinos';
  font-weight: 700;
  font-size: 1.5rem;
  text-decoration: none;
  color: #444;
`

function Header ({ siteTitle }) {

  return (
    <Default>
      <Container>
        <Brand to={'/'} >{siteTitle}</Brand>
      </Container>
    </Default>
  )
}

Header.propTypes = propTypes

Header.defaultProps = defaultProps

export default Header
