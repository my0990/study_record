import PostTemplate from '../components/post/PostTemplate';
import PostHeader from '../components/post/PostHeader';
import PostCard from '../components/post/PostCard';
import { app, db } from '../lib/api/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import PostList from '../components/post/PostList';
import { useEffect, useState } from 'react';
import PostStudyRecord from '../components/post/PostStudyRecord';



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
                    setPosts(posts => [...posts, doc.data()]);
                })
            })
        }
        getPostDatas();
    },[])
    const onAttendance = async () => {
        await db.collection('attendance').doc('202209').set({
            name:"강지현",
            date:20220921,
            superpass: false
        })
    };
    return(
        <PostTemplate>
            <PostHeader onLogout={onLogout}/>
            <PostStudyRecord />
            {posts.map((post,id)=>
                <PostList url={post.url} text={post.text} username={post.name} key={post.url}/>
            )}
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <button onClick={onAttendance}>test</button>
        </PostTemplate>
    )
}

export default PostForm;