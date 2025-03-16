import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import {
  getAuth,
} from 'firebase/auth'
import { getApp } from 'firebase/app'
export interface FirestoreTour {
  planId: string
  id?: string
  name?: string
  version: number
  tourItems: NewGuideStep[]
}
export interface TourStoreState {
  tour: FirestoreTour | null
  loading: boolean
  isFirstTime: boolean
}

export const useTourStore = defineStore('tour', {
  state: (): TourStoreState => ({
    tour: null,
    loading: false,
    isFirstTime: true,
  }),
  getters: {
    activeTour(state) {
      // TODO: Add this to tour handler to remove some code
      return state.tour?.tourItems.find(tour => !tour.skipped)
    },
  },
  actions: {
    nextTour() {
      if (!this.tour)
        return
      const activeTour = this.activeTour
      if (!activeTour)
        return
      const index = this.tour.tourItems.indexOf(activeTour)
      if (index === this.tour.tourItems.length - 1)
        return
      this.tour.tourItems[index].skipped = true
    },
    skipTour() {
      if (!this.tour)
        return
      this.tour.tourItems = this.tour.tourItems.map((tour) => {
        tour.skipped = true
        return tour
      })
      this.tour = { ...this.tour }
    },
    async storeTour(tour: FirestoreTour) {
      const auth = getAuth()
      const app = getApp()
      this.loading = true
      const version = (tour.version ?? 0) + 1
      try {
        console.log(tour)
        if (!tour.id) {
          delete tour.id
          const colRef = collection(getFirestore(app), 'tours')
          const docRef = await addDoc(colRef, { ...tour, version })
         /*  const notification = useNotification()
          notification.value = {
            type: 'success',
            title: 'Success!',
            message: 'The tour was saved.',
          } */
          return docRef
        }
        else {
          const docRef = doc(getFirestore(app), 'tours', tour.id)
          const result = await updateDoc(docRef, { ...tour, version })
        /*   const notification = useNotification()
          notification.value = {
            type: 'success',
            title: 'Success!',
            message: 'The tour was updated.',
          } */
          return result
        }
      }
      catch (e: any) {
        console.log(e)
      }
      finally {
        this.loading = false
      }
    },
    async deleteTour(id: string | null) {
      if (!id)
        return
      const colRef = collection(getFirestore(getApp()), 'tours')
      try {
        const status = await deleteDoc(doc(colRef, id))
        console.log(status)
        this.tour = null
   /*      const notification = useNotification()
        notification.value = {
          type: 'success',
          title: 'Success!',
          message: 'The tour was deleted.',
        } */
      }
      catch (e: any) {
        console.log(e)
      }
    },
    async storeTemplate(tour: FirestoreTour) {
      const tempTour = { ...tour }
      delete tempTour.id
      tempTour.planId = ''
      tempTour.tourItems = tempTour.tourItems.map((tourItem) => {
        return { ...tourItem, view: { type: 'any' }, optionIds: [], selectedOptionId: '', finalizeFields: [], skipped: false }
      })
      this.loading = true
      const colRef = collection(getFirestore(getApp()), 'tourTemplates')
      try {
        const docRef = await addDoc(colRef, tempTour)
      /*   const notification = useNotification()
        notification.value = {
          type: 'success',
          title: 'Success!',
          message: 'The template was saved.',
        } */
        return docRef
      }
      catch (e: any) {
        console.log(e)
      }
      finally {
        this.loading = false
      }
    },
    async deleteTemplate(id: string | null) {
      if (!id)
        return
      const colRef = collection(getFirestore(getApp()), 'tourTemplates')
      try {
        await deleteDoc(doc(colRef, id))
        /* const notification = useNotification()
        notification.value = {
          type: 'success',
          title: 'Success!',
          message: 'The template was deleted.',
        } */
      }
      catch (e: any) {
        console.log(e)
      }
    },
    async fetchTemplates() {
      const auth = getAuth()
      const app = getApp()
      this.loading = true
      try {
        const colRef = collection(getFirestore(app), 'tourTemplates')
        const querySnapshot = await getDocs(colRef)
        const templates = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id }
        }) as FirestoreTour[]
        return templates
      }
      catch (error: any) {
        console.log(error)
      }
      finally {
        this.loading = false
      }
    },
    async fetchTour(planId: string) {
      const auth = getAuth()
      const app = getApp()
      this.loading = true
      try {
        const colRef = collection(getFirestore(app), 'tours')
        const q = query(colRef, where('planId', '==', planId))
        const querySnapshot = await getDocs(q)
        const tour = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id }
        })[0] as FirestoreTour | null
        console.log(tour)
        if (!tour) {
          this.tour = null
        }
        else {
          if (this.tour?.version !== tour.version || this.tour?.planId !== planId)
            this.tour = tour
        }
        return tour
      }
      catch (error: any) {
        console.log(error)
      }
      finally {
        this.loading = false
      }
    },
  },

  persist: {
    storage: persistedState.localStorage,
  },

})
