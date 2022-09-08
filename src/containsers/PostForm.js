import PostTemplate from '../components/post/PostTemplate';
import PostHeader from '../components/post/PostHeader';
import PostCard from '../components/post/PostCard';
import { app } from '../lib/api/firebaseConfig';
import { useNavigate } from 'react-router-dom';
const PostForm = () => {
    let navigate = useNavigate();
    const onLogout = () => {
        app.auth().signOut().then(()=>{
            navigate("/");
        }).catch((error)=>{
            console.log(error)
        })
    }
    return(
        <PostTemplate>
            <PostHeader onLogout={onLogout}/>
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
        </PostTemplate>
    )
}

export default PostForm;