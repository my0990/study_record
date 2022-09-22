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
        const time = new Date();
        const getPostDatas = async () =>{
            await db.collection(`${date}`).orderBy('time').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setPosts(posts => [...posts, doc.data()]);
                })
            })
        };
        //출석 데이타 가져오기

        let attendance = {
            '강지현': [],
            '고지웅': [],
            '김의진': []
        }
        for (let index = 0; index < date; index++) {
            attendance['강지현'].push('X');
            attendance['고지웅'].push('X');
            attendance['김의진'].push('X');

        }
        const getAttendance = async () => {
            await db.collection(`${time.getFullYear()}${time.getMonth()+1}`).where("name", "==", "강지현").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    attendance['강지현'][doc.data().date-1] = 'O';
                })
            });
            await db.collection(`${time.getFullYear()}${time.getMonth()+1}`).where("name", "==", "고지웅").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    attendance['고지웅'][doc.data().date-1] = 'O';
                })
            });
            await db.collection(`${time.getFullYear()}${time.getMonth()+1}`).where("name", "==", "김의진").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    attendance['김의진'][doc.data().date-1] = 'O';
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