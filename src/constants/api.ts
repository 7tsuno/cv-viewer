import { AxiosRequestConfig } from 'axios'

export const DOMAIN = process.env.REACT_APP_API_ENDPOINT || undefined

export const API: { [NAME: string]: { config: AxiosRequestConfig } } = {
  GET_REPORTS: {
    config: {
      url: '/.netlify/functions/report',
      method: 'GET',
    },
  },
}
