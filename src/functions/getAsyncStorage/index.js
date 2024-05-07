import AsyncStorage from '@react-native-async-storage/async-storage';

const getAsyncStorage = async (user) => {
    try {
        const value = await AsyncStorage.getItem(`books${user}`);
        if (value !== null) {
            return JSON.parse(value);
        } else {
            return [];
        }
    } catch (error) {
        console.error('Erro ao obter do AsyncStorage:', error);
        return [];
    }
}

export default getAsyncStorage;