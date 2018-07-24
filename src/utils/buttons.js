import { colors } from 'utils/constants'
import { has } from 'utils/helpers'
import { getLuminance } from 'polished'

export const buttonVariant = ({variant, outline}) => () => {

  let primary = has(colors, variant) ? colors[variant][3] : 'inherit'

  if (variant === 'dark') {
    primary = 'white'
  }

  if (variant === 'light') {
    primary = colors.body
  }

  const secondary = outline ? 'transparent' : getLuminance(primary) > 0.5 ? colors.body : 'white'

  return outline ? {
    color: primary,
    background: secondary,
  } : {
    color: secondary,
    background: primary
  }
}