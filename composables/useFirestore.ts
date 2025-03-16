import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { getApp } from 'firebase/app'
import type { OrderByDirection, WhereFilterOp } from '@firebase/firestore-types'
import type {
  QueryConstraint,
} from 'firebase/firestore'
/*
export const getCollectionByAny = async (col: string, wheres: Array<[string, WhereFilterOp, any]>) => {
  const colRef = collection(firestoreDb(), col)
  const queries = wheres.map(params => where(...params))
  const q = query(colRef, ...queries)
  const snapshot = await getDocs(q)
  console.log(snapshot.docs)
  return snapshot.docs
} */

/* function constructWheres(filter: FilterModel) {
  const wheres = Object.entries(filter).reduce((acc, [key, value]) => {
    /*     if(key === 'FieldPath') {
      key = FieldPath.documentId()
    }

   if(value === null)
    return acc

    if(typeof value === 'boolean' && value !== undefined )
      acc.push([key, '==', value])
    else if (typeof value === 'string' && value !== '' )
      acc.push([key, '==', value])

    else if (Array.isArray(value) && value.length > 0)
      acc.push([key, 'in', value])

    else if (value !== undefined && value !== ''  && value.length > 0)
      acc.push([key, '==', value])

    return acc
  }
    , [] as Array<[string, WhereFilterOp, any]>)

  return wheres.map(params => where(...params))
} */

export const fsGet = async (col: string, id: string) => {
  const app = getApp()
  const docRef = doc(getFirestore(app), col, id)

  const docSnap = await getDoc(docRef)
  const response = { ...docSnap.data(), id: docSnap.id }
  return response
}
export const fsGetByField = async (col: string, field: string, value: string) => {
  const app = getApp()
  const colRef = collection(getFirestore(app), col)
  const q = query(colRef, where(field, '==', value))
  const snapshot = await getDocs(q)
  if (snapshot.docs.length === 0)
    return null

  const response = {
    ...snapshot.docs[0].data(),
    id: snapshot.docs[0].id,
  }
  return response
}

export const fsListCollection = async (col: string, filter: /* FilterModel | */ null = null, options: { orderBy: { field: string; direction: OrderByDirection }; limit?: number; extraFilters?: Array<[string, WhereFilterOp, any]> } | null = null) => {
  const app = getApp()
  const colRef = collection(getFirestore(app), col)
  let constraints = [] as QueryConstraint[]
  // if (filter)
    // constraints = constructWheres(filter)
  if (options?.extraFilters)
    constraints = constraints.concat(options.extraFilters.map(params => where(...params)))
  if (options?.orderBy)
    constraints.push(orderBy(options.orderBy.field, options.orderBy.direction))

  const q = query(colRef, ...constraints)
  const snapshot = await getDocs(q)
  const response = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  })
  return response
}
export const fsGetFirstOnCollection = async (col: string) => {
  const app = getApp()
  const colRef = collection(getFirestore(app), col)
  const q = query(colRef, limit(1))
  const snapshot = await getDocs(q)
  const response = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  })
  return response[0] as ObjectModel
}

export const fsAddDoc = async (col: string, data: ObjectModel) => {
  const app = getApp()
  const colRef = collection(getFirestore(app), col)
  const docRef = await addDoc(colRef, data)
  return docRef.id
}
export const fsDeleteDoc = async (col: string, id: string) => {
  const app = getApp()
  const docRef = doc(getFirestore(app), `${col}/${id}`)
  await deleteDoc(docRef)
}
export const fsSetDoc = async (col: string, id: string, data: ObjectModel) => {
  const app = getApp()
  const docRef = doc(getFirestore(app), `${col}/${id}`)
  const document = await setDoc(docRef, data, { merge: true })
  return document
}
