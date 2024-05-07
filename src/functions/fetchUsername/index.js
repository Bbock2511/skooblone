import firebase from "firebase/compat/app"
import { auth, db } from "../../../services/firebaseConfig"
import { collection, doc, getDocs, query, where } from "firebase/firestore"

const fetchUsername = async () => {

    const q = query(collection(db, 'users'), where('email', '==', auth.currentUser.email))

    const querySnapshot = await getDocs(q)

    const userName = []
    querySnapshot.forEach((doc) => {
        userName.push(doc.data().userName)
    })

    return userName[0]
}

export default fetchUsername