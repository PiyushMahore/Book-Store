import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, GithubAuthProvider, signOut } from "firebase/auth"
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const firebaseContext = createContext()

const firebaseConfig = {
    apiKey: "AIzaSyB0UKRfYFXwNs0I4KfwlrmikSXQYZ6qfuQ",
    authDomain: "library-61cb8.firebaseapp.com",
    projectId: "library-61cb8",
    storageBucket: "library-61cb8.appspot.com",
    messagingSenderId: "859963872750",
    appId: "1:859963872750:web:17262d6c4eb07ff46faaff"
  }

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider(app)
const Gitprovider = new GithubAuthProvider(app)
const db = getFirestore(app)
const storage = getStorage(app)

export const useFirebase = () => useContext(firebaseContext)

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null)
    const [owner, setOwner] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
          })
    }, [onAuthStateChanged])

    const isLogedIn = user ? true : false

    const SignUp = (email, password) => createUserWithEmailAndPassword(auth, email, password)

    const Login = (email, password) => signInWithEmailAndPassword(auth, email, password)

    const SignWithGoogle = () => signInWithPopup(auth, provider)

    const GitSignIn = () => signInWithPopup(auth, Gitprovider)

    const SignOut = () => signOut(auth)

    const addNewListing = async(name, isbn, price, cover, author, desc) => {
        const storages = ref(storage, `uploads/images/${Date.now()}-${cover}`)
        const uploadFile = await uploadBytes(storages, cover)
        return await addDoc(collection(db, "Books"), {
            name,
            isbn,
            price,
            author,
            desc,
            imageUrl: uploadFile.ref.fullPath,
            userId: user.uid,
            userEmail: user.email,
            displayName: user.displayName
        }).then(window.alert('Added SuccessFully'))
    }
    
    const getBooks = (callback) => {
        const q = query(collection(db, "Books"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const booksArray = []
            querySnapshot.forEach((doc) => {
                booksArray.push(doc)
            })
            callback(booksArray)
        })
    }

    const downloadImg = (Url) => getDownloadURL(ref(storage, Url))

    const getDocument = async(Id) => {
        const docRef = doc(db, 'Books', Id)
        const docSnap = await getDoc(docRef)
        return docSnap
    }

    const placeOrder = async (id, Product, qty) => {
        return await addDoc(collection(db, `Books/${id}/orders`), {
            NameOfProduct: Product,
            Quantity: Number(qty),
            userId: user.uid,
            userEmail: user.email,
            OrderdBy: user.displayName,
            orderStatus: "Pending"
          })
    }

    const fetchBook = async(UserId) => {
        const q = query(collection(db, 'Books'), where('userId', '==', UserId))
        const result = await getDocs(q)
        return result
    }

    const getOrderDetail = async(Id) => {
        const docRef = collection(db, "Books", Id, 'orders')
        const result = await getDocs(docRef)
        return result
    }

    const UpdateOrderStatus = async(bookId, id, response) => {
        const StatusRef = doc(db, 'Books', bookId, 'orders', id)
        const result = await updateDoc(StatusRef, {
            orderStatus: response
        })
        return result
    }

    useEffect(() => {
        if (user) {
            if(user.email === "piyushmahore41@gmail.com") {
                setOwner(true)
            }else{
                setOwner(false)
            }
        }
    }, [user, onAuthStateChanged])

    const usersOrderPage = async(bookname, writer, img, price, pageId) => {
        const docRef = await addDoc(collection(db, "Orders"), {
            BookName: bookname,
            Writer: writer,
            ImgUrl: img,
            Price: price,
            UserEmail: user.email,
            UserId: user.uid,
            pageId
          })
          return docRef
    }

    const getUserOrders = async() => {
        const q = query(collection(db, "Orders"), where("UserEmail", '==', user.email))
        const data = await getDocs(q)
        return data
    }

    const DeleteBook = async(id) => {
        await deleteDoc(doc(db, "Books", id))
    }

    const DeleteOrder = async(id) => {
        await deleteDoc(doc(db, "Orders", id))
    }

    return (
        <firebaseContext.Provider value={{SignUp, Login, SignWithGoogle, GitSignIn, SignOut, addNewListing, getBooks, downloadImg, getDocument, placeOrder, fetchBook, getOrderDetail, UpdateOrderStatus, DeleteBook, usersOrderPage, getUserOrders, DeleteOrder, isLogedIn, user, owner }}>
            {props.children}
        </firebaseContext.Provider>
    )
}
