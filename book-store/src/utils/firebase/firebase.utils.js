
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


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
//Sign in with Google
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
//Sign in with Google Redirect
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

// Database
export const db = getFirestore();
// Create user using user Auth
export const createUserDocumentFromAuth  = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        // Set the user document using the doc reference and object of userAuth attributes
        try{
            await setDoc(userDocRef, {displayName, email, createdAt})
        }catch (error){
            console.log('Error: ', error)
        }
    }
    return userDocRef
}