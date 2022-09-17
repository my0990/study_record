const PostStudyRecord = () => {
    const today = new Date();
    const date = []
    for (let index = 1; index < 32; index++) {
        date.push(index);
    }
    return(
        <div className="m-auto w-full">
            <h1 className="text-3xl text-center mt-3 mb-3">
                {today.getFullYear()}년{today.getMonth()+1}월{today.getDate()}일
            </h1>
            <div className=" overflow-y-auto">
                <table className="table">
                
                    <thead>
                    <tr>
                        <th></th>
                        {date.map((a,i)=>
                            <th>{a}</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>

                    <tr>
                        <th>강지현</th>
  
                    </tr>

                    <tr>
                        <th>고지웅</th>

                    </tr>

                    <tr>
                        <th>김의진</th>

                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PostStudyRecord;