import axios from 'axios'
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

interface Response {
  data?: any
  status?: number
  error?: boolean
}

export const useSender = (api: {
  config: AxiosRequestConfig
}): ((payload: any) => Promise<Response>) => {
  const token = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('token')
  }, [])

  const sender = async (payload: any): Promise<Response> => {
    if (!token) {
      return {
        status: 401,
        error: true,
      }
    }
    const options = getOptionsWithPayload(api, payload)
    try {
      const result = await axios({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        ...api.config,
        ...options,
      })
      return {
        data: result.data,
        status: result.status,
        error: true,
      }
    } catch (e) {
      if (e.response) {
        return {
          status: e.response.status,
        }
      } else {
        return {
          error: true,
        }
      }
    }
  }
  return sender
}
