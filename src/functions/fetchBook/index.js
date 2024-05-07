import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../../services/firebaseConfig"


const fetchBook = async (postBook) => {
    const q = query(collection(db, "books")
        ,where("title", "==", postBook)
    )

    const querySnapshot = await getDocs(q)
    
    let book = {}
    querySnapshot.forEach((doc) => {
        book = doc.data()
    })

    return book
}

export default fetchBook;