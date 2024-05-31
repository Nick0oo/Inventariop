import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDrLh0GW8q5wqBgr0ssZQiQaOKktvtRW9Y",
  authDomain: "inventario2-acc03.firebaseapp.com",
  projectId: "inventario2-acc03",
  storageBucket: "inventario2-acc03.appspot.com",
  messagingSenderId: "901830829609",
  appId: "1:901830829609:web:e7583d338a659dd048de38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db =getFirestore(app);
