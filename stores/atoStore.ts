import type { User, UserCredential } from 'firebase/auth'
/* import { FirebaseError } from '@firebase/app'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
 */
interface FirebaseUser extends User {
  displayName: string | null
  email: string | null
  accessToken?: string
}
export interface AuthStoreState {
  credentials: UserCredential | null
  user: FirebaseUser | null
  role: Roles
  accessToken: string | null
  uid: string | null
  score: string | number
  atoAtual: string
  atosLidos: string[]
}

export const useAtoStore = defineStore('ato', {
  state: (): AuthStoreState => ({
    credentials: null,
    user: null,
    role: '',
    accessToken: null,
    uid: null,
    score: 0,
    atoAtual: 'Ato-23',
    atosLidos: ['']


  }),
  getters: {
    isAdmin(state) {

      return state.role.includes('admin')
    },
    isInternalAdmin(state) {
      return state.role === 'admin' || state.role === 'superadmin'
    },
  },
  actions: {
    abrirAto(ato: string) {
      this.atoAtual = ato
      if (!this.atosLidos.includes(ato))
        this.atosLidos.push(ato)

    }

  },
  persist: true,

})
