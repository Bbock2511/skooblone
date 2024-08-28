import AsyncStorage from '@react-native-async-storage/async-storage'
import { ToastAndroid } from 'react-native'
import getEventsFromAsyncStorage from '../getEventsFromAsyncStorage'
import * as Notifications from "expo-notifications";
import sortearFrase from '../sortPhrase';
import requestPermissions from '../requestNotificationPermission';

const verifyIfEventExists = (value, savedEvents, selectedDay) => {

    const eventExists = savedEvents.find(savedEvent => savedEvent.title === value.title && savedEvent.date === selectedDay)
    if (eventExists) {
        return true
    } else return false
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: false,
        shouldShowAlert: true,
        shouldSetBadge: false,
    }),
});

const scheduleNotification = async (day, book) => {
    const fraseSorteada = sortearFrase();
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    await Notifications.scheduleNotificationAsync({
        content: {
            title: `Horário de leitura de ${book.title}`,
            body: `${fraseSorteada.frase}`,
        },
        trigger: { seconds: 5 },
    });
};

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

            scheduleNotification(selectedDay, value)

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