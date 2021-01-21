import Cookies from 'js-cookie'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'

export function getToken() {
  return Cookies.get(ACCESS_TOKEN)
}

export function setToken(token) {
  return Cookies.set(ACCESS_TOKEN, token)
}

export function removeToken() {
  return Cookies.remove(ACCESS_TOKEN)
}

export function getRefreshToken() {
  return Cookies.get(REFRESH_TOKEN)
}

export function setRefreshToken(token) {
  return Cookies.set(REFRESH_TOKEN, token)
}

export function removeRefreshToken() {
  return Cookies.remove(REFRESH_TOKEN)
}
