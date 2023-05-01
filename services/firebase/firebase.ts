import { initializeApp } from "firebase/app";
const env = import.meta.env;
const firebaseConfig = {
  apiKey: env.PUBLIC_API_KEY,
  authDomain: env.PUBLIC_AUTH_DOMAIN,
  projectId: env.PUBLIC_PROJECT_ID,
  storageBucket: env.PUBLIC_STORAGE_BUCKET,
  messagingSenderId: env.PUBLIC_MESSAGING_SENDER_ID,
  appId: env.PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);

export default app;

