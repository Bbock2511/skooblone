import AsyncStorage from "@react-native-async-storage/async-storage";
import getAsyncStorage from "../getAsyncStorage"


const removeBookAsyncStore = async (bookToRemove, user) => {
    try {
        const books = await getAsyncStorage(user);

        const updatedBooks = books.filter(book => book.id !== bookToRemove.id)

        await AsyncStorage.setItem(`books${user}`, JSON.stringify(updatedBooks))

    } catch (error) {
        console.log(error)
    }
}

export default removeBookAsyncStore