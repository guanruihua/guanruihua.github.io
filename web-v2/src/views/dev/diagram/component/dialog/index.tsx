import { Dialog } from 'aurad'
import { PageState } from '../../type'
import ReactDOM from 'react-dom'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  state: PageState
  setState(newState: PageState): void
  [key: string]: any
}
export function DiagramDialog(props: Props) {
  const { state, setState } = props
  const { open, node = {} } = state.dialog || {}

  return ReactDOM.createPortal(
    <Dialog
      className="diagram-dialog"
      open={open}
      onCancel={() => {
        setState({
          dialog: {
            open: false,
            node: {},
          },
        })
      }}
    >
      {JSON.stringify(node)}
    </Dialog>,
    document.body,
  )
}
