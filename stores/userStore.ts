import {
  doc,
  getDoc,
  getFirestore,
} from 'firebase/firestore'
import { getApp } from 'firebase/app'

export interface UserStoreState {
  user: FsUser | null
  currentUser: FsUser | null
  users: FsUser[]
  cachedUsers: FsUser[]
  loading: boolean
}
export interface FsUser {
  id?: string
  email: string
  displayName: string
  jobTitle: string
  active: boolean
  fullName: string
  color: string
  avatar: string
  favoritePlans?: string[]
  adminDesignerId?: string
  builderId?: string
  private?: {
    builderIds: string[]
    communityIds: string[]
    role: Roles
  } | null
}
export interface FsUserWithPassword extends FsUser {
  oldPassword?: string
  password?: string
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    user: null,
    currentUser: null,
    users: [],
    cachedUsers: [],
    loading: false,
  }),
  actions: {
    async fetchCurrentUser() {
      this.loading = true
      try {
    /*     const authStore = useAuthStore()
        const userId = authStore.userId

        /*  if (userId) {
           const notificationStore = useNotificationStore()
           await notificationStore.listUserNotifications(userId)
         }

        if (!userId || this.currentUser)
          return this.currentUser

        const app = getApp()
        const colRef = doc(getFirestore(app), `users/${userId}`)
        const querySnapshot = await getDoc(colRef)

        const permissionsColRef = doc(getFirestore(app), `users/${userId}/private/permissions`)
        const privateSnapshot = await getDoc(permissionsColRef)

        if (privateSnapshot.exists()) {
          const privateObj = privateSnapshot.data() as FsUser['private']
          this.currentUser = { ...querySnapshot.data(), id: querySnapshot.id, private: privateObj } as FsUser
          return this.currentUser
        }

        this.currentUser = { ...querySnapshot.data(), id: querySnapshot.id } as FsUser
 */
        return this.currentUser
      }
      catch (error: any) {
        console.log(error)
      }
      finally {
        this.loading = false
      }
    },
    async getUser(id: string) {
      this.loading = true
      try {
        const user = await fsGet('users', id) as FsUser
        const permissionsColRef = doc(getFirestore(), `users/${id}/private/permissions`)
        const privateSnapshot = await getDoc(permissionsColRef)
        if (privateSnapshot.exists()) {
          const privateObj = privateSnapshot.data() as FsUser['private']
          return { ...user, private: privateObj } as FsUser
        }
        return user
      }
      catch (error: any) {
        console.log(error)
      }
      finally {
        this.loading = false
      }
    },
    async getUserByEmail(email: string) {
      return await fsGetByField('users', 'email', email) as FsUser | null
    },
    async getAndCacheUser(id: string) {
      const cachedUser = this.cachedUsers.find(u => u.id === id)
      if (cachedUser)
        return cachedUser

      const user = await fsGet('users', id) as FsUser
      this.cachedUsers.push(user)
      return user
    },

    async updateUser(user: FsUser, avatar?: File | null) {
      this.loading = true
      try {
        const tmpUser = { ...user }
        delete tmpUser.private
        const userId = user.id as string
        delete tmpUser.id
        console.log(tmpUser)

        await fsSetDoc('users', userId, tmpUser)
        if (user.private)
          await fsSetDoc(`users/${user.id}/private`, 'permissions', user.private)

/*         if (avatar) {
          const fileStore = useFileStore()
          const avatarUrl = await fileStore.uploadFile(avatar, `users/${userId}`)
          if (user.avatar)
            await fileStore.deleteFile(user.avatar)

          await fsSetDoc('users', userId, { avatar: avatarUrl })
        } */



        /*     const notification = useNotification()
            notification.value = hcNotificationMap['user-updated'] */
        this.user = user
        return this.user
      }
      catch (error: any) {
        /*         const notification = useNotification()
                notification.value = hcNotificationMap['user-updated-failed'] */
      }
      finally {
        this.loading = false
      }
    },
    async markFavoritePlan(planId?: string) {
      if (!planId)
        return
      this.loading = true
      try {
        const user = this.currentUser
        if (!user)
          return
        if (!user.favoritePlans)
          user.favoritePlans = []

        if (!user.favoritePlans.includes(planId))
          user.favoritePlans.push(planId)
        else
          user.favoritePlans = user.favoritePlans.filter(id => id !== planId)

        await this.updateUser(user)
      }
      catch (error: any) {
        console.log(error)
      }
      finally {
        this.loading = false
      }
    },

    async storeUser(user: Partial<FsUser>) {
      this.loading = true
      /*     const authStore = useAuthStore()
     */
      /*    if (!hasEnoughPermission(authStore.role, 'admin') || !user.email)
           return */
      try {
        if (!user.email)
          return
        const userExists = await this.getUserByEmail(user.email)
        if (userExists) {
          /*      const notification = useNotification()
               notification.value = {
                 title: 'User already exists',
                 message: 'This email is already in use by another user.',
                 type: 'error',
               } */
          return
        }

        const privateData = { ...user.private }
        delete user.private
        delete user.id

        const id = await fsAddDoc('users', user)
        if (privateData)
          await fsSetDoc(`users/${id}/private`, 'permissions', privateData)

        return id
      }
      catch (error: any) {
        console.log(error)
      }
      finally {
        this.loading = false
      }
    },
    // deletes the user from the table, and moves it to the 'archive' collection on the 'users' subcollection
    async archiveUser(user: FsUser) {
      this.loading = true


      try {
        // await fsDeleteDoc('users', user.id)
        await fsAddDoc('archive/data/users', user)
      }
      catch (error: any) {
        console.log(error)
      }
      finally {
        this.loading = false
      }
    },

    async listUsers(filter: /* FilterModel | */ null = null) {

      this.loading = true
      try {
        /*     const defaultFilters: FilterModel = {
              builderId: this.currentUser?.builderId ?? (authStore.isInternalAdmin ? null : '**'),
            } */
        this.users = await fsListCollection('users', filter, { orderBy: { field: 'displayName', direction: 'asc' } }) as FsUser[]
        return this.users
      }
      catch (error: any) {
        console.log(error)
      }
      finally {
        this.loading = false
      }
    },
    async listArchivedUsers() {
      this.loading = true
      try {
        this.users = await fsListCollection('archive/data/users') as FsUser[]
        return this.users
      }
      catch (error: any) {
        console.log(error)
      }
      finally {
        this.loading = false
      }
    }
  },
})
