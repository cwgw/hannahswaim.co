import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import GatsbyImage from 'gatsby-image'

import { colors } from 'utils/constants'
import media from 'utils/media'
import spacing from 'utils/spacing'

import DefaultContainer from 'components/Container'

const propTypes = {
  image: PropTypes.shape({
    fluid: PropTypes.object,
  }),
  innerHTML: PropTypes.string.isRequired,
}

const defaultProps = {}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;

  padding: ${spacing(4)} ${spacing(1)};

  ${media.min.lg`
    min-height: calc(100vh - (${spacing(4)} * 2));
    min-height: 50vh;
    padding: ${spacing(10)} ${spacing(1)};
  `}
`

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.75;
  mix-blend-mode: screen;
  // z-index: -2;
`

const Container = DefaultContainer.extend`
  position: relative;
  z-index: 1;
  // color: ${colors.white};

  ${media.min.md`
    margin-bottom: ${spacing(8)};
    font-size: ${spacing(2)};

    h1,
    h2 {
      font-size: ${spacing(4,'em')};
    }

    h3,
    h4,
    h5,
    h6 {
      font-size: ${spacing(2,'em')};
    }
  `}

  ${media.min.lg`
    font-size: ${spacing(3)};
  `}

`

function Hero (props) {

  const {
    innerHTML,
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
      <Container
        marginBottom={4}
      >
        <div
          style={{
            paddingRight: '40%',
          }}
          dangerouslySetInnerHTML={{__html: innerHTML}}
        />
      </Container>
    </Wrapper>
  )
}

Hero.propTypes = propTypes

Hero.defaultProps = defaultProps

export default Hero
