import { View, Text, SafeAreaView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import MyLibrary from '../../components/MyLibrary';
import getAsyncStorage from '../../functions/getAsyncStorage';
import MyFeed from '../../components/MyFeed';

const STATUSBAR_HEIGHT = Constants.statusBarHeight;

const Profile = () => {

  const [pageSelected, setPageSelected] = useState('library')

  const [ reload, setReload ] = useState(true)

  const { userName } = useSelector(state => state.user)

  const reloadBooksCount = useSelector(state => state.state.reload)

  const [books, setBooks] = useState([])

  const getBooks = async () => {
    setBooks(await getAsyncStorage(userName))
  }

  useEffect(() => {
      getBooks()
  }, [reloadBooksCount == true, reload])


  return (
    <SafeAreaView style={{flex: 1, marginTop: STATUSBAR_HEIGHT}}>
      <View

        style={{flex: 1,}}
      >
        <View style ={{}}>
          <Text 
            style={{fontWeight: 'bold', fontSize: 24, 
            alignSelf: 'center', textAlign: 'center', color: 'tomato'}}
            >
              Olá, {userName}
          </Text>
        </View>

        <Text style={{fontSize: 16, marginTop: 10, marginLeft: 5}}>Você tem {books.length} livros na biblioteca</Text>

        <View style={{width: '100%', height: 1, backgroundColor: '#d3d3d3', marginTop: 10}}/>

        <View style={{marginTop: 15, flexDirection: 'row', justifyContent: 'space-evenly', }}>
          <TouchableOpacity onPress={() => {setPageSelected('library')
            setReload(!reload)
          }} style={{alignItems: 'center', justifyContent: 'center', width: 100, height: 40,}}>
            {
              pageSelected === 'library' ? 
              <Ionicons name="library" size={28} color="tomato" /> :
              <Ionicons name="library-outline" size={24} color="black" />
            }
          </TouchableOpacity>

          <View style={{height: 40, width: 1, backgroundColor: '#d3d3d3'}}/>

          <TouchableOpacity onPress={() => {setPageSelected('feed')
            setReload(!reload)
          }} style={{alignItems: 'center', justifyContent: 'center', width: 100, height: 40,}}>
            {
              pageSelected === 'feed' ?  
              <FontAwesome name="feed" size={28} color="tomato" />:
              <FontAwesome name="feed" size={24} color="black" />
            }
          </TouchableOpacity>

        </View>

        <View style={{width: '100%', height: 1, backgroundColor: '#d3d3d3', marginTop: 10}}/>

        {
          pageSelected === 'library' ?
          <MyLibrary setReload={setReload} reload={reload}/>
          :
          <MyFeed/>
        }

      </View>
    </SafeAreaView>
  )
}

export default Profile