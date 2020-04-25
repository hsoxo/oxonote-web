const primaryDao = require('./dao/primary')
export const { create, update, readOne, readAll } = primaryDao
export const attr = require('./dao/attribute')
export const view = require('./dao/view')
