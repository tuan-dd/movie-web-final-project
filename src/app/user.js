// import localforage from 'localforage';

// function set(dataUser) {
//    return localforage.setItem('dataUser', dataUser);
// }
// export async function getDataUser(query) {
//    await fakeNetwork(query);
//    let dataUser = await localforage.getItem('user');
//    if (!dataUser) return false;
//    return dataUser;
// }

// export async function createDataUser(data) {
//    await fakeNetwork(query);
//    let dataUser = await localforage.getItem('user');
//    let newDataUser = {
//       ...data,
//       id: Math.random().toString(36).substring(2, 9),
//       createAt: Date.now,
//    };
//    dataUser.unShift(newDataUser);
//    await set(dataUser);
//    return dataUser;
// }

// export async function createListOfUser(dataList) {
//    await fakeNetwork(query);
//    let dataUser = await localforage.getItem('user');
//    Object.assign(dataUser, dataList);
//    await set(dataUser);
//    return dataUser;
// }

// export async function deleteUser() {
//    await localforage.removeItem('user');
//    return true;
// }

// let fakeCache = {};

// async function fakeNetwork(key) {
//    if (!key) {
//       fakeCache = {};
//    }

//    if (fakeCache[key]) {
//       return;
//    }

//    fakeCache[key] = true;
//    return new Promise((res) => {
//       setTimeout(res, Math.random() * 800);
//    });
// }

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
const firebaseApp = initializeApp({
   apiKey: "AIzaSyCAqXO2pzpoUIbiMyJi_kzHdqaLZbIXhgs",
  authDomain: "web-flim-fe.firebaseapp.com",
  databaseURL: "https://web-flim-fe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-flim-fe",
  storageBucket: "web-flim-fe.appspot.com",
  messagingSenderId: "533318496628",
  appId: "1:533318496628:web:9a3ab74437e3932857fc21",
  measurementId: "G-KWB6R2ZDJ5"
});
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
