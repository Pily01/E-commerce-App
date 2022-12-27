
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq1OWNLqDvgFQ33tc-64vIcHHz8Zd0R4U",
  authDomain: "book-magic-store-db.firebaseapp.com",
  projectId: "book-magic-store-db",
  storageBucket: "book-magic-store-db.appspot.com",
  messagingSenderId: "566946461824",
  appId: "1:566946461824:web:7fdaa830f0a050f0178e65"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Create google authentication  provider object
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);