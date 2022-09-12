import { storage } from "../../lib/api/firebaseConfig";
import { useState } from "react";
import {uploadBytes,listAll, getDownloadURL} from "firebase/compat/storage"



const PostCard = () => {
    const [imageUpload, setImageUpload] = useState(null);
    const [image, setImage] = useState([]);
    const [imageSrc,setImageSrc] = useState('');
    const storageRef = storage.ref();
    const upload = (e) => {
        if (imageUpload === null ) return;
        e.preventDefault();
        const imageRef =storageRef.child(`images/${imageUpload.name}`);
        imageRef.put(imageUpload).then((snapshot)=>{
            console.log('uploaded a file!');
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
            {!imageUpload ?<div className="flex justify-center items-center p-6 m-6 bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:w-1/3 md:w-1/2 w-2/3 h-56 ">
                <form>
                    <label style={{cursor:"pointer"}} for="input-file" className="px-3 py-1 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                       +
                    </label>
                    <input type="file" id="input-file" style={{display: "none"}} onChange={(e) => {onChange(e.target.files[0])}}/>
                    
                    {imageSrc ? <img id="preview" alt="upload" src={imageSrc}/> : null}
                    {imageSrc ? <button onClick={upload}>사진 올리기</button> : null}
                </form>
            </div> : <div className="card lg:card-side bg-base-100 shadow-xl lg:w-1/4 md:w-1/3 w-3/4 mt-4">
            <figure><img src={imageSrc} alt="Album" /></figure>
            <div className="card-title p-4">
                <textarea style={{resize:'none'}} className="textarea border-none" placeholder="어떤 공부를 했나요?"></textarea>
                <div className="card-actions justify-end">
                <button className="btn btn-primary ">올리기</button>
                </div>
            </div>
            </div>}
            
            </>
    )
}

export default PostCard;