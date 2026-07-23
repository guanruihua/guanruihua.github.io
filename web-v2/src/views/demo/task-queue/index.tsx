import React from 'react'
import './index.less'
import { sleep } from '@/util'
import { Button } from 'antd'

const getList = () => [
  { uid: 'uid-0', status: 'idle', title: 'task 1', timeout: 6000 },
  { uid: 'uid-1', status: 'idle', title: 'task 2', timeout: 6000 },
  { uid: 'uid-2', status: 'idle', title: 'task 3', timeout: 6000 },
  { uid: 'uid-3', status: 'idle', title: 'task 4', timeout: 6000 },
  { uid: 'uid-4', status: 'idle', title: 'task 5', timeout: 6000 },
  { uid: 'uid-5', status: 'idle', title: 'task 6', timeout: 6000 },
  { uid: 'uid-6', status: 'idle', title: 'task 7', timeout: 6000 },
  { uid: 'uid-7', status: 'idle', title: 'task 8', timeout: 6000 },
  { uid: 'uid-8', status: 'idle', title: 'task 9', timeout: 6000 },
  { uid: 'uid-9', status: 'idle', title: 'task 10', timeout: 6000 },
]
export default function Demo_task_queue() {
  const [list, setList] = React.useState(getList())

  const update = async (list = []) => {
    const newList = [...list]
    let index = list.findIndex((_) => _.status === 'running')
    if (index === -1) {
      newList.at(-1).status = 'running'
      index = newList.length - 1
    }

    if (list[index]) {
      if (index > 3) {
        newList[index].status = 'success'
      } else {
        newList[index].status = 'error'
      }
    }

    if (list[index - 1]) {
      newList[index - 1].status = 'running'
    }
    await sleep()
    setList(newList)

    if (newList?.[index - 1]?.status === 'running') {
      await sleep(3000)
      update(newList)
    }
  }

  React.useEffect(() => {
    update(getList())
  }, [])

  return (
    <div className="demo__task-queue">
      <div className="demo__task-queue-container">
        {list.map((_, j) => (
          <div key={j} className="task-item" data-status={_.status}>
            {_.title}
          </div>
        ))}
      </div>
      <div>
        <Button
          onClick={async () => {
            setList(getList())
            await sleep()
            update(getList())
          }}
        >
          Reload
        </Button>
      </div>
    </div>
  )
}
