import React from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { Button } from 'antd'
import axios from 'axios'

export default function HCaptchaPage() {
  const [token, setToken] = React.useState(null)
  const [data, setData] = React.useState('')

  const onSubmit = async () => {
    console.log(token)
    const res = await axios.post('http://localhost:2400/hCaptcha', { token })
    console.log(res.data.data)
    setData(JSON.stringify(res.data.data))
  }

  return (
    <div>
      <HCaptcha
        sitekey="7ef06df4-2424-48d6-a3d0-7b067636320c"
        onVerify={(token) => setToken(token)}
        onExpire={() => setToken(null)}
      />
      {token && (
        <div>
          <div>Token: </div>
          <div>{token}</div>
          <Button
            type="primary"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onSubmit()
            }}
          >
            Submit
          </Button>
          <div>Data: </div>
          <div>{data}</div>
        </div>
      )}
    </div>
  )
}
