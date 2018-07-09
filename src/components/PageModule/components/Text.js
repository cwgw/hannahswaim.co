import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { containerWidth, colors, brandColors, gray } from 'utils/constants'
import spacing from 'utils/spacing'

import Container from 'components/Container'

const propTypes = {
  html: PropTypes.string.isRequired,
}

const defaultProps = {}

const Content = styled.div`
  background-color: ${colors.background};
  padding-bottom: ${spacing(2)};

  @media screen and (min-width: ${containerWidth}) {

    & .gatsby-resp-image-wrapper {
      margin-left: -${spacing(2)} !important;
      margin-bottom: ${spacing(4)};
      z-index: 1;

      &: after {
        content: '';
        position: absolute;
        background-image: linear-gradient(70deg, ${gray[6]}, ${brandColors[5]});
        width: 100%;
        height: 100%;
        right: -${spacing(2)};
        bottom: -${spacing(-2)};
        z-index: -1;
      }
    }
  }
`

function Text (props) {

  const {
    html,
  } = props

  return (
    <Container>
      <Content dangerouslySetInnerHTML={{__html: html}} />
    </Container>
  )
}

Text.propTypes = propTypes

Text.defaultProps = defaultProps

export default Text
