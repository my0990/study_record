import PostTemplate from '../components/post/PostTemplate';
import PostHeader from '../components/post/PostHeader';
import PostCard from '../components/post/PostCard';
import { app, db } from '../lib/api/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import PostList from '../components/post/PostList';
import { useEffect, useState } from 'react';



const PostForm = () => {

    let navigate = useNavigate();
    const [posts,setPosts] = useState([]);
    const onLogout = () => {

        app.auth().signOut().then(()=>{
            navigate("/");
        }).catch((error)=>{
            console.log(error)

        })
    }
    useEffect(()=>{
        const date = new Date().getDate();
        const getPostDatas = async () =>{
            await db.collection(`${date}`).orderBy('time').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    setPosts(posts => [...posts, doc.data()]);
                })
            })
        }
        getPostDatas();
    },[])
    return(
        <PostTemplate>
            <PostHeader onLogout={onLogout}/>
            {posts.map((post,id)=>
                <PostList url={post.url} text={post.text} username={post.name}/>
            )}
            <PostCard/>
        </PostTemplate>
    )
}

export default PostForm;