import axios, { AxiosResponse } from 'axios'
import { DOMAIN } from 'constants/api'
import { AxiosRequestConfig } from 'axios'
import { useMemo } from 'react'

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
}): ((payload: any) => Promise<AxiosResponse<any> | any>) => {
  const token = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return params.get('token')
  }, [])

  const sender = async (payload: any): Promise<AxiosResponse<any> | any> => {
    const options = getOptionsWithPayload(api, payload)
    try {
      const result = await axios({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        ...api.config,
        ...options,
      })
      return result
    } catch (e) {
      return e
    }
  }

  return sender
}
