import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import BookDetailsModal from "../BookDetailsModal";


const HomeBookItem = ({ book }) => {
    const [bookDetailsModalVisible, setBookDetailsModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <BookDetailsModal book={book} modalVisible={bookDetailsModalVisible} setModalVisible={setBookDetailsModalVisible}/>
            <TouchableOpacity style={styles.card} onPress={() => setBookDetailsModalVisible(true)}>
                <Image source={{uri: book.imageurl}} style={styles.image} />
                <View style={{}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>{book.title}</Text>
                    <Text>{book.author}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        elevation: 2,
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