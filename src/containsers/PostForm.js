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
    const [query,setQuery] = useState(null);
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
        };
        //출석 데이타 가져오기

        let attendance = []
        for (let index = 1; index < 32; index++) {
            attendance.push('X');
        }
        const getAttendance = async () => {
            await db.collection("202209").where("name", "==", "강지현").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    attendance[doc.data().date-1] = 'O';
                })
            });
            console.log(attendance);
            setQuery(attendance);
        }
        getPostDatas();
        getAttendance();
    },[])
    const onAttendance = async () => {
        await db.collection('202209').add({
            name:"강지현",
            date: 17,
            superpass: false
        })
    };
    return(
        <PostTemplate>
            <PostHeader onLogout={onLogout}/>
            <PostStudyRecord query={query}/>
            {posts.map((post,id)=>
                <PostList 
                    url={post.url} 
                    text={post.text} 
                    username={post.name} 
                    key={post.url}
                />
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