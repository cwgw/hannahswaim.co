import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import media from 'utils/media'

const propTypes = {}

const defaultProps = {}

const Wrap = styled.div`
  margin: 0 0.375rem;

  ${media.min.md`
    margin: 2.25rem 0.75rem;
  `}

  ${media.min.lg`
    margin: 2.25rem 3rem;
  `}
`

Wrap.propTypes = propTypes

Wrap.defaultProps = defaultProps

export default Wrap
