
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage, uploadBytes,ref,getDownloadURL} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    addDoc,
    deleteDoc
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

const storage =getStorage(app)







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





export async function getHostVans(idLoggedIn) {
    const q = query(vansCollectionRef, where("hostId", "==", idLoggedIn)) 
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
        const user = await getDocs(userQuery);
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

        //Returns the user ID
      return foundUser.id;

       
        
    } catch (error) {
        console.error("Error in loginUser:", error);
        throw error; // Rethrow the error for further handling
    }
}


export async function createUser(userData) {
    try {
        // Check if a user with the same email already exists
        const userQuery = query(usersCollectionRef, where("email", "==", userData.email));
        const userSnapshot = await getDocs(userQuery);
        const existingUsers = userSnapshot.docs.map((doc) => doc.data());

        if (existingUsers.length > 0) {
            throw new Error("A user with this email already exists!");
        }

        // If no user with the same email exists, add the new user
        const newUserRef = await addDoc(usersCollectionRef, userData);

         // Access the auto-generated ID for the new user document
         const newUserId = newUserRef.id;

         // Return the new user ID
         return newUserId;
       
    } catch (error) {
        console.error("Error in createUser:", error);
        throw error; // Rethrow the error for further handling
    }
}


export async function addVan( vanData) {
    try {
       
        await addDoc(vansCollectionRef, vanData);

       
    } catch (error) {
        console.error("Error adding van:", error);
        throw error; // Rethrow the error for further handling
    }
}




// Function to upload the selected image to a cloud storage service (Firebase Storage)


export async function uploadImage(selectedFile) {
    const imageRef = ref(storage, `images/${selectedFile.name}`);

    try {
        // Upload the image to storage
        await uploadBytes(imageRef, selectedFile);

        // Get the download URL for the uploaded image
        const downloadURL = await getDownloadURL(imageRef);

        
        return downloadURL
        
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}





export async function deleteVan(vanId) {


  try {
    // Create a reference to the van document using its ID
    const vanDocRef = doc(vansCollectionRef, vanId);

    // Delete the van document
    await deleteDoc(vanDocRef);

  } catch (error) {
    console.error("Error deleting van:", error);
    throw error; // Rethrow the error for further handling
  }
}


