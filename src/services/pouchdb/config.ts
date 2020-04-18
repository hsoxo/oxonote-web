import PouchDB from 'pouchdb-browser'
PouchDB.plugin(require('pouchdb-find').default)


export const dbNote = new PouchDB('@oxo/Noxo')
export const dbJournal = new PouchDB('@oxo/journal')

const PDB = new PouchDB('@noxo')

export default PDB