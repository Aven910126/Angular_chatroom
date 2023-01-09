importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
import {firebaseConfig} from "./firebase/firebaseUtil"
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
