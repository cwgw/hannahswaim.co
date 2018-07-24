import styled from 'styled-components'

import media from 'utils/media'
import spacing from 'utils/spacing'

const Wrap = styled.div`
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
    max-height: 100vh;
    overflow: hidden;
  `}
`

export default Wrap
