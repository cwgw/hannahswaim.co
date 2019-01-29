import React from 'react'
import styled from 'styled-components'

import { spacing } from 'style/layout'
import { sansSerif } from 'style/fonts'
import Link from 'components/Link'

const UnstyledButton = ({to, className, ...props}) => to
  ? <Link
      className={className}
      to={to}
      {...props}
    />
  : <button
      className={className}
      {...props}
    />

const Button = styled(UnstyledButton)`
  font-family: ${sansSerif};
  display: inline-block;
  vertical-align: middle;
  padding: ${spacing('sm')} ${spacing('md')};
  border: 1px solid currentColor;
  border-radius: ${spacing('xs')};
  color: inherit;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  user-select: none;

  &:hover,
  &:focus {
    background-color: currentColor;
  }
`

export default Button
