import { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import fetchMyPosts from "../../functions/fetchMyPosts";
import { setStateAction } from "../../../redux/actions";
import PostItem from "../PostItem";


const MyFeed = () => {

    const [myPosts, setMyPosts] = useState([]);
    const [ refreshing, setRefreshing ] = useState(false)
    const { userName } = useSelector(state => state.user)
    const reloadBooks = useSelector(state => state.state.reload)

    const dispatch = useDispatch();

    const fetchingMyPosts = async () => {
        setMyPosts(await fetchMyPosts(userName))
        setStateAction(false, dispatch)
    }

    useEffect(() => {
        fetchingMyPosts()
    }, [reloadBooks == true])

    const onRefresh = async () => {
        setRefreshing(true)
        await fetchingMyPosts()
        setRefreshing(false)
    }

    const renderItem = ({ item }) => {
        return (
          <PostItem post={item} myFeed={true}/>
        )
    }

    return (
        <View style={{flex: 1, backgroundColor: '#E8D49E'}}>
            <FlatList
                data = {myPosts}
                keyExtractor = {(item) => item.body}
                renderItem = {renderItem}
                ListEmptyComponent={() => {
                    return (
                        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                            <Text style={{fontSize: 16,}}>Você ainda não fez nenhuma postagem</Text>
                        </View>
                    )
                }}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={onRefresh}  
                    />
                }
            />
        </View>
    )
}

export default MyFeed;