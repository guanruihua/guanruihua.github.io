import React from 'react'
import { UnicodeConverter } from './helper'
import { Button, Code, Flex, Grid, TextArea } from 'aurad'
import { useSetState } from '0hook'
import { copy } from '@/util'

const options = [
  { label: '文本', value: 'text' },
  { label: 'Unicode', value: 'escaped' },
  { label: 'U+格式', value: 'codePoints' },
  { label: '十六进制', value: 'hex' },
  { label: '十进制', value: 'decimal' },
]
export default function () {
  const [state, setState] = useSetState({
    type: 'text',
    value: '辛弃疾《青玉案·元夕》东风夜放花千树，更吹落、星如雨。宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。 蛾儿雪柳黄金缕，笑语盈盈暗香去。众里寻他千百度。蓦然回首，那人却在，灯火阑珊处。',
    // value: `\u8F9B\u5F03\u75BE\u300A\u9752\u7389\u6848\u00B7\u5143\u5915\u300B\u4E1C\u98CE\u591C\u653E\u82B1\u5343\u6811\uFF0C\u66F4\u5439\u843D\u3001\u661F\u5982\u96E8\u3002\u5B9D\u9A6C\u96D5\u8F66\u9999\u6EE1\u8DEF\u3002\u51E4\u7BAB\u58F0\u52A8\uFF0C\u7389\u58F6\u5149\u8F6C\uFF0C\u4E00\u591C\u9C7C\u9F99\u821E\u3002\u0020\u86FE\u513F\u96EA\u67F3\u9EC4\u91D1\u7F15\uFF0C\u7B11\u8BED\u76C8\u76C8\u6697\u9999\u53BB\u3002\u4F17\u91CC\u5BFB\u4ED6\u5343\u767E\u5EA6\u3002\u84E6\u7136\u56DE\u9996\uFF0C\u90A3\u4EBA\u5374\u5728\uFF0C\u706F\u706B\u9611\u73CA\u5904\u3002`,
    // value: 'U+8F9B U+5F03 U+75BE U+300A U+9752 U+7389 U+6848 U+B7 U+5143 U+5915 U+300B U+4E1C U+98CE U+591C U+653E U+82B1 U+5343 U+6811 U+FF0C U+66F4 U+5439 U+843D U+3001 U+661F U+5982 U+96E8 U+3002 U+5B9D U+9A6C U+96D5 U+8F66 U+9999 U+6EE1 U+8DEF U+3002 U+51E4 U+7BAB U+58F0 U+52A8 U+FF0C U+7389 U+58F6 U+5149 U+8F6C U+FF0C U+4E00 U+591C U+9C7C U+9F99 U+821E U+3002 U+20 U+86FE U+513F U+96EA U+67F3 U+9EC4 U+91D1 U+7F15 U+FF0C U+7B11 U+8BED U+76C8 U+76C8 U+6697 U+9999 U+53BB U+3002 U+4F17 U+91CC U+5BFB U+4ED6 U+5343 U+767E U+5EA6 U+3002 U+84E6 U+7136 U+56DE U+9996 U+FF0C U+90A3 U+4EBA U+5374 U+5728 U+FF0C U+706F U+706B U+9611 U+73CA U+5904 U+3002',
    targetType: 'escaped',
  }, location.hash)

  const getReview = () => {
    try {
      if (state.type === 'text')
        return UnicodeConverter.toUnicode(state.value || '', state.targetType)
      if (state.targetType === 'text')
        return UnicodeConverter.toChinese(state.value || '', state.type)
      return UnicodeConverter.toUnicode(
        UnicodeConverter.toChinese(state.value || '', state.type),
        state.targetType,
      )
    } catch (error) {
      return ''
    }
  }

  return (
    <Grid className="mutual-conversion__unicode-and-chinese" columns={2}>
      <Grid style={{ gridTemplateRows: 'auto 1fr' }}>
        <Flex>
          {options.map((item) => {
            return (
              <Button
                key={item.value}
                type={state.type === item.value ? 'primary' : 'default'}
                onClick={() => setState({ type: item.value })}
              >
                {item.label}
              </Button>
            )
          })}
        </Flex>
        <TextArea
          value={state.value || ''}
          onChange={(e: any) => {
            setState({ value: e.target.value || '' })
          }}
        />
      </Grid>
      <Grid style={{ gridTemplateRows: 'auto 1fr' }}>
        <Flex between>
          <Flex>
            {options.map((item) => {
              return (
                <Button
                  key={item.value}
                  type={state.targetType === item.value ? 'primary' : 'default'}
                  onClick={() => setState({ targetType: item.value })}
                >
                  {item.label}
                </Button>
              )
            })}
          </Flex>
          <Button onClick={() => copy(getReview())}>Copy</Button>
        </Flex>
        <Code code={getReview()} />
      </Grid>
    </Grid>
  )
}
