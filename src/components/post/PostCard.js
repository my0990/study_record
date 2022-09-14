import { storage } from "../../lib/api/firebaseConfig";
import { useState,useRef } from "react";
import { db } from "../../lib/api/firebaseConfig";

const PostCard = () => {
    const [imageUpload, setImageUpload] = useState(null);
    const [image, setImage] = useState([]);
    const [imageSrc,setImageSrc] = useState('');
    const textRef = useRef();
    const storageRef = storage.ref();

    const time = new Date();
    const upload = (e) => {
        if (imageUpload === null ) return;
        e.preventDefault();
        const imageRef =storageRef.child(`images/${imageUpload.name}`);
        imageRef.put(imageUpload).then((snapshot)=>{
            snapshot.ref.getDownloadURL().then( url =>
                db.collection(`${time.getDate()}`).add({
                    url: url,
                    name: localStorage.getItem('username'),
                    text: textRef.current.value,
                    time: time
                }).then((docRef)=>{
                    console.log("Document written with ID: ", docRef.id);
                    window.location.reload();
                })
                .catch((error) => {
                    console.log("Error adding documnet: ", error);
                })
            );
        });
    };

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
            {!imageUpload ?<div className="flex justify-center items-center p-6 m-6 bg-white border-t  rounded shadow-lg  lg:w-1/3 md:w-1/2 w-2/3 h-56 ">
                <form>
                    <label style={{cursor:"pointer"}} for="input-file" className="px-3 py-1 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                       +
                    </label>
                    <input type="file" id="input-file" style={{display: "none"}} onChange={(e) => {onChange(e.target.files[0])}}/>
                </form>
            </div> : 
            <div className="card bg-base-100 shadow-xl  w-3/4 mt-4 max-w-sm">
            <figure><img src={imageSrc} alt="Album" /></figure>
            <div className="card-title p-4 flex justify-end">
                <textarea style={{resize:'none'}} className="textarea border-none w-full" placeholder="어떤 공부를 했나요?" ref={textRef}></textarea>
                
                <button className="btn btn-primary" onClick={upload}>올리기</button>
                
            </div>
            </div>}
            
            </>
    )
}

export default PostCard;