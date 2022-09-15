const PostList = ({url, text, username}) => {
    return(
        <>
        <div className="card bg-base-100 shadow-xl  w-3/4 mt-4 max-w-sm m-4">
            <figure><img src={url} alt="Album" /></figure>
            <div className="p-4">
                <h1 className="font-bold text-lg mb-3">
                    {username}
                </h1>
                <p className="text-sm">
                    {text}
                </p>
            </div>
        </div>
        </>
    )
}

export default PostList;