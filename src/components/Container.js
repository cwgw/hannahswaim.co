import styled from 'styled-components'

import { containerWidth } from 'utils/constants'
import Box from 'components/Box'

const defaultProps = {
  marginLeft: 'auto',
  marginRight: 'auto',
  size: containerWidth,
}

const Container = styled(Box)`
`

Container.defaultProps = defaultProps

export default Container
