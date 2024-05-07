import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, FlatList, RefreshControl, View, Image } from 'react-native';
import Constants from 'expo-constants';
import { useDispatch } from 'react-redux';
import fetchUsername from '../../functions/fetchUsername'
import { setUserNameAction } from '../../../redux/actions';
import fetchPosts from '../../functions/fetchPosts'
import PostItem from '../../components/PostItem';

import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';

const STATUSBAR_HEIGHT = Constants.statusBarHeight;

const Home = () => {

  const [fontLoaded, setFontLoaded] = useState(false)


  const [posts, setPosts] = useState([])

  const [refreshing, setRefreshing] = useState(false)

  const dispatch = useDispatch()

  const fetchData = async () => {
    try {
      const userName = await fetchUsername();
      setUserNameAction(userName, dispatch)
    } catch (error) {
        console.error("Error fetching username:", error);
    }
  }

  const fetchLastPosts = async () => {
    try {
      fetchPosts().then((posts) => setPosts(posts))
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  const loadFonts = async () => {
    await Font.loadAsync({
      'Dancing-Script-Bold': require('../../../assets/fonts/DancingScript-Bold.ttf')
    })
    setFontLoaded(true)
  }

  useEffect(() => {
    loadFonts()
    fetchLastPosts()
    fetchData()
  }, [])

  if (!fontLoaded) {
    return null;
  }


  const onRefresh = async () => {
    setRefreshing(true)
    fetchLastPosts()
    setRefreshing(false)
  }

  const renderItem = ({ item }) => {
    return (
      <PostItem post={item} myFeed={false}/>
    )
  }

  const HeaderComponent = () => {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'tomato', elevation: 4, gap: 10}}>
        <Image source={require('../../assets/Logo.png')} style={{width: 60, height: 60, alignSelf: 'center'}} />
        <Text style={{fontSize: 30, 
          alignSelf: 'center', color: '#efefef',
          fontFamily: 'Dancing-Script-Bold'
          }}>Lendo no Vagão</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E8D49E', paddingTop: STATUSBAR_HEIGHT}}>
      <StatusBar translucent/>
        <FlatList 
          data={posts}
          keyExtractor={item => item.body}
          initialNumToRender={20}
          renderItem={renderItem}
          ListEmptyComponent={() => <Text style={{textAlign: 'center'}}>Sem posts no momento</Text>}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ListHeaderComponent={HeaderComponent}
        />
    </SafeAreaView>
  );
};

export default Home;