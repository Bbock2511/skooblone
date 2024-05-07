import { collection, getDocs, limit, query, where } from "firebase/firestore"
import { db } from "../../../services/firebaseConfig"


const fetchBooks = async (search) => {

    const startAt = search
    const endAt = search + '\uf8ff'

    const q = query(collection(db, "books")
        ,where("title", ">=", startAt), where("title", "<=", endAt)
    )

    const querySnapshot = await getDocs(q, limit(2))
    const books = []
    querySnapshot.forEach((doc) => {
        books.push(doc.data())
    })
    
    return books;
}

export default fetchBooks;