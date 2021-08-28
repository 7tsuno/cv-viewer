import axios from 'axios'
const jwt = require('jsonwebtoken')

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_TOKEN,
  CONTENTFUL_ENVIRONMENT,
  AUTH_USER_LIST,
  AUTH_AUDIENCE,
  AUTH_ISSUER,
  AUTH_SECRET,
} = process.env

const userList = AUTH_USER_LIST.split(',')

const verifyToken = (event) => {
  console.log(event.headers)
  const authHeader = event.headers['authorization']
  if (authHeader !== undefined) {
    if (authHeader.split(' ')[0] === 'Bearer') {
      try {
        const token = jwt.verify(authHeader.split(' ')[1], AUTH_SECRET, {
          audience: AUTH_AUDIENCE,
          issuer: AUTH_ISSUER,
        })
        if (userList.includes(token.name)) {
          return true
        } else {
          return false
        }
      } catch (e) {
        return false
      }
    } else {
      return false
    }
  } else {
    return false
  }
}

exports.handler = async (event, context) => {
  if (!verifyToken(event)) {
    return {
      statusCode: 401,
    }
  }
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
}
