import React from 'react'
import { Button, Dialog, Flex, Grid, Input } from 'aurad'
import { ObjectType } from '0type'
import { useSetState } from '0hook'
import { isArray } from 'asura-eye'

interface SettingDialogProps {
  state: ObjectType
  setState(state: ObjectType): void
  [key: string]: any
}
const defaultValue = {
  template: 'react',
  name: '',
  version: 'latest',
  dependencies: {
    static: [],
    react: [
      ['antd', 'latest'],
      ['type', 'latest'],
      ['aurad', 'latest'],
      ['abandonjs', 'latest'],
      ['asura-eye', 'latest'],
      ['axios', 'latest'],
    ],
    vue: [
      ['element-plus', 'latest'],
      ['0type', 'latest'],
      ['aurad', 'latest'],
      ['abandonjs', 'latest'],
      ['asura-eye', 'latest'],
      ['axios', 'latest'],
    ],
  },
}

export function SandboxSettingDialog(props: SettingDialogProps) {
  const { state, setState } = props

  const [own, setOwn] = useSetState<{
    template: string
    name: string
    version: string
    dependencies: any
  }>(defaultValue)
  const { template = 'react' } = own

  React.useEffect(() => {
    setOwn(defaultValue)
  }, [state.open])

  const banAdd = () => {
    const { name, version } = own
    if (!name || !version) return true
    if (isArray(own?.dependencies?.[template])) {
      const list = own.dependencies[template]?.map((_) => _[0])
      if (list.includes(name)) return true
    }
    return false
  }
  const onAdd = () => {
    let { name, version = '', template = 'react' } = own
    try {
      if (!Number.isNaN(Number(version[0]))) {
        version = '^' + version
      }
      if (isArray(own.dependencies[template]))
        own.dependencies[template].push([name, version])
      else own.dependencies[template] = [[name, version]]
      own.name = ''
      own.version = 'latest'
      setOwn(own)
    } catch (error) {
      console.log(error)
    }
  }
  const onDel = (name: string) => {
    try {
      if (isArray(own?.dependencies?.[template])) {
        own.dependencies[template] = own.dependencies[template].filter(
          (item: string[]) => item[0] !== name,
        )
        setOwn(own)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getDependencies = () => {
    const renderDependencies: ObjectType<string> = {
      template,
    }
    if (isArray(own?.dependencies?.[template])) {
      own.dependencies[template].forEach((item) => {
        const [name, version] = item
        renderDependencies[name] = version
      })
    }
    return renderDependencies
  }

  const onOk = () => {
    const value = new URLSearchParams(getDependencies()).toString()
    window.open('/#/sandbox' + (value ? '?' + value : ''), '_blank')
    setState({
      open: false,
    })
  }
  const onClose = () =>
    setState({
      open: false,
    })

  return (
    <Dialog maskClosable open={state.open} onOk={onOk} onCancel={onClose}>
      <Grid>
        <Flex>
          {['static', 'react', 'vue'].map((name) => (
            <Button
              key={name}
              type={own.template === name ? 'primary' : 'default'}
              onClick={() => setOwn({ template: name })}
            >
              {name}
            </Button>
          ))}
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
              gridTemplateColumns: 'minmax(200px, 1fr) 160px 120px',
            }}
          >
            {isArray(own.dependencies?.[template]) ? (
              own.dependencies[template].map((item: string[]) => {
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
            <Button className="control" onClick={onAdd} disabled={banAdd()}>
              Add
            </Button>
          </Grid>
        </div>
      </Grid>
    </Dialog>
  )
}
