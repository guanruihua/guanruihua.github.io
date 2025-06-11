import React from 'react'
import { useSetState } from '0hook'
import { Button, Grid, Input, Radio, Select } from 'aurad'
import { Default, Options } from './conf'
import { isArray } from 'asura-eye'
import { Conf, State } from './type'
import './index.less'
import { vid } from 'abandonjs'
import { Todo } from './todo'

export default () => {
  const [conf, setConf] = useSetState<Conf>(Default.conf, 'tool-todo-conf')
  const [state, setState] = useSetState<State>(Default.state, 'tool-todo-list')

  const onDel = (item:Conf)=>{
    
  }

  const onAdd = () => {
    if (isArray(state.todo)) {
      state.todo.unshift(conf)
    } else {
      state.todo = [conf]
    }
    state.lastUpdate = new Date().getTime()
    setState(state)
    // setConf({ desc: '', id: vid() })
    setConf({ id: vid() })
  }

  return (
    <div className="tool-todo-list-container">
      <div>
        <Grid className="conf">
          <div className="input">
            <Input
              value={conf.desc}
              onChange={(e: any) => setConf({ desc: e.target.value || '' })}
            />
            <Button
              disabled={!(conf.desc && conf.frequency && conf.timeFrequency)}
              onClick={onAdd}
            >
              Add
            </Button>
          </div>
          {Options.Frequency.map((item, i) => (
            <Radio
              key={i}
              value={conf.frequency}
              options={item}
              onChange={(e) => setConf({ frequency: e.target.value })}
            />
          ))}
          <hr />
          <Radio
            value={conf.timeFrequency}
            options={Options.TimeFrequency}
            onChange={(e) => setConf({ timeFrequency: e.target.value })}
          />
        </Grid>
      </div>
      <Todo state={state} />
    </div>
  )
}
