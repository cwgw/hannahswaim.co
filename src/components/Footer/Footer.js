import React from 'react'
import styled from 'styled-components'

import spacing from 'utils/spacing'
// import { colors } from 'utils/constants'

const propTypes = {}

const defaultProps = {}

const Default = styled.footer`
  margin-top: auto;
  min-height: ${spacing(2)};
  text-align: center;
`

function Footer (props) {
  return (
    <Default>
      {`hannah m. swaim | `}
      <a
        href="https://www.instagram.com/hannahswaimco/"
        rel="noopener noreferrer"
        target="_blank"
      >
        {' @hannahswaimco'}
      </a>
    </Default>
  )
}

Footer.propTypes = propTypes

Footer.defaultProps = defaultProps

export default Footer
