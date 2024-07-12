import AsyncStorage from '@react-native-async-storage/async-storage'
import { ToastAndroid } from 'react-native'
import getEventsFromAsyncStorage from '../getEventsFromAsyncStorage'

const verifyIfEventExists = (value, savedEvents, selectedDay) => {

    const eventExists = savedEvents.find(savedEvent => savedEvent.name === value.name && savedEvent.date === selectedDay)
    if (eventExists) {
        return true
    } else return false
}

const addEventAsyncStorage = async (value, user, selectedDay) => {
    
    try {
        const savedEvents = await getEventsFromAsyncStorage(user);
        
        let id = 0;

        if (savedEvents.length > 0) {
            id = savedEvents[savedEvents.length - 1].id + 1;
        }

        if (verifyIfEventExists(value, savedEvents, selectedDay)) {
            ToastAndroid.showWithGravity(
                'Evento já adicionado!',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        } else {
            const eventObject = {
                id: id,
                date: selectedDay,
                title: value.title
            };

            const updatedEvents = [...savedEvents, eventObject];

            await AsyncStorage.setItem(`events${user}`, JSON.stringify(updatedEvents))

            ToastAndroid.showWithGravity(
                `Evento adicionado à sua agenda!`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
    } catch (error) {
        console.error('Erro ao adicionar evento:', error);
    }
}

export default addEventAsyncStorage