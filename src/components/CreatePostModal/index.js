import { Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import HomeBookItem from "../HomeBookItem"
import { useState } from "react"
import createPost from "../../functions/createPost"
import { useSelector } from "react-redux"


const CreatePostModal = ({ book, modalVisible, setModalVisible, handleCancelModal }) => {

    const { userName } = useSelector(state => state.user)

    const [ bodyPost, setBodyPost ] = useState('')

    const handleClick = () => {
        createPost(book, userName, bodyPost)
        setBodyPost('')
        setModalVisible(false)
    }

    return (
        <View style={styles.container}>
            <Modal 
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    handleCancelModal()
                }}
            >
                <SafeAreaView style={styles.container}>
                    <Text 
                    style={{fontSize: 24, 
                        fontWeight: 'bold', 
                        marginTop: 20,
                        width: '90%'
                        }}
                    >
                        Criar post
                    </Text>
                    <Text 
                    style={{marginTop: 15, 
                        fontSize: 18, 
                        color: 'grey',
                        width: '90%'
                        }}    
                    >
                        Diga aos seus amigos o que está achando desse livro.
                    </Text>
                    <TextInput 
                        placeholder='O que está achando?' 
                        style={styles.input}
                        multiline={true}
                        onChangeText={(text) => setBodyPost(text)}
                        value={bodyPost}
                        onFocus={() => {}}

                    />
                    <View style={styles.cardBook}>
                        <HomeBookItem book={book}/>
                    </View>

                    <View style={{width: '95%', height: 2, backgroundColor: 'lightgray', marginTop: 10}}/>

                    <View style={styles.buttonView}>

                        <TouchableOpacity
                            onPress={() => handleCancelModal()}
                            style={{
                                padding: 5, 
                                borderRadius: 20, 
                                width: '40%',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{color: '#517EF5', fontSize: 16, textAlign: 'center', textAlignVertical: 'center'}}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            disabled = {bodyPost === '' ? true : false}
                            style={{backgroundColor: bodyPost === '' ? 'lightgray' : '#517EF5', 
                                padding: 5, 
                                borderRadius: 20, 
                                width: '40%',
                                alignItems: 'center'
                            }}

                            onPress={handleClick}
                        >
                            <Text style={{fontSize: 16, color: 'white'}}>Postar</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    cardBook: {
        borderRadius: 10,
        alignSelf: 'center',
        width: '80%',
        marginTop: 30,
    },
    input: {
        width: '90%',
        height: 100,
        justifyContent: 'flex-start',
        textAlignVertical: 'top',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 30,
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#d3d3d3',
    },
    buttonView: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        width: '90%', 
        marginTop: 10
    }
})

export default CreatePostModal