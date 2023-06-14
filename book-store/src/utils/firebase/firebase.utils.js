
import { initializeApp } from "firebase/app";
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { getFirestore,
    doc,
    getDoc, 
    setDoc, 
    collection, 
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'


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
// Add collection and documents
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
 
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();
    console.log('done')
}
//Get Categories and documents
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
}
// Create user using user Auth
export const createUserDocumentFromAuth  = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)
    const userSnapshot = await getDoc(userDocRef);
    
    if (!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        // Set the user document using the doc reference and object of userAuth attributes
        try{
            await setDoc(userDocRef, 
                {
                    displayName, 
                    email, 
                    createdAt,
                    ...additionalInformation
                })
        }catch (error){
            console.log('Error creating user doc: ', error)
        }
    }
    return userDocRef
}

// Create user with email and password

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

// Sign Out
export const signOutUser = async () => await signOut(auth);

//
export const onAuthStateChangedListener = (callback) => 
{
    onAuthStateChanged(auth, callback);
}


