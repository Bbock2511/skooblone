import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../services/firebaseConfig'
import { ToastAndroid } from 'react-native'

const postComment = async (book, rate, title, body, user) => {
    const commentRef = collection(db, 'avaliacoes')

    const comment = {
        book_title: book.title,
        nota: rate,
        title: title,
        body: body,
        posted_by: user,
    }
    try {
        await addDoc(commentRef, comment)
        ToastAndroid.show('Comentário criado com sucesso', ToastAndroid.SHORT)
    } catch (error) {
        ToastAndroid.show(
            'Erro ao criar comentário' + error,
            ToastAndroid.SHORT
        )
    }
}

export default postComment
