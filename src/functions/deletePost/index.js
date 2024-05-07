import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../services/firebaseConfig";
import { ToastAndroid } from "react-native";

const deletePost = async (post) => {

    const postCollection = collection(db, 'posts')

    const q = query(postCollection,
        where('body', '==', post.body),
        where('postedBy', '==', post.postedBy),
        where('bookTitle', '==', post.bookTitle)
    )
    try {
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref)
            ToastAndroid.show('Post deletado com sucesso', ToastAndroid.SHORT)
        })
    } catch (error) {
        ToastAndroid.show('Erro ao deletar post', ToastAndroid.SHORT)
    }
    
    
}

export default deletePost;