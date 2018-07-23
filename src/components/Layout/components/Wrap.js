import React from 'react'
import styled from 'styled-components'

import media from 'utils/media'
import spacing from 'utils/spacing'

import circle from 'images/background.svg'
import squiggles from 'images/squiggle.svg'

const Default = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;
  padding: ${spacing(-3)};

  ${media.min.sm`
    padding: 0 ${spacing(2)};
  `}

  ${media.min.md`
    padding: ${spacing(4)} ${spacing(2)};
  `}

  ${media.min.lg`
    padding: ${spacing(4)};
  `}

  ${media.min.xl`
    padding: ${spacing(4)} ${spacing(8)};
    padding: ${spacing(4)};
  `}

  ${({noScroll}) => noScroll && `
    max-height: calc(100vh - ${spacing(-3)} * 2);
    overflow: hidden;
  `}
`

const Image = styled.img`
  position: absolute;
  z-index: -1;
  user-select: none;
  pointer-events: none;
  mix-blend-mode: hard-light;
`

const Circle = Image.extend`
  width: calc(180px + 85vw);
  height: calc(180px + 85vw);
  left: -30vw;
  // top: -60vw;
  top: -50vw;
`

const Squiggles = Image.extend`
  width: calc(200px + 20vw);
  height: calc(200px + 20vw);
  left: 70vw;
  bottom: 0;
`

function Wrap ({children, noScroll}) {

  return (
    <Default
      noScroll={noScroll}
    >
      <Circle
        src={circle}
        alt=""
      />
      <Squiggles
        src={squiggles}
        alt=""
      />
      {children}
    </Default>
  )
}

export default Wrap
