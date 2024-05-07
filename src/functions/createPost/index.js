import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../../../services/firebaseConfig"
import { ToastAndroid } from "react-native"


const createPost = async (book, userName, postBody) => {
    const postRef = collection(db, 'posts')

    const post = {
        bookTitle: book.title,
        bookAuthor: book.author,
        bookImageUrl: book.imageurl,
        postedBy: userName,
        body: postBody,
        createdAt: serverTimestamp(),
    }

    try {
        await addDoc(postRef, post)
        ToastAndroid.show('Post criado com sucesso', ToastAndroid.SHORT)
    } catch (error) {
        ToastAndroid.show('Erro ao criar post', ToastAndroid.SHORT)
    }
}

export default createPost