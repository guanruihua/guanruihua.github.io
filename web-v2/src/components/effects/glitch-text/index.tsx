import { FC, CSSProperties } from 'react'
import './index.less'

interface GlitchTextProps {
  children: string
  speed?: number
  enableShadows?: boolean
  enableOnHover?: boolean
  className?: string
}

interface CustomCSSProperties extends CSSProperties {
  '--after-duration': string
  '--before-duration': string
  '--after-shadow': string
  '--before-shadow': string
}

/**
 * 
 * @param param0 
 * @returns 
 * @usage
import GlitchText from './GlitchText';
  
<GlitchText
  speed={1}
  enableShadows
  enableOnHover={false}
  className='custom-class'
>
  React Bits
</GlitchText>
 */
export const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = '',
}) => {
  const inlineStyles: CustomCSSProperties = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-5px 0 red' : 'none',
    '--before-shadow': enableShadows ? '5px 0 cyan' : 'none',
  }

  const hoverClass = enableOnHover ? 'enable-on-hover' : ''

  return (
    <div
      className={`glitch ${hoverClass} ${className}`}
      style={inlineStyles}
      data-text={children}
    >
      {children}
    </div>
  )
}
