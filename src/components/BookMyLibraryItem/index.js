import { Image, Text, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import removeBookAsyncStore from "../../functions/removeBookAsyncStore";
import { useSelector } from "react-redux";

const BookMyLibraryItem = ({ book, index, reload, setReload, onPressCreatePost }) => {

    const userName = useSelector(state => state.user.userName)

    const removeBook = async () => {
        await removeBookAsyncStore(book, userName)
        setReload(!reload)
    }

    return (
        <View key={index} style={{paddingTop: 10, paddingBottom: 10,elevation: 2,
            shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, 
            backgroundColor: 'white', margin: 10, borderRadius: 10, padding: 10, justifyContent: 'space-between',
            flexDirection: 'row', alignItems: 'center'
        }}>
            <View style={{flexDirection: 'row'}}>

                <Image source={{uri: book.imageurl}} style={{width: 100, height: 150, resizeMode: 'contain', alignSelf: 'center', borderRadius: 10, marginRight: 20}}/>
                
                <View style={{flex: 1, marginTop: 5}}>

                    <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>{book.title}</Text>

                        <TouchableOpacity onPress={() => onPressCreatePost(book)}>
                            <MaterialIcons name="post-add" size={24} color="black" />
                        </TouchableOpacity>
                        
                    </View>
                    
                        <Text style={{marginTop: 10}}>{book.author}</Text>
                        
                    
                    <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginTop: '25%'}}>
                        <Text style={{textAlignVertical: 'center'}}>{book.pages} páginas</Text>
                        <TouchableOpacity style={{justifyContent: 'center', alignContent: 'center'}}
                            onPress={() => removeBook()}
                        >
                            <MaterialIcons name="delete-outline" size={24} color="red" />
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

        </View>
    )
}

export default BookMyLibraryItem