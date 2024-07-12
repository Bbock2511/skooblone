import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BookDetailsModal from '../BookDetailsModal'
import fetchAllNotes from '../../functions/fetchAllComments'

const HomeBookItem = ({ book }) => {
    const [bookDetailsModalVisible, setBookDetailsModalVisible] =
        useState(false)
    const [notaMedia, setNotaMedia] = useState()

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
                setNotaMedia((total / notas.length).toString())
            }
        } catch (error) {
            console.error('Erro ao recuperar as notas:', error)
        }
    }

    useEffect(() => {
        mediaDasNotas()
    }, [book])

    return (
        <View style={styles.container}>
            <BookDetailsModal
                book={book}
                modalVisible={bookDetailsModalVisible}
                setModalVisible={setBookDetailsModalVisible}
            />
            <TouchableOpacity
                style={styles.card}
                onPress={() => setBookDetailsModalVisible(true)}
            >
                <Image source={{ uri: book.imageurl }} style={styles.image} />
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            maxWidth: '95%',
                        }}
                    >
                        {book.title}
                    </Text>
                    <Text style={{ maxWidth: '95%' }}>{book.author}</Text>
                    <Text style={{ maxWidth: '95%' }}>
                        Nota média: {notaMedia}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        elevation: 1,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
    },
    card: {
        borderRadius: 15,
        gap: 5,
        padding: 10,
        flexDirection: 'row',
    },
    image: {
        width: 100,
        height: 145,
        resizeMode: 'contain',
        borderRadius: 10,
        marginRight: 10,
    },
})

export default HomeBookItem
