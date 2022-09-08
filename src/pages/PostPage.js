import PostCard from "../components/post/PostCard";
import PostHeader from "../components/post/PostHeader";
import PostTemplate from "../components/post/PostTemplate";

const PostPage = () => {
    return(
        <PostTemplate>
            <PostHeader />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
        </PostTemplate>
    )
}

export default PostPage;