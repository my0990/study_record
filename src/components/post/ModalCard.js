const ModalCard = ({post}) => {
    return(
        <>
            <div className="text-center mt-4">
                <h1 className="text-slate-900 italic font-bold">{post.name}</h1>
                <label className="p-3 m-3 bg-white border-t  rounded shadow-lg   w-32 h-48 btn " >                
                    <figure>
                            <img src={post.url} alt="Album" className="object-cover w-32 h-32"/>
                    </figure>
                    <p className="w-32 h-16 text-black pt-3 text-left">
                        {post.text}
                    </p>
                </label>
            </div> 
            {/* <input type="checkbox" id="my-modal-4" className="modal-toggle" /> */}
        </>
    )
}

export default ModalCard;