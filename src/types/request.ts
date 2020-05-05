export const RequestDefault = 0
export const RequestProcessing = 10000
export const RequestDone = 20000
export const RequestError = 40000

export const RequestAuthFailed     = 40001

export const UsernameTaken = 40011
export const EmailTaken = 40012


export type RequestStatus = typeof RequestDefault | typeof RequestProcessing | typeof RequestDone | typeof RequestError |
  typeof RequestAuthFailed | typeof UsernameTaken | typeof EmailTaken

let _RequestErrorMsg = []
_RequestErrorMsg[RequestError] = '系统错误'
_RequestErrorMsg[RequestAuthFailed] = '用户权限错误'
_RequestErrorMsg[UsernameTaken] = '用户名已被使用'
_RequestErrorMsg[EmailTaken] = '邮箱已被使用'

export const RequestErrorMsg = _RequestErrorMsg