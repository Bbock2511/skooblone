import AsyncStorage from '@react-native-async-storage/async-storage';
import getAsyncStorage from '../getAsyncStorage';
import { ToastAndroid } from 'react-native';

const verifyIfBookExists = async (book, userName) => {

    try {
        const savedBooks = await getAsyncStorage(userName)
        const bookExists = savedBooks.find(savedBook => savedBook.title === book.title)
        if (bookExists) {
            return true
        } else return false
    } catch(e) {
        console.log(e)
    }
}

const addToAsyncStorage = async (value, userName) => {
    try {
      const savedBooks = await getAsyncStorage(userName)
      let id = 0

      if(savedBooks.length > 0) {
        id = savedBooks[savedBooks.length - 1].id + 1
      }
      if(await verifyIfBookExists(value, userName) === true) {
          return ToastAndroid.showWithGravity('Livro já adicionado!', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      } else {
        const newBook = {
          id: id,
          title: value.title,
          author: value.author,
          resume: value.resume,
          imageurl: value.imageurl,
          pages: value.pages,
        }
  
        await AsyncStorage.setItem(`books${userName}`, JSON.stringify([...savedBooks, newBook]))
        ToastAndroid.showWithGravity(
            `Livro ${newBook.title} adicionado à sua biblioteca!`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
      )
      }

    } catch(e) {
        console.log(e)
    }
}

export default addToAsyncStorage