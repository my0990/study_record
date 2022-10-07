import { storage } from "../../lib/api/firebaseConfig";
import { useState,useRef,useEffect } from "react";
import { db } from "../../lib/api/firebaseConfig";
import ModalBtn from "./ModalBtn";
import ModalBlock from "./ModalBlock";
import UploadIcon from "../common/UploadIcon";
import ModalCard from "./ModalCard";


const PostModal = ({username, post, currentDate, dateState}) => {
    //input 이미지 state
    const [imageUpload, setImageUpload] = useState(null);
    //이미지 업로드 로딩
    const [isLoading,setIsLoading] = useState(false);
    //이미지 미리보기
    const [imageSrc,setImageSrc] = useState('');
    //글내용
    const textRef = useRef();
    //firestore ref
    const storageRef = storage.ref();
    //현재 시간
    const time = new Date();
    //체크박스 관리
    const [checked,setChecked] = useState(false);
    const name = localStorage.getItem('username');
    //업로드
    const upload = (e) => {
        if (imageUpload === null ) return;
        e.preventDefault();
        setIsLoading(true);
        const imageRef =storageRef.child(`images/${imageUpload.name}`);
        imageRef.put(imageUpload).then((snapshot)=>{
            snapshot.ref.getDownloadURL().then( url =>
                //date를 이름으로 하는 컬렉션 새로 생성 => 년월일로 변경하기
                db.collection(`${currentDate.getFullYear()}${currentDate.getMonth()+1}${currentDate.getDate()}`).add({
                    url: url,
                    name: localStorage.getItem('username'),
                    text: textRef.current.value,
                    time: time
                }).then(()=>
                    db.collection(`${currentDate.getFullYear()}${currentDate.getMonth()+1}`).add({
                        date: currentDate.getDate(),
                        name: name,
                        superpass: false
                    })
                 ).then((docRef)=>{
                    window.location.reload();
                })
                .catch((error) => {
                    setIsLoading(false);
                })
            );
        });
    };
    //input에 이미지 추가되었을때
    const onChange = (input) => {
        setImageUpload(input)
        const reader = new FileReader();
        reader.readAsDataURL(input);
        return new Promise((resolve)=>{
            reader.onload = () => {
                setImageSrc(reader.result);
                resolve();
            }
        })
    }
    useEffect(()=>{
        setImageUpload(null);
        textRef.current.value='';
    },[checked])
    useEffect(()=>{
        console.log(post[0]?.name)
    },[post])
    return(
        <>

            {/* 모달 버튼 */}
            {/* <div className="text-center mt-4">
                <h1 className="text-slate-900 italic font-bold">{username}</h1>
                <label htmlFor="my-modal-4" className="p-3 m-3 bg-white border-t  rounded shadow-lg   w-32 h-48 btn modal-button" />
            </div> 
            <input type="checkbox" id="my-modal-4" className="modal-toggle" /> */}
            {post[0]?.name
                ? <ModalCard post={post[0]}/>
                :username === localStorage.getItem("username") && dateState == currentDate.getDate()
                ? <ModalBtn username={username} checked={checked} setChecked={setChecked}/>
                : <ModalBlock username={username}/>
            }
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <div className="modal-box">
                    {/* 이미지 */}
                    
                    <div className="w-full">
                        {!imageUpload
                        ?<label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                        <div className="flex flex-col items-center justify-center pt-7">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                    clip-rule="evenodd" />
                            </svg>
                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                Select a photo
                            </p>
                        </div>
                        <input type="file" className="opacity-0" onChange={(e) => {onChange(e.target.files[0])}}/>
                        </label>
                        :<figure>
                            <img src={imageSrc} alt="Album" className="object-contain"/>
                        </figure>
                        }

                    </div>

                    {/* 텍스트 및 올리기 버튼 */}
                    <div className="mt-4">
                        <textarea style={{resize:'none'}} className="textarea  w-full" placeholder="어떤 공부를 했나요?" ref={textRef} />
                        <button className="btn btn-primary  mt-4 w-full" onClick={upload}>
                            {isLoading
                            ? <UploadIcon />
                            : "올리기"}
                        </button>
                    </div>
                </div>
                {/* <div className="modal-box  card bg-base-100 shadow-xl  w-128 h-64"> */}
                    {/* <figure>
                        <img src={imageSrc} alt="Album" className="object-cover w-1/2"/>
                    </figure> */}
                    {/* <div className="flex justify-center items-center p-3 m-3 bg-white border-t  rounded shadow-lg">
                        <form>
                            <label style={{cursor:"pointer"}} for="input-file" className="px-2 py-1 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            +
                            </label>
                            <input type="file" id="input-file" style={{display: "none"}} onChange={(e) => {onChange(e.target.files[0])}}/>
                        </form>
                    </div> 
                    <div className="card-title p-4 flex justify-end">
                        <textarea style={{resize:'none'}} className="textarea border-none w-full" placeholder="어떤 공부를 했나요?" ref={textRef} />
                        <button className="btn btn-primary flex justify-center" onClick={upload}>
                            {isLoading
                            ? <svg aria-hidden="true" className=" w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg> 
                            : "올리기"}
                        </button>
                    </div>
                </div> */}
            </label>
        
        </>
    )
}

export default PostModal;

