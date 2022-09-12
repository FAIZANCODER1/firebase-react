import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";


 const firebaseConfig = {
  apiKey: "AIzaSyB03zzWWb6ehi_PFO7ndQbHi6twmuuYfR8",
  authDomain: "rud-react.firebaseapp.com",
  projectId: "rud-react",
  storageBucket: "rud-react.appspot.com",
  messagingSenderId: "744316860814",
  appId: "1:744316860814:web:3586f01dd02990d5004cdf",
  measurementId: "G-9V60RVRD59"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}