import {
    ActivityIndicator,
    Alert,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'
import app, { db } from '../../../services/firebaseConfig'
import { useState } from 'react'
import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { getStorage, ref, uploadBytes } from 'firebase/storage'

const storage = getStorage(app)

const FormBook = ({ setModalVisible, setRequest }) => {
    const [bookLoading, setBookLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [imageUploaded, setImageUploaded] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [pages, setPages] = useState()
    const [resume, setResume] = useState('')

    const verifyBook = async (db, title) => {
        const bookRef = query(
            collection(db, 'books'),
            where('title', '==', title)
        )
        const snapshot = await getDocs(bookRef)

        if (snapshot.empty) {
            return false
        } else {
            return true
        }
    }

    const addBookDatabase = async (
        db,
        title,
        author,
        pages,
        resume,
        imageUrl
    ) => {
        const bookExists = await verifyBook(
            db,
            title.charAt(0).toUpperCase() + title.slice(1)
        )

        if (bookExists) {
            Alert.alert(
                'Livro já cadastrado',
                'Esse livro já está cadastrado no sistema'
            )
        } else {
            const bookRef = doc(
                db,
                'books',
                title.charAt(0).toUpperCase() + title.slice(1)
            )

            try {
                await setDoc(bookRef, {
                    title: title.charAt(0).toUpperCase() + title.slice(1),
                    author: author.charAt(0).toUpperCase() + author.slice(1),
                    pages: pages,
                    imageurl: imageUrl,
                    resume: resume.charAt(0).toUpperCase() + resume.slice(1),
                })
            } catch (error) {
                console.error('Error adding document: ', error)
            }
        }
    }

    const onSubmit = async () => {
        setBookLoading(true)
        await addBookDatabase(db, title, author, pages, resume, imageUrl)
        setBookLoading(false)
        setRequest(true)
        setModalVisible(false)
    }

    const openLibrary = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [4, 3],
                quality: 1,
            })

            if (!result.canceled) {
                setImage(result.assets[0].uri)
                uploadImage(result.assets[0].uri)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const uploadImage = async (image) => {
        try {
            const { uri } = await FileSystem.getInfoAsync(image)
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.onload = () => {
                    resolve(xhr.response)
                }
                xhr.onerror = (e) => {
                    console.log(e)
                    reject(new TypeError('Network request failed'))
                }

                xhr.responseType = 'blob'
                xhr.open('GET', uri, true)
                xhr.send(null)
            })

            const filename = image.substring(image.lastIndexOf('/') + 1)
            const storageRef = ref(storage, filename)

            uploadBytes(storageRef, blob).then((snapshot) => {
                console.log(
                    `https://firebasestorage.googleapis.com/v0/b/lendo-no-vagao-cd6e5.appspot.com/o/${snapshot.ref.fullPath}?alt=media`
                )
                setImageUrl(
                    `https://firebasestorage.googleapis.com/v0/b/lendo-no-vagao-cd6e5.appspot.com/o/${snapshot.ref.fullPath}?alt=media`
                )
                setImageUploaded(true)
            })
            // await ref.put(blob)
            // setImage(null)
        } catch (error) {
            console.error(error)
            setImage(null)
        }
    }

    const isFormValid = title && author && pages && resume && imageUploaded

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Título"
                onChangeText={(text) => setTitle(text)}
                value={title}
            />

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <TextInput
                    style={[styles.input, { width: '42.5%' }]}
                    placeholder="Autor"
                    onChangeText={(text) => setAuthor(text)}
                    value={author}
                />
                <TextInput
                    style={[styles.input, { width: '42.5%' }]}
                    placeholder="Páginas"
                    onChangeText={(text) => setPages(text)}
                    value={pages}
                    inputMode="numeric"
                />
            </View>

            <TextInput
                style={styles.input}
                placeholder="Resumo"
                multiline
                onChangeText={(text) => setResume(text)}
                value={resume}
            />

            <TouchableOpacity
                style={styles.input}
                onPress={() => openLibrary()}
            >
                <Text
                    style={{
                        color: 'tomato',
                        alignSelf: 'center',
                        marginTop: 5,
                    }}
                >
                    {imageUploaded ? image.substring(127) : 'Adicionar Imagem'}
                </Text>
            </TouchableOpacity>

            {bookLoading ? (
                <View style={styles.loadingComponent}>
                    <ActivityIndicator size={'small'} color={'tomato'} />
                </View>
            ) : (
                <TouchableOpacity
                    style={
                        isFormValid
                            ? styles.submitButton
                            : styles.disabledButton
                    }
                    onPress={onSubmit}
                    disabled={!isFormValid}
                >
                    <Text style={{ color: '#F9F9F9' }}>Adicionar</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    disabledButton: {
        backgroundColor: '#A1A1A1',
        padding: 10,
        alignSelf: 'center',
        width: '50%',
        borderRadius: 20,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: '85%',
        borderRadius: 15,
        marginTop: 10,
        borderWidth: 1,
        padding: 5,
        alignSelf: 'center',
    },
    submitButton: {
        backgroundColor: 'tomato',
        padding: 10,
        alignSelf: 'center',
        width: '50%',
        borderRadius: 20,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
    },
})

export default FormBook
