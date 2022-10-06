import kadvice from "kadvice";
import { useMemo } from "react";


const Advise = () => {
    const advice = useMemo(() => kadvice.random(2),[]);
    return(
        <>
            <div className="text-center mt-4 ">
                <div className="div-3 m-3 w-32 h-48 leading-loose flex  flex-col justify-center italic" >
                    <p className="text-base  font-bold ">{advice['message']}</p>
                    <p className="text-xs mt-2">-{advice['author']}-</p>
                    <p className="text-sm">{advice['authorProfile']}</p>
                </div>
            </div> 
        </>
    )
}

export default Advise;

