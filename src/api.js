
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where
} from "firebase/firestore/lite"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwGsLYHZoa-WSjl1w378XARFMBWVskx58",
  authDomain: "vanlife-c479e.firebaseapp.com",
  projectId: "vanlife-c479e",
  storageBucket: "vanlife-c479e.appspot.com",
  messagingSenderId: "591242321551",
  appId: "1:591242321551:web:ba72feb5f6ff2571011afa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)


try {
    const querySnapshot = await getDocs(collection(db, 'vans'));
    // Process the query results here
  } catch (error) {
    console.error('Error querying Firestore:', error);
  }




const vansCollectionRef = collection(db, "vans")
const usersCollectionRef = collection(db, "user");




export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}


export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}





export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123")) /// this is hardcoded for  the user 123 and not the one who logs in 
    const snapshot = await getDocs(q)
    
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}




export async function loginUser(creds) {
    try {
        const userQuery = query(usersCollectionRef, where("email", "==", creds.email));
        const userSnapshot = await getDocs(userQuery);
        const users = userSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));

        if (users.length === 0) {
            throw new Error("No user with this email found!");
        }

        const foundUser = users[0];

        // Here, you can compare the provided password with the stored password
        if (foundUser.password !== creds.password) {
            throw new Error("Try again your password!");
        }

      

        // If authentication is successful, you can return user data and a token as needed
        // For example, return the user's data and a dummy token
        return {
            user: foundUser,
            token: "Your authentication token here",
        };
    } catch (error) {
        console.error("Error in loginUser:", error);
        throw error; // Rethrow the error for further handling
    }
}