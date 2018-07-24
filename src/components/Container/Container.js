import PropTypes from 'prop-types'

import { containerWidth } from 'utils/constants'

import Box from 'components/Box'

const propTypes = {
  textAlign: PropTypes.string,
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
}

const defaultProps = {
  textAlign: null,
  marginLeft: 'auto',
  marginRight: 'auto',
}

const Container = Box.extend`
  width: ${containerWidth};
  max-width: 100%;

  ${({textAlign}) => textAlign && `
    text-align: ${textAlign};
  `}
`

Container.propTypes = propTypes

Container.defaultProps = defaultProps

export default Container
