import React from 'react'
import './index.less'
import { Keypads } from './conf'
import { useSetState } from '0hook'
import { isArray } from 'asura-eye'
import { toResult } from './help'
import { Button, Div, Flex } from 'aurad'

interface State {
  formula?: string
  result?: string
  history?: string[]
  type?: 'default' | 'input-formula'

  inputFormulaInput?: string
  inputFormulaResult?: string
  inputFormulas?: string[][]
}

export default function () {
  const [state, setState] = useSetState<State>(
    {
      formula: '',
      result: '',
      history: [],
      type: 'default',

      inputFormulaInput: '',
      inputFormulaResult: '',
      inputFormulas: [],
    },
    '/tool/calculator/cache',
  )
  const handleClick = (val: string) => {
    let newFormula = ''

    switch (val) {
      case 'C':
        newFormula = ''
        break
      case 'Del':
        newFormula = (state?.formula || '').replace(/.$/, '')
        break
      case '=':
        break
      case 'Switch':
        return
      default:
        newFormula = (state?.formula || '') + val
        break
    }
    const newState: State = {
      formula: newFormula,
      result: toResult(newFormula),
    }

    if (val === '=' && state.formula) {
      const row = `${state.formula}=${state.result}`
      if (!isArray(state.history)) {
        state.history = [row]
      } else {
        state.history.unshift(row)
      }
      newState.history = state.history.slice(0, 100)
    }

    setState(newState)
  }
  return (
    <div className="tool-calculator">
      <Flex
        style={{
          zoom: '.8',
          marginBottom: 10,
        }}
      >
        {/* <Button
          onClick={() => {
            setState({
              type: state.type === 'default' ? 'input-formula' : 'default',
            })
          }}
        >
          Switch
        </Button> */}
        {/* {state.type === 'input-formula' && (
          <Button
            onClick={() => {
              if (!state.inputFormulas) {
                state.inputFormulas = []
              }
              state.inputFormulas.unshift([Date.now().toString(), ''])
              setState(state)
            }}
          >
            Add
          </Button>
        )} */}
        {/* {state.type === 'input-formula' && (
          <Button
            onClick={() => {
              setState({
                inputFormulas: [[Date.now().toString(), '']],
              })
            }}
          >
            Clear
          </Button>
        )} */}
      </Flex>
      {/* <Div className="input-formula" none={state.type !== 'input-formula'}>
        {state?.inputFormulas?.map((item, i) => {
          const [id, value, result = 0] = item
          return (
            <div key={id}>
              <div className="row">
                <input
                  className="input-formula-input"
                  value={value || ''}
                  onChange={(e) => {
                    if (!state.inputFormulas) {
                      state.inputFormulas = []
                    }
                    state.inputFormulas[i][1] = e.target.value
                    state.inputFormulas[i][2] = toResult(e.target.value)
                    setState(state)
                  }}
                />
                <div className="input-formula-result">{result}</div>
                <Button
                  onClick={() => {
                    if (!state.inputFormulas) {
                      state.inputFormulas = []
                    }
                    state.inputFormulas = state.inputFormulas.filter(
                      (_) => _[0] !== id,
                    )
                    setState(state)
                  }}
                >
                  Del
                </Button>
              </div>
            </div>
          )
        })}
      </Div> */}
      <Div
        className="tool-calculator-layout"
        // none={state.type && state.type !== 'default'}
      >
        <div className="simple">
          {Keypads.map((val) => {
            const onClick = () => handleClick(val)
            if (val === 'Switch') {
              return (
                <div
                  className="keypad"
                  key={val}
                  data-val={val}
                  onClick={onClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M14.293 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L16.586 8H5a1 1 0 0 1 0-2h11.586l-2.293-2.293a1 1 0 0 1 0-1.414m-4.586 10a1 1 0 0 1 0 1.414L7.414 16H19a1 1 0 1 1 0 2H7.414l2.293 2.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0"
                    ></path>
                  </svg>
                </div>
              )
            }
            if (val === '-') {
              return (
                <div
                  className="keypad"
                  key={val}
                  data-val={val}
                  onClick={onClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="0.88em"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M432 256c0 17.7-14.3 32-32 32H48c-17.7 0-32-14.3-32-32s14.3-32 32-32h352c17.7 0 32 14.3 32 32"
                    ></path>
                  </svg>
                </div>
              )
            }
            return (
              <div
                className="keypad"
                key={val}
                data-val={val}
                onClick={onClick}
              >
                {val}
              </div>
            )
          })}
        </div>
        <div className="history-box">
          <div className="now">
            <div className="result">{state?.result}</div>
            <div className="formula">{state?.formula}</div>
          </div>
          <div className="history">
            {state?.history?.map((row, i) => (
              <div className="item" key={i}>
                {row}
              </div>
            ))}
          </div>
        </div>
      </Div>
    </div>
  )
}
