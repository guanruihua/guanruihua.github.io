import { AutoComplete, AutoCompleteProps } from 'antd'
import { useState } from 'react'

const getDefault = () => {
  return [
    { label: 'YYYY-MM-DD (中日韩)', value: 'YYYY-MM-DD' },
    { label: 'MM/DD/YYYY (美加菲)', value: 'MM/DD/YYYY' },
    { label: 'DD/MM/YYYY (欧澳印)', value: 'DD/MM/YYYY' },
    { label: 'YYYY-MM-DD  HH:mm:ss(中日韩)', value: 'YYYY-MM-DD HH:mm:ss' },
    { label: 'MM/DD/YYYY  HH:mm:ss(美加菲)', value: 'MM/DD/YYYY HH:mm:ss' },
    { label: 'DD/MM/YYYY  HH:mm:ss(欧澳印)', value: 'DD/MM/YYYY HH:mm:ss' },
    { label: 'YYYY-MM-DD  HH:mm:ss SSS(中日韩)', value: 'YYYY-MM-DD HH:mm:ss SSS' },
    { label: 'MM/DD/YYYY  HH:mm:ss SSS(美加菲)', value: 'MM/DD/YYYY HH:mm:ss SSS' },
    { label: 'DD/MM/YYYY  HH:mm:ss SSS(欧澳印)', value: 'DD/MM/YYYY HH:mm:ss SSS' },
  ]
}

export function DayjsFormatInput({ value, setValue }) {
  // const [value, setValue] = useState('')
  const [options, setOptions] =
    useState<AutoCompleteProps['options']>(getDefault())

  const onChange = (data: string) => {
    setValue(data)
  }

  const getPanelValue = (searchText: string) =>
    getDefault().filter((_) =>
      _.label.toLowerCase().includes(searchText.toLowerCase()),
    )

  return (
    <AutoComplete
      value={value}
      options={options}
      style={{ width: 240 }}
      showSearch={{
        onSearch: (text) => setOptions(getPanelValue(text)),
      }}
      placeholder="Dayjs Format"
      onChange={onChange}
    />
  )
}
