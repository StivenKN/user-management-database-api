import { type publicKey } from './publicKey.interface.js'

interface dbNameSpace {
  dbNameSpace: string
  DBPayload: string
}

export interface user extends dbNameSpace, publicKey {
  userEmail: string
  userPassword: string
  userRole: number
}
