import request from '@/utils/request'

export function login(username: string, password: string) {
  return request({
    url: '/backend/api/v1/user/login',
    method: 'POST',
    data: {
      username,
      password,
    }
  })
}

export function getInfo() {
  return request({
    url: '/backend/api/v1/user/getInfo',
    method: 'GET',
  })
}