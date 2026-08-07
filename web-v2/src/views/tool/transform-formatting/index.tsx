import { Button } from 'antd'
import './index.less'
import { Select } from 'antd'
import { Languages } from './conf'
import { useSetState } from '0hook'

export default function Module_transform() {
  const [state, setState] = useSetState({
    form: 'text',
    enabled_to: false,
    to: 'text',
  })
  return (
    <div
      className="module__transform-formatting"
      data-enabled-to={!!state?.enabled_to}
    >
      <div className="container">
        <div className="left container-box container-box__form">
          <div className="controls">
            <Select
              value={state?.form}
              options={Languages}
              onChange={(val) => setState({ form: val })}
            />
            <Button
              type={state?.enabled_to ? 'primary' : 'default'}
              onClick={() =>
                setState({
                  enabled_to: state?.enabled_to ? false : true,
                })
              }
            >
              To
            </Button>
          </div>
          <div className="input-area"></div>
        </div>
        <div className="right container-box container-box__to">
          <div className="controls">
            <Select
              value={state?.to}
              options={Languages}
              onChange={(val) => setState({ to: val })}
            />
          </div>
          <div className="input-area"></div>
        </div>
      </div>
    </div>
  )
}
