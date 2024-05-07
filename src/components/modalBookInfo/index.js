import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, View } from "react-native"
import FormBook from "../FormBook";

const ModalBookInfo = ({modalVisible, setModalVisible, setRequest}) => {

    return (
        
            <View style={styles.container}>
                <Modal 
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        setRequest(true);
                    }}>
                        <KeyboardAvoidingView style={styles.container}
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        >
                            <View style={styles.card}>
                                <Text style={styles.title}>Adicionar Livro</Text>
                                <FormBook setModalVisible = {setModalVisible} setRequest={setRequest}/>
                            </View>
                        </KeyboardAvoidingView>
                </Modal>
            </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8D49E'
    },
    card: {
        paddingTop: 40,
        paddingBottom: 40,
        borderRadius: 20,
        backgroundColor: '#F9F9F9',
        width: '85%',
        elevation: 20,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: 'tomato'
    },
})


export default ModalBookInfo;