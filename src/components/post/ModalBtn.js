const ModalBtn = ({username,checked,setChecked}) => {
    return(
        <>
            <div className="text-center mt-4">
                <h1 className="text-slate-900 italic font-bold">{username}</h1>
                <label htmlFor="my-modal-4" className="text-black p-3 m-3 bg-white border-t  rounded shadow-lg   w-32 h-48 btn modal-button">
                    인증하기
                </label>
            </div> 
            <input type="checkbox" id="my-modal-4" className="modal-toggle" checked={checked} onChange={e => {setChecked(!checked)}}/>
        </>
    )
}

export default ModalBtn;