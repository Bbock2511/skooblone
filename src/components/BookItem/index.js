import { Image, Text, TouchableOpacity, View } from "react-native"

const BookItem = ({ book, onPressBookDetails }) => {

    return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', padding: 5,}}>
            <TouchableOpacity style={{gap: 5, borderWidth: 0.8, padding: 5,
                borderColor: '#d3d3d3', width: '90%', borderRadius: 15, 
                backgroundColor: '#F9F9F9'}}
                onPress={() => onPressBookDetails(book)}    
            >
                <Image source={{uri: book.imageurl}} style={{width: '100%', height: 170, width: 120, resizeMode: 'contain', borderRadius: 10, alignSelf: 'center'}} />
                <Text style={{textAlign: 'center'}}>{book.title}</Text>
                <Text style={{textAlign: 'center'}}>{book.author}</Text>
                <Text style={{textAlign: 'center'}}>{book.pages} páginas</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BookItem