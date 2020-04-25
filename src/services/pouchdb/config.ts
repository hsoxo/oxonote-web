import { store } from '@/store'

function select(state: any): PouchDB.Database {
  return state.get('global').browserDBConn
}

function getConn(): PouchDB.Database {
  return select(store.getState())
}

export default getConn