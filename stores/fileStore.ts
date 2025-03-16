import { deleteObject, getBlob, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
interface FileMap {
  [key: string]: File
}

export interface FileStoreState {
  files: FileMap
  loading: boolean
}

export const useFileStore = defineStore('file', {
  state: (): FileStoreState => ({
    files: {},
    loading: false,
  }),
  actions: {
    async fetchFile(path: string | undefined | null) {
      if (!path)
        return
      path = encodeURIComponent(path)
      const headers = new Headers()
      const runtimeConfig = useRuntimeConfig()

      const data = await $fetch<string>(`${runtimeConfig.public.backEndUrl}/firebase.clientFile.get.php`, {
        method: 'GET',
        headers,
        params: {
          path,
        },
      })
      return data
    },
    async fetchFirebaseFile(src: string) {
      const storage = getStorage()
      const storageRef = ref(storage, src)
      const blob = await getBlob(storageRef)
      const file = new File([blob], getFileNameFromSrc(src) || "file", {
        type: blob.type,
      });

      return file;
    },
    async fetchFirebaseFileAsText(src: string) {
      const storage = getStorage()
      const storageRef = ref(storage, src)
      const blob = await getBlob(storageRef)
      return await blob.text()
    },

    async uploadElementToPdf(element: HTMLElement, name: string) {
   /*    // Generate the PDF
      const pdfFile = await generatePDFFile(element, name)
      if (!pdfFile)
        return

      // Get a reference to the Firebase storage bucket
      const storage = getStorage()

      // Create a storage reference
      const storageRef = ref(storage, `pricing/${pdfFile.name}`)

      // Upload the PDF file to Firestore
      await uploadBytes(storageRef, pdfFile)
      const downloadURL = await getDownloadURL(storageRef)
      return downloadURL
      // Return the download URL of the uploaded PDF file */
    },
    async uploadFile(file: File, path: string) {
      this.loading = true
      // Get a reference to the Firebase storage bucket
      const storage = getStorage()

      // Create a storage reference
      const fileName = encodeURIComponent(file.name)
      const storageRef = ref(storage, `${path}/${fileName}`)
      try {
        // Upload the file to Firestore
        await uploadBytes(storageRef, file)
        const downloadURL = await getDownloadURL(storageRef)
        return downloadURL
        // Return the download URL of the uploaded file
      }
      catch (e: any) {
        console.log(e)
        return null
      }
      finally {
        this.loading = false
      }
    },
    async deleteFile(src: string) {
      if (!src.includes('firebase'))
        return
      this.loading = true
      const storage = getStorage()
      const storageRef = ref(storage, src)
      try {
        await deleteObject(storageRef)
      }
      catch (e: any) {
        if (e.code === 'storage/object-not-found')
          return
        console.log(e)
      }
      finally {
        this.loading = false
      }
    },
  },
})
