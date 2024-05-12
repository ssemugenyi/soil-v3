// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCUNLWcVhvYvLRzcb6gbAESibrH74aDp5M",
  authDomain: "test-bdcc4.firebaseapp.com",
  databaseURL: "https://test-bdcc4-default-rtdb.firebaseio.com",
  projectId: "test-bdcc4",
  storageBucket: "test-bdcc4.appspot.com",
  messagingSenderId: "558295629302",
  appId: "1:558295629302:web:a78028284d9e4addce5bd7",
  measurementId: "G-S6NHNGJJQW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
