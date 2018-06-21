import styled from 'styled-components'

import media from 'utils/media'

const Wrap = styled.div`
  margin: 0 0.375rem;

  ${media.min.xs`
    margin: 0 0.75rem;
  `}

  ${media.min.md`
    margin: 2.25rem 0.75rem;
  `}

  ${media.min.lg`
    margin: 2.25rem 3rem;
  `}
`

export default Wrap
