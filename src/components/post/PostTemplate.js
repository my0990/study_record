const PostTemplate = ({children}) => {
    return(
        <diV className="flex justify-around max-w-screen-xl m-auto items-center flex-wrap phone:w-80 sm:w-96">
            {children}
        </diV>
    )
}

export default PostTemplate;