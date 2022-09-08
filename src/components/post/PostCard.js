const PostCard = () => {
    return(
            <div className="flex p-6 m-6 bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:w-1/3 md:w-1/2 w-2/3 h-56 ">
                <form>
                    <button className="px-3 py-1 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                       +
                    </button>
                </form>
            </div>
    )
}

export default PostCard;