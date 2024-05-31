import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";

const collectionName = "Inventario";
const pedidosCollectionName = "Pedidos";
const ventasCollectionName = "Ventas"; // Nueva colección para ventas

// Funciones para Inventario
export const saveWebsite = (newLink) =>
  addDoc(collection(db, collectionName), newLink);

export const updateWebsite = (id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields);

export const onGetLinks = (callback) => {
  const unsub = onSnapshot(collection(db, collectionName), callback);
  return unsub;
};

export const getWebsites = () => getDocs(collection(db, collectionName));

export const deleteWebsite = (id) => deleteDoc(doc(db, collectionName, id));

export const getWebsite = (id) => getDoc(doc(db, collectionName, id));

// Funciones para Pedidos
export const savePedido = (newPedido) =>
  addDoc(collection(db, pedidosCollectionName), newPedido);

export const updatePedido = (id, updatedFields) =>
  updateDoc(doc(db, pedidosCollectionName, id), updatedFields);

export const onGetPedidos = (callback) => {
  const unsub = onSnapshot(collection(db, pedidosCollectionName), callback);
  return unsub;
};

export const getPedidos = () => getDocs(collection(db, pedidosCollectionName));

export const deletePedido = (id) => deleteDoc(doc(db, pedidosCollectionName, id));

export const getPedido = (id) => getDoc(doc(db, pedidosCollectionName, id));

// Funciones para Ventas
export const saveVenta = (newVenta) =>
  addDoc(collection(db, ventasCollectionName), newVenta);

export const updateVenta = (id, updatedFields) =>
  updateDoc(doc(db, ventasCollectionName, id), updatedFields);

export const onGetVentas = (callback) => {
  const unsub = onSnapshot(collection(db, ventasCollectionName), callback);
  return unsub;
};

export const getVentas = () => getDocs(collection(db, ventasCollectionName));

export const deleteVenta = (id) => deleteDoc(doc(db, ventasCollectionName, id));

export const getVenta = (id) => getDoc(doc(db, ventasCollectionName, id));
