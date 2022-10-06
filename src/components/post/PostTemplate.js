const PostTemplate = ({children}) => {
    return(
        <diV className="flex  m-auto justify-between items-center flex-wrap phone:w-80 sm:w-128 w-160">
            {children}
        </diV>
    )
}

export default PostTemplate;