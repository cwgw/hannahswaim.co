import styled from 'styled-components'

import media from 'utils/media'
import spacing from 'utils/spacing'

const Wrap = styled.div`
  margin: ${spacing(-3)};

  ${media.min.sm`
    margin: 0 ${spacing(2)};
  `}

  ${media.min.md`
    margin: ${spacing(4)} ${spacing(2)};
  `}

  ${media.min.lg`
    margin: ${spacing(4)};
  `}

  ${media.min.xl`
    margin: ${spacing(4)} ${spacing(8)};
    margin: ${spacing(4)};
  `}

  ${({noScroll}) => noScroll && `
    max-height: calc(100vh - ${spacing(-3)} * 2);
    overflow: hidden;
  `}
`

export default Wrap
