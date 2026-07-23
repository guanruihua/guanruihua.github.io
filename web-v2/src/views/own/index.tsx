import React from 'react'
import { useNavigate } from 'react-router'
import { Div } from 'aurad'
import { __blank, Conf } from './conf'
import './index.less'
import { ObjectType } from '0type'
import { Flex } from 'aurad'

const len = 3

const getConfLayout = () => {
  const ConfLayout = {}
  const cols = new Array(len).fill(0)

  const getMinIndex = () => {
    let i = 0
    let min_val = cols[i]
    cols.map((n, j) => {
      if (n < min_val) {
        i = j
        min_val = n
      }
    })
    return i
  }

  Conf.forEach((item) => {
    const { name } = item
    const len = (item?.route?.length || item?.group?.length) + 8
    const i = getMinIndex()
    cols[i] += len
    ConfLayout[name] = i
  })

  return ConfLayout
}

const ConfLayout = getConfLayout()
const renderList = new Array(len).fill('')

const ReviewImg = ({ src }) => {
  const [imgSrc, setImgSrc] = React.useState(null)

  React.useEffect(() => {
    src?.then((v) => {
      setImgSrc(v.default)
    })
  }, [src])

  return <img className="review-img" src={imgSrc} />
}

export default function Own() {
  const nav = useNavigate()

  const onClick = (url: string) => {
    // console.log('🚀 ~ onClick ~ url:', url)
    if (__blank.includes(url)) {
      window.open(location.href + '/' + url, '__blank')
      return
    }

    if (url.startsWith('http'))
      window.open(url.indexOf('http') > -1 ? url : `https://${url}`, '_blank')
    // if (url.indexOf('/') == 0) nav('/own' + url)
    if (url.indexOf('/') == 0) nav(url)
    else nav('/own/' + url)
    // else window.location.hash = '#/' + url // 强制修改 hash
    // else nav(url)
  }

  return (
    <div className="own-page-content">
      <div
        className="own-page-content-container"
        style={{
          gridTemplateColumns: new Array(len).fill('1fr').join(' '),
        }}
      >
        {renderList.map((_, ri) => (
          <Flex key={ri}>
            {Conf.map((item: ObjectType, i) => {
              const { title, name, group, route, path = '/' } = item
              if (ConfLayout[name] !== ri) return
              return (
                <div key={i} className={'module ' + name}>
                  <div className="title">{title}</div>
                  <Div
                    className="children"
                    none={!group?.length && !route?.length}
                  >
                    {group?.map((child: string[], j: number) => {
                      const [title, url] = child

                      return (
                        <Div
                          key={j}
                          className="name"
                          onClick={() => onClick(url)}
                        >
                          {title}
                        </Div>
                      )
                    })}
                    {route?.map((child: ObjectType, j: number) => {
                      return (
                        <Div
                          key={'route__' + j}
                          className="name"
                          onClick={() => onClick(path + child.path)}
                        >
                          {child.review && <ReviewImg src={child.review} />}
                          {child.title}
                        </Div>
                      )
                    })}
                  </Div>
                </div>
              )
            })}
          </Flex>
        ))}
      </div>
    </div>
  )
}
