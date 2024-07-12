import {
    collection,
    deleteDoc,
    getDocs,
    query,
    where,
} from 'firebase/firestore'
import { db } from '../../../services/firebaseConfig'
import { ToastAndroid } from 'react-native'

const deleteComment = async (comment) => {
    const commentCollection = collection(db, 'avaliacoes')

    const q = query(
        commentCollection,
        where('body', '==', comment.body),
        where('posted_by', '==', comment.posted_by),
        where('book_title', '==', comment.book_title),
        where('title', '==', comment.title),
        where('nota', '==', comment.nota)
    )

    try {
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref)
            ToastAndroid.show(
                'Comentário deletado com sucesso',
                ToastAndroid.SHORT
            )
        })
    } catch (error) {
        ToastAndroid.show('Erro ao deletar comentário', ToastAndroid.SHORT)
    }
}

export default deleteComment
