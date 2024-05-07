import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../services/firebaseConfig";


const fetchAllNotes = async (book) => {

    if (!book || !book.title) {
        return [];
    }

    const q = query(collection(db, 'avaliacoes'), 
        where('book_title', '==', book.title)
    )

    const querySnapshot = await getDocs(q)

    let notes = []

    querySnapshot.forEach((doc) => {
        notes.push(doc.data().nota)
    })

    return notes;
}

export default fetchAllNotes;