import PostTemplate from '../components/post/PostTemplate';
import PostHeader from '../components/post/PostHeader';
import PostCard from '../components/post/PostCard';
import PostModal from '../components/post/PostModal';
import { app, db } from '../lib/api/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import PostList from '../components/post/PostList';
import { useEffect, useState } from 'react';
import PostStudyRecord from '../components/post/PostStudyRecord';




const PostForm = () => {
    let navigate = useNavigate();
    const [posts,setPosts] = useState([]);
    const [query,setQuery] = useState(null);
    const month = [31,28,31,30,31,30,31,31,30,31,30,31];

    const onLogout = () => {
        app.auth().signOut().then(()=>{
            navigate("/");
        }).catch((error)=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        const current = new Date();
        const date = new Date().getDate();
        const time = new Date(current.getTime() - 1000 * 60 * 60 * 6);
        console.log(time);
        const getPostDatas = async () =>{
            await db.collection(`${time.getFullYear()}${time.getMonth()+1}${time.getDate()}`).orderBy('time').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setPosts(posts => [...posts, doc.data()]);
                })
            })
        };
        //출석 데이타 가져오기

        let attendance = {
            '강지현': [],
            '고지웅': [],
            '김의진': [],
            '조미란': [],
        }
        for (let index = 0; index < date; index++) {
            attendance['강지현'].push('X');
            attendance['고지웅'].push('X');
            attendance['조미란'].push('X');
            attendance['김의진'].push('X');
        }
        for (let index = 0; index < month[time.getMonth()] - date; index++){
            attendance['강지현'].push('');
            attendance['고지웅'].push('');
            attendance['조미란'].push('');
            attendance['김의진'].push('');
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
            await db.collection(`${time.getFullYear()}${time.getMonth()+1}`).where("name", "==", "조미란").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    attendance['조미란'][doc.data().date-1] = 'O';
                })
            });
            console.log(attendance);
            setQuery(attendance);
        }
        getPostDatas();
        getAttendance();
        console.log(posts)
    },[])

    return(
        <PostTemplate>
            <PostHeader onLogout={onLogout}/>
            <PostStudyRecord query={query}/>
            {/* {posts.map((post,id)=>
                <PostList 
                    url={post.url} 
                    text={post.text} 
                    username={post.name} 
                    key={post.url}
                />
            )} */}
            {/* <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/> */}

            <PostModal username='강지현' post={posts.filter(post => post.name==='강지현')}/>
            <PostModal username='고지웅' post={posts.filter(post => post.name==='고지웅')}/>
            <PostModal username='조미란' post={posts.filter(post => post.name==='조미란')}/>
            <PostModal username='김의진' post={posts.filter(post => post.name==='김의진')}/>
        </PostTemplate>
    )
}

export default PostForm;