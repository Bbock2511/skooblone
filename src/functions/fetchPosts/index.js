import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { db } from "../../../services/firebaseConfig"


const fetchPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"))

    const querySnapshot = await getDocs(q, limit(50))

    const posts = []

    querySnapshot.forEach((doc) => {
        posts.push(doc.data())
    })

    return posts;
}

export default fetchPosts;