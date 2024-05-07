import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import fetchFirstComments from "../../functions/fetchFirstComment";
import fetchAllNotes from "../../functions/fetchAllComments";
import addToAsyncStorage from "../../functions/addToAsyncStorage";
import { useDispatch, useSelector } from "react-redux";
import { setStateAction } from "../../../redux/actions";


const BookDetailsModal = ({ book, modalVisible, setModalVisible }) => {

    const [firstComments, setFirstComments] = useState([])
    const [notaMedia, setNotaMedia] = useState(0)

    const { reload } = useSelector(state => state.state)

    const dispatch = useDispatch()

    const userName = useSelector(state => state.user.userName)

    const mediaDasNotas = async () => {
        try {
            if (book) {
                let notas = await fetchAllNotes(book)
                let total = 0
                notas.forEach(nota => {
                    total += nota
                })
                setNotaMedia(total / notas.length)
            }
        } catch (error) {
            console.error('Erro ao recuperar as notas:', error);
        }
    }

    const handleClick = async (selectedBook) => {
        await addToAsyncStorage(selectedBook, userName)
        setStateAction(true, dispatch)
        setModalVisible(!modalVisible)
    } 
    
    const fetchComments = async () => {
        try {
            if (book) {
                const comments = await fetchFirstComments(book);
                setFirstComments(comments);
            }
        } catch (error) {
            console.error('Erro ao recuperar os comentários:', error);
        }
    };

    useEffect(() => {
        mediaDasNotas()
        fetchComments();
    }, [book]);


    return (
        <View>
            <Modal
                animationType="slide"
                
                visible={modalVisible} 
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <ScrollView 
                    style={{backgroundColor: '#F9F9F9'}}
                >
                    <View style={{backgroundColor: '#E8D49E', paddingTop: 5, paddingLeft: 5}}>
                        <TouchableOpacity 
                            style={{backgroundColor: '#F9F9F9', width: 32, 
                            height: 32, borderRadius: 16}} 
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <AntDesign name="leftcircle" size={32} color="black" />
                        </TouchableOpacity>
                    
                    </View>
                    <View style={{flexDirection: 'row', width: '100%', paddingTop: 10, backgroundColor: '#E8D49E', paddingBottom: 15}}>
                        <Image source={{uri: book.imageurl}} 
                            style={{width: 250, height: 250, marginLeft: '20%',}} 
                            resizeMode="contain"
                            
                        />
                        <TouchableOpacity style={{justifyContent: 'center', backgroundColor: 'tomato', 
                            width: 50, height: 50, alignSelf: 'center',
                            borderRadius: 25, marginLeft: 10,
                            borderWidth: 5, borderColor: '#F9F9F9',
                            elevation: 8,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            alignItems: 'center',
                        }}
                            onPress={() => handleClick(book)}
                        >
                            <AntDesign name="plus" size={24} color="#F9F9F9"/>
                        </TouchableOpacity>
                    </View>

                    <View style={{padding: 10, alignItems: 'center'}}>
                        <Text style={{fontSize: 24, fontWeight: 'bold'}} onPress={() => console.log(book)}>{book.title}</Text>
                        <Text style={{fontSize: 18}}>{book.author}</Text>
                        <Text style={{fontSize: 16, paddingTop: 5}}>Nota média: {notaMedia}</Text>
                        <Text style={{fontSize: 16, paddingTop: 10}}>{book.pages} páginas</Text>
                    </View>
                    <View style={{width: '100%', backgroundColor: '#000', height: 0.8, marginTop: 10}}/>
                    <View style={{padding: 10}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>Descrição</Text>
                        <Text style={{fontSize: 16, textAlign: 'justify'}}>{book.resume}</Text>
                    </View>
                    <View style={{width: '100%', height: 10, backgroundColor: '#A1A1A1'}}/>

                    <View style={{padding: 10}}>
                        <Text
                            style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}
                        >Avaliações {"->"}</Text>
                        {
                            firstComments.map((actuallyComent, index) => {
                                return (
                                    <View key={index} style={{padding: 10, backgroundColor: '#F9F9F9',
                                        borderRadius: 10, marginTop: 10, elevation: 5, shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 }}}>
                                        {
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{actuallyComent.title}</Text>
                                            <Text style={{fontSize: 16, marginLeft: 'auto'}}>Nota: {actuallyComent.nota}</Text>
                                        </View>

                                        }
                                        <Text style={{fontSize: 14}}>{actuallyComent.body}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </Modal>
        </View>
    )
}

export default BookDetailsModal