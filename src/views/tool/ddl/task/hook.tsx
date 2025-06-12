import dayjs from 'dayjs'
import { useSetState } from '0hook'
import { getUID } from './util'
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
  console.log(analysisMD(md))

  // console.log(weekStartTime.format('YYYY-MM-DD HH:mm:ss'), timestamp)

  return {
    timestamp,
    account,
    setAccount,
    state,
    setState,
  }
}
