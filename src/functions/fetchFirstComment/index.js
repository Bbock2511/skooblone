import { collection, getDocs, limit, query, where } from "firebase/firestore"
import { db } from "../../../services/firebaseConfig"


const fetchFirstComments = async (book) => {
    if (!book || !book.title) {
        return [];
    }

    const commentRef = collection(db, 'avaliacoes')
    const q = query(commentRef, where('book_title', '==', book.title), limit(3))
    const querySnapshot = await getDocs(q)

    let comments = []
    querySnapshot.forEach((doc) => {
        comments.push(doc.data())
    })

    return comments
}

export default fetchFirstComments