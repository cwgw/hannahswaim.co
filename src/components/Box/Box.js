import PropTypes from 'prop-types'
import styled from 'styled-components'
import tag from 'clean-tag'

import { space, spaceProps } from 'utils/spacing'

const propTypes = {
  is: PropTypes.string,
  blacklist: PropTypes.array,
  flex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  ...spaceProps.types,
}

const defaultProps = {
  is: 'div',
  blacklist: spaceProps.list,
  flex: null,
}

const Box = styled(tag)`
  ${space}
  ${({flex}) => flex && `
    flex: ${flex};
  `}
`

Box.propTypes = propTypes

Box.defaultProps = defaultProps

export default Box