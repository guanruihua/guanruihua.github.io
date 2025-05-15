import React from 'react'
import { Button, Dialog, Flex, Grid, Input } from 'aurad'
import { ObjectType } from '0type'
import { useSetState } from '0hook'
import { isArray } from 'asura-eye'

export interface SettingDialogProps {
  state: ObjectType
  setState(state: ObjectType): void
  [key: string]: any
}

export function SettingDialog(props: SettingDialogProps) {
  const { state, setState } = props

  const [own, setOwn] = useSetState<{
    type: string
    name: string
    version: string
  }>({
    type: 'react',
    name: '',
    version: 'latest',
  })
  const { type = 'react' } = own

  React.useEffect(() => {
    if (state.open) {
      setOwn({
        type: state.type,
        name: '',
        version: 'latest',
      })
    } else {
      setOwn({
        type: 'react',
        name: '',
        version: 'latest',
      })
    }
  }, [state.open])

  const banAdd = () => {
    const { name, version } = own
    if (!name || !version) return true
    if (isArray(state?.dependencies?.[type])) {
      const list = state.dependencies[type]?.map((_) => _[0])
      if (list.includes(name)) return true
    }
    return false
  }
  const onAdd = () => {
    let { name, version = '' } = own
    try {
      if (!Number.isNaN(Number(version[0]))) {
        version = '^' + version
      }
      if (isArray(state.dependencies[type]))
        state.dependencies[type].push([name, version])
      else state.dependencies[type] = [[name, version]]
      setState(state)
    } catch (error) {
      console.log(error)
    }
    setOwn({
      name: '',
      version: 'latest',
    })
  }
  const onDel = (name: string) => {
    try {
      if (isArray(state?.dependencies?.[type])) {
        state.dependencies[type] = state.dependencies[type].filter(
          (item: string[]) => item[0] !== name,
        )
        setState(state)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const onOk = () => {
    setState({
      type,
      open: false,
    })
  }
  const onClose = () =>
    setState({
      open: false,
    })

  return (
    <div>
      <Dialog maskClosable open={state.open} onOk={onOk} onCancel={onClose}>
        <Grid>
          <Flex>
            {['static', 'react', 'vue'].map(
              (name) => (
                <Button
                  key={name}
                  type={own.type === name ? 'primary' : 'default'}
                  onClick={() => setOwn({ type: name })}
                >
                  {name}
                </Button>
              ),
            )}
          </Flex>
          <div className="dependencies">
            <h3
              style={{
                marginBottom: 10,
              }}
            >
              dependencies
            </h3>
            <Grid
              style={{
                gridTemplateColumns: 'minmax(200px, 1fr) 160px 80px',
              }}
            >
              {isArray(state.dependencies?.[type]) ? (
                state.dependencies[type].map((item: string[]) => {
                  const [name, version] = item
                  return (
                    <React.Fragment key={name}>
                      <div className="name">{name}</div>
                      <div className="version">{version}</div>
                      <Button
                        title="Del"
                        className="control"
                        onClick={() => onDel(name)}
                      >
                        Del
                      </Button>
                    </React.Fragment>
                  )
                })
              ) : (
                <div style={{ gridColumn: '1 / -1' }} />
              )}
              <Input
                value={own.name}
                onChange={(e: any) => {
                  setOwn({ name: e.target.value })
                }}
              />
              <Input
                value={own.version}
                onChange={(e: any) => {
                  setOwn({ version: e.target.value })
                }}
              />
              <Button
                className="control"
                onClick={onAdd}
                // disabled={!(own.name && own.version)}
                disabled={banAdd()}
              >
                Add
              </Button>
            </Grid>
          </div>
        </Grid>
      </Dialog>
    </div>
  )
}
