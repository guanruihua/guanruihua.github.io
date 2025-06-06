import React from 'react'
import { useSetState } from '0hook'
import { Button, Div, Flex, Grid, Input, Radio } from 'aurad'
import {
  Default,
  FrequencyOptions,
  getLabel,
  TimeFrequencyOptions,
} from './conf'
import { isArray } from 'asura-eye'
import { Conf, State } from './type'
import './index.less'
import { vid } from 'abandonjs'
import { todoFilter } from './util'

export default () => {
  const [conf, setConf] = useSetState<Conf>(Default.conf, 'tool-todo-conf')
  const [state, setState] = useSetState<State>(Default.state, 'tool-todo-list')

  const onAdd = () => {
    if (isArray(state.todo)) {
      state.todo.unshift(conf)
    } else {
      state.todo = [conf]
    }
    setState(state)
    setConf({ desc: '', id: vid() })
    // setConf({ id: vid() })
  }

  return (
    <div className="tool-todo-list-container">
      <div>
        <Grid className="conf">
          <div>Title</div>
          <Input
            value={conf.title}
            onChange={(e: any) => setConf({ title: e.target.value || '' })}
          />
          <div>Description</div>
          <Input
            value={conf.desc}
            onChange={(e: any) => setConf({ desc: e.target.value || '' })}
          />
          <div>Date Frequency</div>
          {FrequencyOptions.map((item, i) => (
            <Radio
              key={i}
              value={conf.frequency}
              options={item}
              onChange={(e) => setConf({ frequency: e.target.value })}
            />
          ))}
          {/* <div>Effective Time</div> */}
          <div>Time Frequency</div>
          <Radio
            value={conf.timeFrequency}
            options={TimeFrequencyOptions}
            onChange={(e) => setConf({ timeFrequency: e.target.value })}
          />
          <Button disabled={!conf.title} onClick={onAdd}>
            Add
          </Button>
        </Grid>
      </div>
      <div className="todo-container">
        <h3>Today</h3>
        <div className="todo">
          {state?.todo?.filter(todoFilter)?.map((item) => (
            <div className="todo-item" key={item.id}>
              <div className="desc">{item.desc}</div>
              <div className="tag">
                <div className="frequency">
                  {getLabel.Frequency(item.frequency)}
                </div>
                <div className="time-frequency">
                  {getLabel.TimeFrequency(item.timeFrequency)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <h3>All</h3>
        <div className="todo">
          {state?.todo?.map((item) => (
            <div className="todo-item" key={item.id}>
              <div className="desc">{item.title}</div>
              <div className="desc">{item.desc}</div>
              <div className="tag">
                <div className="frequency">
                  {getLabel.Frequency(item.frequency)}
                </div>
                <div className="time-frequency">
                  {getLabel.TimeFrequency(item.timeFrequency)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
