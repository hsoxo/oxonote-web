import request from '@/utils/request'

export function login(username: string, password: string) {
  return request({
    url: '/backend/api/v1/user/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/backend/api/v1/user/getInfo',
    method: 'GET'
  })
}

export function register(username: string, password: string, email: string) {
  return request({
    url: '/backend/api/v1/user/register',
    method: 'POST',
    data: {
      username,
      password,
      email
    }
  })
}
