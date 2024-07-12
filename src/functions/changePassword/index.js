import { sendPasswordResetEmail } from 'firebase/auth'
import { ToastAndroid } from 'react-native'

const changePassword = (auth, email) => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            ToastAndroid.show('Email enviado para ' + email, ToastAndroid.SHORT)
        })
        .catch((error) => {
            ToastAndroid.show(error.message, ToastAndroid.SHORT)
        })
}

export default changePassword
