import {
    Image,
    Modal,
    RefreshControl,
    ScrollView,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import fetchFirstComments from '../../functions/fetchFirstComment'
import fetchAllNotes from '../../functions/fetchAllComments'
import addToAsyncStorage from '../../functions/addToAsyncStorage'
import { useDispatch, useSelector } from 'react-redux'
import { setStateAction } from '../../../redux/actions'
import { Rating } from 'react-native-ratings'
import postComment from '../../functions/postComment'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import deleteComment from '../../functions/deleteComment'

const BookDetailsModal = ({ book, modalVisible, setModalVisible }) => {
    const [firstComments, setFirstComments] = useState([])
    const [notaMedia, setNotaMedia] = useState(0)
    const [nota, setNota] = useState(1)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [refreshing, setRefreshing] = useState(false)

    const dispatch = useDispatch()

    const userName = useSelector((state) => state.user.userName)

    const addComment = async (book, nota, title, body) => {
        try {
            await postComment(book, nota, title, body, userName)
        } catch (error) {
            console.error('Erro ao postar o comentário:', error)
        }
    }

    const mediaDasNotas = async () => {
        try {
            if (book) {
                let notas = await fetchAllNotes(book)
                if (notas.length === 0) {
                    setNotaMedia('Sem notas')
                    return
                }
                let total = 0
                notas.forEach((nota) => {
                    total += nota
                })
                setNotaMedia(total / notas.length)
            }
        } catch (error) {
            console.error('Erro ao recuperar as notas:', error)
        }
    }

    const handleClick = async (selectedBook) => {
        await addToAsyncStorage(selectedBook, userName)
        setStateAction(true, dispatch)
        setModalVisible(!modalVisible)
    }

    const handleDeleteComment = async (comment) => {
        try {
            await deleteComment(comment)
        } catch (error) {
            console.error('Erro ao deletar o comentário:', error)
        }
    }

    const fetchComments = async () => {
        try {
            if (book) {
                const comments = await fetchFirstComments(book)
                setFirstComments(comments)
            }
        } catch (error) {
            console.error('Erro ao recuperar os comentários:', error)
        }
    }

    const onRefresh = async () => {
        setRefreshing(true)
        mediaDasNotas()
        fetchComments()
        setRefreshing(false)
    }

    useEffect(() => {
        mediaDasNotas()
        fetchComments()
    }, [book])

    return (
        <View>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <ScrollView
                    style={{ backgroundColor: '#F9F9F9' }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View
                        style={{
                            backgroundColor: '#E8D49E',
                            paddingTop: 5,
                            paddingLeft: 5,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#F9F9F9',
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                            }}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <AntDesign
                                name="leftcircle"
                                size={32}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            paddingTop: 10,
                            backgroundColor: '#E8D49E',
                            paddingBottom: 15,
                        }}
                    >
                        <Image
                            source={{ uri: book.imageurl }}
                            style={{
                                width: 250,
                                height: 250,
                                marginLeft: '20%',
                            }}
                            resizeMode="contain"
                        />
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                backgroundColor: 'tomato',
                                width: 50,
                                height: 50,
                                alignSelf: 'center',
                                borderRadius: 25,
                                marginLeft: 10,
                                borderWidth: 5,
                                borderColor: '#F9F9F9',
                                elevation: 8,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                alignItems: 'center',
                            }}
                            onPress={() => handleClick(book)}
                        >
                            <AntDesign name="plus" size={24} color="#F9F9F9" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ padding: 10, alignItems: 'center' }}>
                        <Text
                            style={{ fontSize: 24, fontWeight: 'bold' }}
                            onPress={() => console.log(book)}
                        >
                            {book.title}
                        </Text>
                        <Text style={{ fontSize: 18 }}>{book.author}</Text>
                        <Text style={{ fontSize: 16, paddingTop: 5 }}>
                            Nota média: {notaMedia}
                        </Text>
                        <Text style={{ fontSize: 16, paddingTop: 10 }}>
                            {book.pages} páginas
                        </Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            backgroundColor: '#000',
                            height: 0.8,
                            marginTop: 10,
                        }}
                    />
                    <View style={{ padding: 10 }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}
                        >
                            Descrição
                        </Text>
                        <Text style={{ fontSize: 16, textAlign: 'justify' }}>
                            {book.resume}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            height: 10,
                            backgroundColor: '#A1A1A1',
                        }}
                    />

                    <View
                        style={{
                            padding: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}
                        >
                            Avaliar este livro
                        </Text>
                        <Rating
                            style={{
                                marginTop: 10,
                                width: '30%',
                            }}
                            ratingBackgroundColor="#F9F9F9"
                            minValue={1}
                            startingValue={1}
                            onFinishRating={(nota) => setNota(nota)}
                        />
                    </View>

                    <TextInput
                        style={{
                            backgroundColor: '#F9F9F9',
                            borderRadius: 10,
                            margin: 10,
                            padding: 10,
                            elevation: 5,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                        }}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        placeholder="Título"
                    />

                    <TextInput
                        style={{
                            backgroundColor: '#F9F9F9',
                            borderRadius: 10,
                            margin: 10,
                            padding: 10,
                            elevation: 5,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            height: 100,
                            textAlignVertical: 'top',
                        }}
                        value={body}
                        onChangeText={(text) => setBody(text)}
                        multiline
                        placeholder="Deixe aqui seu comentário"
                    />

                    <TouchableOpacity
                        style={{
                            borderRadius: 20,
                            margin: 10,
                            backgroundColor:
                                title && body !== '' ? 'tomato' : '#A1A1A1',
                            width: '50%',
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                        }}
                        disabled={title && body === '' ? true : false}
                        onPress={() => {
                            addComment(book, nota, title, body)
                            setTitle('')
                            setBody('')
                            setNota(1)
                        }}
                    >
                        <Text style={{ color: '#F3F3F3' }}>Postar</Text>
                    </TouchableOpacity>

                    <View style={{ padding: 10 }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}
                        >
                            Avaliações {'->'}
                        </Text>
                        {firstComments.map((actuallyComment, index) => {
                            return (
                                <View
                                    key={
                                        actuallyComment.title +
                                        actuallyComment.body
                                    }
                                    style={{
                                        padding: 10,
                                        backgroundColor: '#F9F9F9',
                                        borderRadius: 10,
                                        marginTop: 10,
                                        elevation: 5,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                    }}
                                >
                                    {
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {actuallyComment.title}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    marginLeft: 'auto',
                                                }}
                                            >
                                                Nota: {actuallyComment.nota}
                                            </Text>
                                        </View>
                                    }
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Text style={{ fontSize: 14 }}>
                                            {actuallyComment.body}
                                        </Text>
                                        {actuallyComment.posted_by ===
                                        userName ? (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handleDeleteComment(
                                                        actuallyComment
                                                    )
                                                }
                                            >
                                                <MaterialCommunityIcons
                                                    name="delete-outline"
                                                    size={24}
                                                    color="black"
                                                />
                                            </TouchableOpacity>
                                        ) : null}
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </Modal>
        </View>
    )
}

export default BookDetailsModal
