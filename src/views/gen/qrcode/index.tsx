import React from 'react'
import { ObjectType } from '0type'
import { Flex, Grid } from 'aurad'
import './index.less'

export default function SystemInfo() {
  const [state, setState] = React.useState<ObjectType>({})
  const init = async () => {
  }
  React.useEffect(() => {
    init()
  }, [])


  return (
    <Grid
      className="gen__qrcode"
      style={{
        gridTemplateColumns: 'auto 1fr',
      }}
    >
      <Flex>
        left
      </Flex>
      <Flex>
        right
      </Flex>
    </Grid>
  )
}
