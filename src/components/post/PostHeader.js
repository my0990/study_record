const PostHeader = ({onLogout}) => {

    return(
        <div className="navbar bg-gray-300 rounded-box ">
            <div className="flex-1 px-2 lg:flex-none">
                <a className="text-lg font-bold">하루인증</a>
            </div> 
            <div className="flex justify-end flex-1 px-2">
                <div className="flex items-stretch">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost rounded-btn">메뉴</label>
                    <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4 bg-slate-300">
                        <li onClick={onLogout}><a>로그아웃</a></li> 
                    </ul>
                </div>
                </div>
            </div>
        </div>
    )
}

export default PostHeader;