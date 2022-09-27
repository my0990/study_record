const ModalBlock = ({username}) => {
    return(
        <>
            <div className="text-center mt-4">
                <h1 className="text-slate-900 italic font-bold">{username}</h1>
                <label className="p-3 m-3 bg-white border-t  rounded shadow-lg   w-32 h-48 btn " />
            </div> 
            {/* <input type="checkbox" id="my-modal-4" className="modal-toggle" /> */}
        </>
    )
}

export default ModalBlock;