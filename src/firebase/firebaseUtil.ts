// import dotenv from 'dotenv';
//
// dotenv.config();


import firebase from "firebase/compat";
import {FirebaseApp} from "@angular/fire/app";

export const firebaseConfig = {
  apiKey: process.env["APIKEY"],
  authDomain: process.env["AUTH_DOMAIN"],
  projectId: process.env["PROJECT_ID"],
  storageBucket: process.env["STORAGE_BUCKET"],
  messagingSenderId: process.env["MESSAGING_SENDER_ID"],
  appId: process.env["APP_ID"],
  measurementId: process.env["MEASUREMENT_ID"],
  vapidKey:process.env["VAPID_KEY"],
};

