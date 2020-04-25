export const RequestDefault = ''
export const RequestProcessing = 'processing'
export const RequestDone = 'done'
export const RequestError = 'error'

export type RequestStatus = typeof RequestDefault | typeof RequestProcessing | typeof RequestDone | typeof RequestError