import axios from 'axios'
import { DOMAIN } from 'constants/api'
import { useAuth0 } from '@auth0/auth0-react'
import { AxiosRequestConfig } from 'axios'

if (DOMAIN) {
  axios.defaults.baseURL = DOMAIN
}
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

const getOptionsWithPayload = (
  api: { config: AxiosRequestConfig },
  payload: any
) => {
  switch (api.config.method) {
    case 'GET':
      return {
        params: payload,
      }
    case 'POST':
      return {
        data: payload,
      }
    case 'DELETE':
      return {
        url: `${api.config.url}/${payload}`,
      }
  }
}

export const useSender = (api: {
  config: AxiosRequestConfig
}): ((payload: any) => Promise<any>) => {
  const { getAccessTokenSilently } = useAuth0()
  const sender = async (payload: any): Promise<any> => {
    const accessToken = await getAccessTokenSilently()
    const options = getOptionsWithPayload(api, payload)
    const result = await axios({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      ...api.config,
      ...options,
    })
    return result
  }

  return sender
}
