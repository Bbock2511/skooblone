import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Keyboard,
    RefreshControl,
} from 'react-native'
import Constants from 'expo-constants'
import ModalBookInfo from '../../components/modalBookInfo'
import React, { useEffect, useState } from 'react'
import fetchBooks from '../../functions/fetchBooks'
import { FlatList } from 'react-native-gesture-handler'
import BookItem from '../../components/BookItem'
import { AntDesign } from '@expo/vector-icons'
import BookDetailsModal from '../../components/BookDetailsModal'

const STATUSBAR_HEIGHT = Constants.statusBarHeight

const Search = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [books, setBooks] = useState([])
    const [request, setRequest] = useState(false)
    const [search, setSearch] = useState('')
    const [refreshing, setRefreshing] = useState(false)

    const [modalBookDetailsVisible, setModalBookDetailsVisible] =
        useState(false)

    const [selectedBook, setSelectedBook] = useState({})

    const handleClickBook = (book) => {
        setSelectedBook(book)
        setModalBookDetailsVisible(true)
    }

    useEffect(() => {
        fetchBooks(search).then((books) => setBooks(books))
    }, [search, request])

    const renderItem = ({ item }) => {
        return <BookItem book={item} onPressBookDetails={handleClickBook} />
    }

    const onRefresh = () => {
        setRefreshing(true)
        fetchBooks(search)
            .then((books) => setBooks(books))
            .finally(() => setRefreshing(false))
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                marginTop: STATUSBAR_HEIGHT,
                backgroundColor: '#E8D49E',
            }}
        >
            <View style={{ flex: 1 }}>
                <ModalBookInfo
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    setRequest={setRequest}
                />
                <View
                    style={{
                        backgroundColor: '#efefef',
                        padding: 5,
                        marginTop: 5,
                        flexDirection: 'row',
                        width: '98%',
                        alignSelf: 'center',
                        borderRadius: 25,
                        height: 48,
                        alignItems: 'center',
                        gap: 5,
                    }}
                >
                    <AntDesign name="search1" size={24} color="tomato" />
                    <TextInput
                        style={{ width: '70%', height: 35, fontSize: 16 }}
                        value={search}
                        placeholder="Nome do livro"
                        onChangeText={setSearch}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setRequest(!request)
                            Keyboard.dismiss()
                        }}
                        style={{ borderRadius: 20 }}
                    >
                        <Text
                            style={{
                                alignSelf: 'center',
                                textAlign: 'center',
                                color: '#517EF5',
                                fontSize: 16,
                            }}
                        >
                            Buscar
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={books}
                    style={{ paddingTop: 20 }}
                    numColumns={2}
                    renderItem={renderItem}
                    initialNumToRender={10}
                    keyExtractor={(item) => item.title}
                    maxToRenderPerBatch={10}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    ListEmptyComponent={
                        <Text
                            style={{
                                fontSize: 20,
                                alignSelf: 'center',
                                marginTop: 50,
                            }}
                        >
                            Nenhum livro encontrado
                        </Text>
                    }
                    ListFooterComponent={<View style={{ height: 50 }} />}
                />
            </View>
            <TouchableOpacity
                style={styles.buttonAddBook}
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Text
                    style={{
                        color: '#F9F9F9',
                        fontSize: 32,
                        alignSelf: 'center',
                    }}
                >
                    +
                </Text>
            </TouchableOpacity>
            <BookDetailsModal
                book={selectedBook}
                modalVisible={modalBookDetailsVisible}
                setModalVisible={setModalBookDetailsVisible}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonAddBook: {
        backgroundColor: 'tomato',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
})

export default Search
