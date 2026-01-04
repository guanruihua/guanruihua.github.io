import dayjs from 'dayjs'
import { useSetState } from '0hook'
import { useFetchMDState } from '@/hook'
import { analysisMD } from './analysis-md'

export const useState = () => {
  const weekStartTime = dayjs().startOf('week').add(1, 'day').add(4, 'h')
  const timestamp = weekStartTime.valueOf()

  const [account, setAccount] = useSetState<{
    selectId: string
    id: string
    name: string
    list: [string, string][]
  }>(
    {
      selectId: 'own',
      id: 'own',
      name: 'Own',
      list: [
        ['own', 'Own'],
        ['1', 'Account 1'],
        ['2', 'Account 2'],
      ],
    },
    'ddl-game-task-account',
  )

  const [state, setState] = useSetState<{
    [key: string]: string[]
  }>(
    {
      [timestamp]: [],
    },
    'ddl-game-task',
  )
  const [md] = useFetchMDState('/ddl-game.md')
  const TASK = analysisMD(md)

  console.log(TASK)

  return {
    TASK,
    timestamp,
    account,
    setAccount,
    state,
    setState,
  }
}
