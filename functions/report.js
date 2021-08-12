const { NetlifyJwtVerifier } = require('@serverless-jwt/netlify')
import axios from 'axios'

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_TOKEN,
  CONTENTFUL_ENVIRONMENT,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_AUTH_AUDIENCE,
} = process.env

const verifyJwt = NetlifyJwtVerifier({
  issuer: `https://${REACT_APP_AUTH_DOMAIN}/`,
  audience: REACT_APP_AUTH_AUDIENCE,
})

exports.handler = verifyJwt(async (event, context) => {
  const contents = await axios.get(
    `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries?access_token=${CONTENTFUL_TOKEN}`
  )
  const data = {
    reports: contents.data?.items
      .filter((item) => item.sys.contentType.sys.id === 'report')
      .map((item) => item.fields),
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
})
