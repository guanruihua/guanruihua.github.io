import React from 'react'
import { Div } from 'aurad'
import { JsonEdit } from '../components/json-edit'
import { useSetState } from '0hook'
import dayjs from 'dayjs'

export interface ResultProps {
  selectRecord: any
  handleEdit(type: string, newVal: any, id?: string | number): void
  [key: string]: any
}

export function Result(props: ResultProps) {
  const { selectRecord, handleEdit } = props
  const [own, setOwn] = useSetState({
    value: '',
    select: '',
  })

  React.useEffect(() => {
    const [id, val] = selectRecord?.results?.[0] ?? []
    if (id && own.select !== id) {
      setOwn({ value: val, select: id })
    }
  }, [selectRecord?.results?.length])

  return (
    <div className="result">
      <JsonEdit
        key={own.select}
        value={own.value}
        onChange={(newVal) => handleEdit('results', newVal, own.select)}
      >
        <div className="result-list">
          {selectRecord?.results?.map((item: any) => {
            const [id, val] = item
            return (
              <Div
                key={id}
                classNames={[
                  'result-list-item',
                  {
                    select: own.select === id,
                  },
                ]}
                onClick={() =>
                  setOwn({
                    value: val,
                    select: id,
                  })
                }
              >
                {dayjs(id).format('HH:mm:ss:SSS')}
              </Div>
            )
          })}
        </div>
      </JsonEdit>
    </div>
  )
}
