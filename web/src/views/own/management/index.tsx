import React from 'react'
import { Div, Flex } from 'aurad'
import { Fold } from './icon'
import { ObjectType } from '0type'
import { useNavigate } from 'react-router'
import { useSetState } from '0hook'
import { classNames, ClassNameType } from 'harpe'
import { Conf } from '../conf'
import './index.less'

export interface ManagementProps {
  children: React.ReactNode
  containerClassName?: ClassNameType
  menu: ObjectType[]
  onChange(name?: string, item?: ObjectType): void
  [key: string]: any
}

export function Management(props: ManagementProps) {
  const {
    cacheKey = '-g-management-cache',
    containerClassName,
    className,
    menu,
    children,
    onChange,
    ...rest
  } = props

  const nav = useNavigate()
  const isHome = ['', '#/', '/'].includes(location.hash)
  const [state, setState] = useSetState<ObjectType>(
    {
      selectName: '',
      fold: 1,
      leftFold: [],
    },
    cacheKey,
  )

  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const dom = ref.current
    if (!dom) return
    const timer = setTimeout(() => {
      const prop = (dom.attributes as any)['data-lazy']
      // console.log(JSON.stringify(prop))
      if (prop) {
        dom.setAttribute('data-lazy', '0')
      }
      timer && clearTimeout(timer)
    }, 10)

    return () => {
      timer && clearTimeout(timer)
    }
  }, [ref.current])

  const getTitle = () => {
    const paths = location.hash?.replace('#/own/', '').split('/')
    const name = paths?.[0]
    const path = paths.join('/')

    const module = Conf.find((_) => _.name === name)
    if (module?.route) {
      return module.route?.find?.((_) => module.path + _.path === path)?.title || ''
    }
    if (module?.group) {
      return module.group?.find?.((_) => _[1] === path)?.[0]
    }

    return ''
  }

  const title = getTitle()

  return (
    <div
      ref={ref}
      data-lazy="1"
      className={classNames([
        'management-layout',
        location.hash.replace('#/', '').replaceAll('/', '__'),
        containerClassName,
        state.fold === 1 ? 'fold' : 'unfold',
      ])}
    >
      <Flex className="header" between>
        <Flex className="header-left" alginCenter>
          <Fold
            className={'fold-icon'}
            onClick={() => {
              setState({
                fold: state.fold === 1 ? 0 : 1,
              })
            }}
          />
          <Div none={isHome} className="header-item" onClick={() => nav('/')}>
            HOME
          </Div>
          <Div
            none={['#/own', '/own'].includes(location.hash)}
            className="header-item"
            onClick={() => nav('/own')}
          >
            OWN
          </Div>
          <Div
            className="header-item"
            none={isHome}
            onClick={() => history.back()}
          >
            BACK
          </Div>
        </Flex>
        <Flex className="header-right" alginCenter>
          <h4>{title}</h4>
        </Flex>
      </Flex>
      <Flex column className="left">
        {menu.map((item: any, i) => {
          const { title, name, label, children = [] } = item
          return (
            <Div
              key={i}
              className="left-group"
              classNames={{
                fold: name && state?.leftFold?.includes(name),
              }}
            >
              {/* <div
                className="left-group-title"
                onClick={() => {
                  if (name) {
                    const getLeftFold = () => {
                      if (!isArray(state?.leftFold)) return [name]
                      if (state.leftFold.includes(name)) {
                        return state.leftFold.filter((_) => _ !== name)
                      }
                      return state.leftFold.concat(name)
                    }

                    setState({
                      leftFold: getLeftFold(),
                    })
                  }
                }}
              >
                {label ?? title}
              </div> */}
              <Flex className="left-group-children">
                {children.map((item: any, i: number) => {
                  const { title, label, name } = item
                  return (
                    <Flex
                      center
                      key={i}
                      className="left-item"
                      classNames={{
                        select: name && state.selectName === name,
                      }}
                      onClick={() => {
                        name && setState({ selectName: name })
                        onChange?.(name, item)
                      }}
                    >
                      {label ?? title}
                    </Flex>
                  )
                })}
              </Flex>
            </Div>
          )
        })}
      </Flex>
      <Div className="content" classNames={className} {...rest}>
        {children}
      </Div>
    </div>
  )
}
