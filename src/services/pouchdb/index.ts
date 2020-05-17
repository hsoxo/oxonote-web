const journal = require('./Journal/index')
const note = require('./Note/index')

const PouchConn = {
  note,
  journal
}

export default PouchConn
