import {
    Modal,
    SafeAreaView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import HomeBookItem from '../HomeBookItem'
import { useState } from 'react'
import createPost from '../../functions/createPost'
import { Picker } from '@react-native-picker/picker'
import { useSelector } from 'react-redux'

const CreatePostModal = ({
    book,
    modalVisible,
    setModalVisible,
    handleCancelModal,
}) => {
    const { userName } = useSelector((state) => state.user)

    const [bodyPost, setBodyPost] = useState('')

    const [lending, setLending] = useState(false)

    const [trading, setTrading] = useState(false)

    const [contact, setContact] = useState('whatsapp')

    const [contactValue, setContactValue] = useState('')

    const handleClick = () => {
        if (lending || trading) {
            var body =
                'Livro: ' +
                book.title +
                '\nDisponível para ' +
                (lending && trading
                    ? 'troca e empréstimo'
                    : lending
                    ? 'empréstimo'
                    : trading
                    ? 'troca'
                    : '') +
                '\nTipo de contato: ' +
                contact +
                '\nContato: ' +
                contactValue

            createPost(book, userName, body)
            setBodyPost('')
            setModalVisible(false)
        } else {
            createPost(book, userName, bodyPost)
            setBodyPost('')
            setModalVisible(false)
        }
    }

    const isDisabled = () => {
        if (lending || trading) {
            return contactValue === '' ? true : false
        } else {
            return bodyPost === '' ? true : false
        }
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    handleCancelModal()
                }}
            >
                <SafeAreaView style={styles.container}>
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            marginTop: 20,
                            width: '90%',
                        }}
                    >
                        Criar post
                    </Text>
                    {lending || trading ? (
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Picker
                                selectedValue={contact}
                                style={{
                                    height: 50,
                                    width: '90%',
                                    marginTop: 30,
                                }}
                                onValueChange={(itemValue) =>
                                    setContact(itemValue)
                                }
                                mode="dropdown"
                                itemStyle={{ width: 20 }}
                            >
                                <Picker.Item
                                    label="WhatsApp"
                                    value="WhatsApp"
                                />
                                <Picker.Item label="email" value="email" />
                                <Picker.Item
                                    label="Instagram"
                                    value="Instagram"
                                />
                                <Picker.Item
                                    label="Messenger"
                                    value="Messenger"
                                />
                            </Picker>
                            <TextInput
                                placeholder="Digite o contato"
                                style={[styles.input, { height: 50 }]}
                                onChangeText={(text) => setContactValue(text)}
                                value={contactValue}
                                onFocus={() => {}}
                            />
                        </View>
                    ) : (
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Text
                                style={{
                                    marginTop: 15,
                                    fontSize: 18,
                                    color: 'grey',
                                    width: '90%',
                                }}
                            >
                                Diga aos seus amigos o que está achando desse
                                livro.
                            </Text>
                            <TextInput
                                placeholder="O que está achando?"
                                style={styles.input}
                                multiline={true}
                                onChangeText={(text) => setBodyPost(text)}
                                value={bodyPost}
                            />
                        </View>
                    )}

                    <View
                        style={{
                            flexDirection: 'row',
                            width: '90%',
                            marginTop: 10,
                            justifyContent: 'space-between',
                            maxWidth: '95%',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                maxWidth: '95%',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    marginRight: 10,
                                    textAlignVertical: 'center',
                                }}
                            >
                                Empréstimo
                            </Text>
                            <Switch
                                trackColor={{
                                    false: '#767577',
                                    true: '#E8D49E',
                                }}
                                thumbColor={lending ? 'tomato' : '#f4f3f4'}
                                value={lending}
                                onValueChange={() => setLending(!lending)}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    marginRight: 10,
                                    textAlignVertical: 'center',
                                }}
                            >
                                Troca
                            </Text>
                            <Switch
                                trackColor={{
                                    false: '#767577',
                                    true: '#E8D49E',
                                }}
                                thumbColor={trading ? 'tomato' : '#f4f3f4'}
                                value={trading}
                                onValueChange={() => setTrading(!trading)}
                            />
                        </View>
                    </View>
                    <View style={styles.cardBook}>
                        <HomeBookItem book={book} />
                    </View>

                    <View
                        style={{
                            width: '95%',
                            height: 2,
                            backgroundColor: 'lightgray',
                            marginTop: 10,
                        }}
                    />

                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            onPress={() => handleCancelModal()}
                            style={{
                                padding: 5,
                                borderRadius: 20,
                                width: '40%',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    color: '#517EF5',
                                    fontSize: 16,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                }}
                            >
                                Cancelar
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={isDisabled()}
                            style={{
                                backgroundColor: isDisabled()
                                    ? 'lightgray'
                                    : '#517EF5',
                                padding: 5,
                                borderRadius: 20,
                                width: '40%',
                                alignItems: 'center',
                            }}
                            onPress={handleClick}
                        >
                            <Text style={{ fontSize: 16, color: 'white' }}>
                                Postar
                            </Text>
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
        maxWidth: '90%',
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
        marginTop: 10,
    },
})

export default CreatePostModal
