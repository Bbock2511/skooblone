import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../../services/firebaseConfig"


const fetchMyPosts = async (userName) => {

    const q = query(collection(db, "posts")
        , where("postedBy", "==", userName)
    )

    const querySnapshot = await getDocs(q)

    let posts = []

    querySnapshot.forEach((doc) => {
        posts.push(doc.data())
    })

    return posts
}

export default fetchMyPosts;