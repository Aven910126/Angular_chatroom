importScripts("https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyArKP5JvR3T8iG6pxnbHvQM56vTynDWYyQ",
  authDomain: "angularchatroom-8e896.firebaseapp.com",
  projectId: "angularchatroom-8e896",
  storageBucket: "angularchatroom-8e896.appspot.com",
  messagingSenderId: "947815882874",
  appId: "1:947815882874:web:5c171f27d010d69159dbc3",
  measurementId: "G-L9J46C00FE",
  vapidKey:"BD9ietsRpSIKdLasLMmcSfGN2GoTKgTMGqM9Vw3CkF31r3pzOWF62PKWD2YoEvPzmwT4GMbDaiD6Wn92ASUGBNo"
});
const messaging = firebase.messaging();
