import './index.less'

type Props = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export const TechnicalStack = (props: Props) => {
  const { children, ...rest } = props
  return (
    <div className="technical-stack" {...rest}>
      Technical stack： {children}
    </div>
  )
}
