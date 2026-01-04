import { useSetState } from '0hook'
import { Button, Flex, Grid, Input } from 'aurad'
import React from 'react'
import { items } from './conf'
import { ObjectType } from 'abandonjs'
import * as math from 'mathjs'
import { TemperatureConverter, TimeConverter } from './helper'

// 在线重量、长度、面积、时间、角度、速度、温度、压力、热量、功率等换算
/**
长度单位转换
长度转换工具-支持国际长度单位，中国传统长度单位，英制长度单位

面积单位转换
面积转换工具-支持国际面积单位，中国传统面积单位，英制面积单位

重量单位转换
重量转换工具-支持国际重量单位，中国传统重量单位，英制重量单位(常衡制和金衡制)

时间单位转换
时间单位转换工具-支持国际时间单位

温度单位转换
温度单位转换工具-支持国际温度单位

压力单位转换
压力单位转换工具-Pa/kPa/hPa/MPa/bar/torr/psi等

热量单位转换
热量单位转换工具-Wh/mWh/kWh/MWh/J/kJ等

功率单位转换
功率单位转换工具-W/mW/kW/MW/GW等
图片处理
 */

export default function () {
  const [state, setState] = useSetState<ObjectType<string>>(
    {
      type: 'length',
      'length.metric.km': '',
      // ...
    },
    location.hash,
  )

  const handleConversion = (
    key: string,
    option: ObjectType<string>,
    item: ObjectType<string>,
  ) => {
    const data: string = state[key] || '0'
    console.log('🚀 ~ handleConversion ~ item:', item)
    console.log('🚀 ~ handleConversion ~ option:', option)
    console.log('🚀 ~ handleConversion ~ data:', data)

    const newState: ObjectType<string> = {}

    const getValue = (
      unitOption: ObjectType<string>,
      unitItem: ObjectType<string>,
    ) => {
      // console.log('🚀 ~ getValue ~ unitOption:', unitOption)
      // console.log('🚀 ~ getValue ~ unitItem:', unitItem)
      const itemValue = (item as any)?.value
      const unitItemValue = unitItem.value

      if (state.type === 'time')
        return TimeConverter.convert(data as string, option, unitOption)

      if (state.type === 'temperature')
        return TemperatureConverter.convert(
          Number(data),
          (option as any).value,
          (unitOption as any).value,
        )
      if (unitItemValue === itemValue)
        // return `${unitOption.rel} * ${data} / ${option.rel}`
        return math
          .divide(
            math.multiply(math.bignumber(unitOption.rel), math.bignumber(data)),
            math.bignumber(option.rel),
          )
          .toString()

      const getFormula = () => {
        // if (unitItemValue === itemValue)
        // return `${unitOption.rel} * ${data} / ${option.rel}`
        // console.log('🚀 ~ getValue ~ itemValue:', itemValue, unitItem.value)
        if (unitItemValue === 'british') {
          return `${data} *  ${unitItem.rel} * ${unitOption.rel} / ${item.rel} / ${option.rel} / 50292`
        }
        if (itemValue === 'british')
          return `${data} * 50292 * ${unitItem.rel} * ${unitOption.rel} / ${item.rel} / ${option.rel}`

        return `${unitOption.rel} * ${data} * ${unitItem.rel}/ ${item.rel} / ${option.rel}`
      }

      try {
        return math.evaluate(getFormula()).valueOf() || ''
      } catch (error) {
        return ''
      }
    }

    items
      .find((_) => _.value === state.type)
      ?.options?.forEach((unitItem: any) => {
        unitItem.options.forEach((unitOption: any) => {
          const key = `${state.type}.${unitItem.value}.${unitOption.value}`
          newState[key] = getValue(unitOption, unitItem)
        })
      })

    setState(newState)
    console.log('🚀 ~ handleConversion ~ newState:', newState)
  }

  return (
    <Flex
      className="mutual-conversion__unit-conversion"
      column
      style={{ alignItems: 'flex-start' }}
    >
      <Flex>
        {items.map((item) => (
          <Button
            key={item.value}
            type={state.type === item.value ? 'primary' : 'default'}
            onClick={() => {
              setState({ type: item.value })
            }}
          >
            {item.label}
          </Button>
        ))}
      </Flex>
      <Grid columns={1} style={{ gap: 20, width: '100%' }}>
        {items
          .find((_) => _.value === state.type)
          ?.options?.map((item: any) => {
            if (!item.value) return <React.Fragment key={item.value} />
            return (
              <Flex key={item.value} column>
                <h4>{item.label}</h4>
                <Grid style={{ width: '100%', gap: 20 }} columns={3}>
                  {item.options.map((option: any, j: number) => {
                    const key = `${state.type}.${item.value}.${option.value}`
                    return (
                      <Grid
                        key={j}
                        style={{
                          width: '100%',
                          gridTemplateColumns: '1fr auto',
                          alignItems: 'flex-end',
                        }}
                      >
                        <Flex>
                          <span style={{ fontSize: 12, paddingLeft: 10 }}>
                            {option.label}
                          </span>
                          <Input
                            value={state[key] || ''}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleConversion(key, option, item)
                              }
                            }}
                            onChange={(e: any) => {
                              setState({
                                [key]: e.target.value,
                              })
                            }}
                          />
                        </Flex>
                        <Button
                          onClick={() => handleConversion(key, option, item)}
                        >
                          转换
                        </Button>
                      </Grid>
                    )
                  })}
                </Grid>
              </Flex>
            )
          })}
      </Grid>
    </Flex>
  )
}
