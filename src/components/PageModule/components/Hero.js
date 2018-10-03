import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

import { colors, borderRadius, breakpoints, ease, containerWidth } from 'utils/constants'
import media from 'utils/media'
import spacing from 'utils/spacing'
import { withViewportProps } from 'components/ViewportObserver'
import Container from 'components/Container'
import { Circle } from 'components/Graphics'

const propTypes = {
  image: PropTypes.shape({
    fluid: PropTypes.object,
  }),
  innerHTML: PropTypes.string.isRequired,
}

const defaultProps = {}

const Wrapper = styled.div`
  border-radius: ${borderRadius};

  ${media.max.lg`
    padding-bottom: 40%;
  `}

  ${media.min.lg`
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    min-height: calc(100vh - (${spacing(4)} * 2));
    min-height: 50vh;
    background-color: ${colors.gray[3]};
    overflow: hidden;
  `}
`

const ImageContainer = styled.div`
  position: absolute;
  top: -${spacing(2)};
  bottom: 0;
  right: 0;
  max-width: ${containerWidth};
  width: calc(100% - ${spacing(4)});
  transition: left 350ms ${ease};

  ${media.min.lg`
    left: calc(50vw - 100px);
    width: auto;
    max-width: none;
  `}
`

const TextContainer = styled.div`
  position: relative;
  font-size: ${spacing(1)};

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

  ${media.min.sm`
    font-size: ${spacing(2)};
  `}

  ${media.min.lg`
    padding: ${spacing(10)} 50% ${spacing(12)} 0;
    font-size: ${spacing(2)};
  `}

  ${media.max.lg`
    padding: ${spacing(4)};
    border-radius: ${borderRadius};
    background-color: white;
    width: 70%;
    min-width: 300px;
    border-bottom: 1px solid ${colors.brand[4]};
    border-left: 1px solid ${colors.brand[4]};
  `}

`

function Hero (props) {

  const {
    innerHTML,
    image,
    viewportDimensions,
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
      {viewportDimensions.width >= breakpoints.lg && (
        <Circle
          fill="white"
          // style={{transform: `translate(-${spacing(4)}, -${spacing(4)})`}}
          style={{transform: `translate(${spacing(4)}, -${spacing(4)})`}}
        />
      )}
      <Container>
        <TextContainer dangerouslySetInnerHTML={{__html: innerHTML}} />
      </Container>
    </Wrapper>
  )
}

Hero.propTypes = propTypes

Hero.defaultProps = defaultProps

export default withViewportProps(Hero)
