import { initializeApp } from "firebase/app";

require('dotenv');

const API_KEY = process.env.FIREBASE_API
const AUTH_DOMAIN = process.env.AUTH_DOMAIN
const PROJECT_ID = process.env.PROJECT_ID
const STORAGE_BUCKET = process.env.STORAGE_BUCKET
const MESSAGINGSENDERID = process.env.MESSAGINGSENDERID
const APPID = process.env.APPID

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);