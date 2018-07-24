import React from 'react'
import styled from 'styled-components'

const Default = styled.main`
  position: relative;
`

function Main ({children}) {
  return (
    <Default
      role="main"
    >
      {children}
    </Default>
  )
}

export default Main