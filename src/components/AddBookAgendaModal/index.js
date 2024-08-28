import { useEffect, useState } from "react";
import {
    FlatList,
    Modal,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSelector } from "react-redux";
import getAsyncStorage from "../../functions/getAsyncStorage";
import addEventAsyncStorage from "../../functions/addEventAsyncStorage";
import requestPermissions from "../../functions/requestNotificationPermission";

const AddBookAgendaModal = ({
    show,
    handleClose,
    selectedDay,
    refresh,
    setRefresh,
}) => {
    const { userName } = useSelector((state) => state.user);
    const [books, setBooks] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getBooks = async () => {
        setBooks(await getAsyncStorage(userName));

        setRefresh(false);
    };

    const handleAddEvent = (book) => {
        addEventAsyncStorage(book, userName, selectedDay);
        handleClose();
        setRefresh(false);
    };

    useEffect(() => {
        requestPermissions();
        getBooks();
    }, [refresh === true]);

    const onRefresh = async () => {
        setRefreshing(true);
        setBooks(await getAsyncStorage(userName));
        setRefreshing(false);
    };

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={show}
                onRequestClose={handleClose}
            >
                <View style={styles.container}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            marginBottom: 10,
                            maxWidth: "90%",
                        }}
                    >
                        Adicionar livro para o dia {selectedDay.slice(-2)}/
                        {selectedDay.slice(5, 7)}
                    </Text>
                    <FlatList
                        style={{ width: "100%", alignContent: "center" }}
                        data={books}
                        keyExtractor={(item) => item.title}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{ alignContent: "center" }}>
                                    <Text style={{ alignSelf: "center" }}>
                                        Nenhum livro na biblioteca
                                    </Text>
                                </View>
                            );
                        }}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: "tomato",
                                            margin: 5,
                                            borderRadius: 15,
                                            height: 35,
                                        }}
                                        onPress={() => handleAddEvent(item)}
                                    >
                                        <Text
                                            style={{
                                                padding: 5,
                                                color: "#efefef",
                                                textAlign: "center",
                                                textAlignVertical: "center",
                                            }}
                                        >
                                            {item.title}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#E8D49E",
    },
});

export default AddBookAgendaModal;
