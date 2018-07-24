import PropTypes from 'prop-types'
import styled from 'styled-components'

import { space, spaceProps } from 'utils/spacing'

const propTypes = {
  flex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  position: PropTypes.oneOf([
    'absolute',
    'fixed',
    'initial',
    'relative',
    'static',
  ]),
  ...spaceProps.types,
}

const defaultProps = {
  flex: null,
  position: null,
}

const Box = styled.div`
  ${space}

  ${({flex}) => flex && `
    flex: ${flex};
  `}

  ${({position}) => position && `
    position: ${position};
  `}
`

Box.propTypes = propTypes

Box.defaultProps = defaultProps

export default Box