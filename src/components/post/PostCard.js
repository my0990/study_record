import { storage } from "../../lib/api/firebaseConfig";
import { useState,useRef } from "react";
import { db } from "../../lib/api/firebaseConfig";

const PostCard = () => {
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
    //업로드
    const upload = (e) => {
        if (imageUpload === null ) return;
        e.preventDefault();
        setIsLoading(true);
        const imageRef =storageRef.child(`images/${imageUpload.name}`);
        imageRef.put(imageUpload).then((snapshot)=>{
            snapshot.ref.getDownloadURL().then( url =>
                //date를 이름으로 하는 컬렉션 새로 생성 => 년월일로 변경하기
                db.collection(`${time.getDate()}`).add({
                    url: url,
                    name: localStorage.getItem('username'),
                    text: textRef.current.value,
                    time: time
                }).then((docRef)=>{
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

    return(<>
                {!imageUpload 
                //입력하기창
                ?<div className="flex justify-center items-center p-6 m-6 bg-white border-t  rounded shadow-lg  lg:w-1/3 md:w-1/2 w-2/3 h-56 ">
                    <form>
                        <label style={{cursor:"pointer"}} for="input-file" className="px-3 py-1 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                        +
                        </label>
                        <input type="file" id="input-file" style={{display: "none"}} onChange={(e) => {onChange(e.target.files[0])}}/>
                    </form>
                </div> 
                //올리기 창
                :<div className="card bg-base-100 shadow-xl  w-3/4 mt-4 max-w-sm mb-4">
                    <figure>
                        <img src={imageSrc} alt="Album" />
                    </figure>
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
                </div>}
            </>
    )
}

export default PostCard;