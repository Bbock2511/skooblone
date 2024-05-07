import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native"
import BookMyLibraryItem from "../BookMyLibraryItem";
import { useEffect, useState } from "react";
import getAsyncStorage from "../../functions/getAsyncStorage";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../../redux/slices/user";
import { setStateAction } from "../../../redux/actions";
import CreatePostModal from "../CreatePostModal";

const MyLibrary = ({ setReload, reload }) => { 

    const [ refreshing, setRefreshing ] = useState(false)
    const [books, setBooks] = useState([])
    const { userName } = useSelector(state => state.user)
    const reloadBooks = useSelector(state => state.state.reload)

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState({});

    const handleCreatePost = (book) => {
        setSelectedBook(book);
        setModalVisible(true);
    };

    const handleCancelModal = () => {
        setModalVisible(false);
    };

    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(logout());
    }

    const getBooks = async () => {
        setBooks(await getAsyncStorage(userName))
        setStateAction(false, dispatch)
    } 

    useEffect(() => {
        getBooks()
    }, [reloadBooks == true, reload])

    const onRefresh = async () => {
        setRefreshing(true)
        setBooks(await getAsyncStorage(userName))
        setRefreshing(false)
        setReload(!reload)
    }

    const renderItem = ({ item, index }) => {
        return <BookMyLibraryItem book={item} index={index} reload={reload} setReload={setReload} onPressCreatePost={handleCreatePost}/>
    }

    return (
        <View style={{flex: 1, backgroundColor: '#E8D49E'}}>
                <FlatList 
                    data = {books}
                    keyExtractor = {(item) => item.title}
                    renderItem = {renderItem}
                    ListEmptyComponent={() => {
                        return (
                            <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                                <Text style={{fontSize: 16}}>Você ainda não tem livros na sua biblioteca</Text>
                            </View>
                        )
                    
                    }}
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh} 
                        />
                      }
                    ListFooterComponent={() => {
                        return (
                            <View style={{width: '100%', height: 50, marginTop: 10, justifyContent: 'center'}}>
                                <TouchableOpacity onPress={() => logoutUser()} style={{width: '100%', marginLeft: 10, backgroundColor: '#efefef', alignSelf: 'center'
                                , borderRadius: 20
                                }}>
                                    <Text style={{color: 'red', padding: 10, fontSize: 18, textAlign: 'center',}}>Sair da conta</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />

                <CreatePostModal book={selectedBook} modalVisible={modalVisible} setModalVisible={setModalVisible} handleCancelModal={handleCancelModal}/>
        </View>
    )
}

export default MyLibrary