import { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import fetchBook from "../../functions/fetchBook";
import HomeBookItem from "../HomeBookItem";
import { MaterialIcons } from '@expo/vector-icons';
import deletePost from "../../functions/deletePost";


const PostItem = ({ post, myFeed }) => {

    const [ book, setBook ] = useState({});

    useEffect(() => {
        fetchBook(post.bookTitle).then((book) => setBook(book))
    }, [])

    return (
        <View style={styles.container}>
            {
                myFeed ?
                <View style={styles.myFeedTrue}>
                    <View>
                        <Text style={styles.username}>{post.postedBy}</Text>
                        <Text style={styles.postBody}>{post.body}</Text>
                    </View>
                    <TouchableOpacity style={{justifyContent: 'center', alignContent: 'center'}}
                        onPress={() => deletePost(post)}
                    >
                            <MaterialIcons name="delete-outline" size={24} color="red" />
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.myFeedFalse}>
                    <Text style={styles.username}>{post.postedBy}</Text>
                    <Text style={styles.postBody}>{post.body}</Text>
                </View>
            }

            <View style={styles.division}/>

            <HomeBookItem book={book} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        gap: 5,
        elevation: 2,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        margin: 5,
        backgroundColor: '#efefef'
    },
    username: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'tomato',
    },
    postBody: {
        fontSize: 16,

    },
    division: {
        width: '100%',
        height: 1,
        backgroundColor: '#d3d3d3',
    },
    myFeedTrue: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    myFeedFalse: {
        marginBottom: 10
    }
})

export default PostItem