import AsyncStorage from "@react-native-async-storage/async-storage"

const getEventsFromAsyncStorage = async (user) => {
    try {
        const events = await AsyncStorage.getItem(`events${user}`);
        return events ? JSON.parse(events) : [];
    } catch(e) {
        console.log(e);
        return [];
    }
}

export default getEventsFromAsyncStorage