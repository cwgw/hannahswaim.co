import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { transparentize } from 'polished'

import GatsbyImage from 'gatsby-image'

import colors from 'utils/colors'
import media from 'utils/media'
import spacing from 'utils/spacing'

import DefaultContainer from 'components/Container'

const propTypes = {
  image: PropTypes.shape({
    fluid: PropTypes.object,
  }),
  html: PropTypes.string.isRequired,
}

const defaultProps = {}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;

  padding: ${spacing(8)} ${spacing(1)};

  ${media.min.lg`
    min-height: calc(100vh - (${spacing(4)} * 2));
  `}
`

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:before,
  &:after {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: '';
    background-image: linear-gradient(${colors.coolBlack},${transparentize(0.8,colors.coolBlack)});
  }

  &:before {
    mix-blend-mode: color;
    opacity: 1;
  }

  &:after {
    mix-blend-mode: hard-light;
    opacity: 0.5;
  }
`

const Container = DefaultContainer.extend`
  position: relative;
  z-index: 1;
  color: ${colors.white};
  margin-bottom: ${spacing(4)};
`

function Hero (props) {

  const {
    html,
    image,
  } = props

  return (
    <Wrapper>
      <ImageContainer>
        <GatsbyImage
          fluid={image.fluid}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />
      </ImageContainer>
      <Container>
        <div dangerouslySetInnerHTML={{__html: html}} />
      </Container>
    </Wrapper>
  )
}

Hero.propTypes = propTypes

Hero.defaultProps = defaultProps

export default Hero
