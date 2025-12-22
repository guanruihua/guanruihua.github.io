import { ObjectType } from '0type'

interface RequestProps {
  params?: ObjectType<any>
  defaultValue?: any
}

export async function request(props: RequestProps = {}) {
  const { params = {}, defaultValue = {} } = props

  try {
    // const url = `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&apikey=${apiKey}`
    // params.apikey = 'EFPI1W0IT64YLBB4'
    params.apikey = 'demo'
    const url =
      `https://www.alphavantage.co/query?` +
      new URLSearchParams(params).toString()
    const response = await fetch(url)
    if (response.ok) {
      const result = await response.json()
      return result || defaultValue
    } else {
      return defaultValue
    }
  } catch {
    return defaultValue
  }
}

/**
 CNH
 CNY
 */
