import request from '@/utils/request'
const requestUrl = window.env.userApi

export function login(data) {
  return request({
    url: `${requestUrl}/api/v1/auth/login`,
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: `${requestUrl}/api/v1/auth/logout`,
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}
