import PostCard from "../components/post/PostCard";
import PostTemplate from "../components/post/PostTemplate";

const PostPage = () => {
    return(
        <PostTemplate>
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
        </PostTemplate>
    )
}

export default PostPage;