const PostTemplate = ({children}) => {
    return(
        <diV className="flex justify-around  m-auto items-center flex-wrap phone:w-80 sm:w-128 w-160">
            {children}
        </diV>
    )
}

export default PostTemplate;