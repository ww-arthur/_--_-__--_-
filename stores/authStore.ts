import type { User, UserCredential } from 'firebase/auth'
import { FirebaseError } from '@firebase/app'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'

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
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStoreState => ({
    credentials: null,
    user: null,
    role: '',
    accessToken: null,
    uid: null,
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
    hasRole(role: Roles | undefined) {
      // Hiearchy of roles
      // 1. superadmin
    // 2. admin
    // 3. clientadmin
    // 4. client
    // 5. ""
 /*      const isI3 = useI3().value
      if (isI3) {
        if (role !== 'client' && role)
          return true
        else
          return false
      } */

      if (this.role === role || !role)
        return true

      if (!this.role)
        return false

      const roles = {
        superadmin: 4,
        admin: 3,
        clientadmin: 2,
        client: 1,
        designerAdmin: 0,
      }
      if (roles[this.role] >= roles[role])
        return true
      else
        return false
    },
    async createUserV2(email: string, password: string) {
      /* const auth = getAuth()
      const userStore = useUserStore()
      try {
        const user = await userStore.getUserByEmail(email)
        if (!user)
          return null

        const credentials = await createUserWithEmailAndPassword(auth, email, password)
        return credentials.user.uid
      }
      catch (error) {
        console.log(error)
      } */
    },
    async createUser(email: string, password: string) {
      const auth = getAuth()
      try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password)
        this.credentials = credentials
        this.user = credentials.user
        this.accessToken = this.user.accessToken ?? null
        await this.fetchUser(email, password)
        return credentials
      }
      catch (error) {
        if (error instanceof FirebaseError) {
          if (error.code === 'auth/email-already-in-use')
            this.login(email, password)
        }
      }
    },
    async login(email: string, password: string) {
      await new Promise((resolve, reject) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password).then(async (credentials) => {
          this.credentials = credentials
          this.user = credentials.user
          this.uid = credentials.user.uid
          const idToken = await credentials.user?.getIdToken(true)
          this.accessToken = idToken ?? null
          await this.fetchUser(email, password)
   /*        const notification = useNotification()
          notification.value = {
            type: 'success',
            title: 'Success!',
            message: `Logged in as ${this.user?.displayName}` ?? '',
          } */

          resolve(credentials)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    async refreshUserToken() {
      const auth = getAuth()
    },
    async updateUser(data: { displayName?: string; photoURL?: string }) {
      const auth = getAuth()
      const user = auth.currentUser
      if (user) {
        await updateProfile(user, data)
        this.user = user
      }
    },

    async initUser() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        this.user = auth.currentUser
        this.uid = this.user?.uid ?? null
        auth.currentUser?.getIdToken(true)
          .then((idToken) => {
            this.accessToken = idToken
            this.setRole()
            this.setName()
          })
      })
    },
    async setRole() {
      const auth = getAuth()
      const user = auth.currentUser
      if (user) {
        const token = await user.getIdTokenResult()
        const role = (token.claims.role ?? '') as Roles
        this.role = role
        return role
      }
      else {
        this.role = ''
        return ''
      }
    },
    async setName() {
      const auth = getAuth()
      const user = auth.currentUser
      if (user) {
        const token = await user.getIdTokenResult()
        const name = token.claims.name as string
        if (this.user && !this.user.displayName && name)
          this.user.displayName = name
      }
    },

    async signOut() {
      const auth = getAuth()
      await auth.signOut()
      this.user = null
      this.credentials = null
      this.role = ''
    },

    async loginWithGoogle() {
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      const result = await signInWithPopup(auth, provider)
      return result
    },
    async fetchUser(email: string, password: string) {
      const headers = new Headers()
      headers.append('Authorization', `Bearer ${this.accessToken?.trim()}`)
      try {
        const runtimeConfig = useRuntimeConfig()

        const result = await $fetch<string>(`${runtimeConfig.public.backEndUrl}/firebase.login.php`, {
          method: 'POST',
          headers,
          body: {
            email,
            password,
          },
        })
        const data = JSON.parse(result)
        if (data.refreshed) {
          const auth = getAuth()
          const idToken = await auth.currentUser?.getIdToken(true)
          this.accessToken = idToken ?? null
          this.setRole()
          this.setName()
        }
 /*        if (data.notification) {
          const serverNot = data.notification as NotificationRaw
          const notification = useNotification()
          notification.value = serverNot
        } */
        return data
      }
      catch (error) {
        console.log(error)
      }
    },
    async loginCheck(email: string, password: string) {
      const headers = new Headers()
      headers.append('Authorization', `Bearer ${this.accessToken?.trim()}`)
      try {
        const runtimeConfig = useRuntimeConfig()

        const result = await $fetch<string>(`${runtimeConfig.public.backEndUrl}/firebase.loginCheck.php`, {
          method: 'POST',
          headers,
          body: {
            email,
            password,
          },
        })
        const data = JSON.parse(result) as { valid: boolean; user: {} }

        return data
      }
      catch (error) {
        console.log(error)
      }
    },
  },
  persist: true,

})
