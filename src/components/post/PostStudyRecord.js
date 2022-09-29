const PostStudyRecord = ({query}) => {
    // console.log(query['강지현']);
    const today = new Date();
    const todayDate = today.getDate();
    const date = [];
    const month = [31,28,31,30,31,30,31,31,30,31,30,31];
    const thisMonth = today.getMonth();
    
    for (let index = 1; index <month[thisMonth]+1; index++) {
        date.push(index);
    }
    return(
        <div className="m-auto w-full ">
            <h1 className="text-3xl text-center mt-3 mb-3">
                {today.getFullYear()}년{today.getMonth()+1}월{today.getDate()}일
            </h1>
            <div className="overflow-y-auto">
                <table className="table">
                    <thead >
                    <tr >
                        <th ></th>
                        {date.map((a,i)=>
                          <th>{a}</th>
                        )}
                        <th className="text-center">벌금</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>강지현</th>
                        {query && query['강지현'].map((a,i)=>
                            i+1 === todayDate ? <td className="bg-gray-300"> {a} </td> : <td> {a} </td>)}
                        <td>
                            {query && query['강지현'].reduce((cnt,element)=> cnt + ('X'===element), 0) * 2500}원
                        </td>
                    </tr>
                    <tr>
                        <th>고지웅</th>
                        {query && query['고지웅'].map((a,i)=>
                            i+1 === todayDate ? <td className="bg-gray-300"> {a} </td> : <td> {a} </td>)}
                        <td>
                            {query && query['고지웅'].reduce((cnt,element)=> cnt + ('X'===element), 0) *2500}원
                        </td>
                    </tr>
                    <tr>
                        <th>김의진</th>
                        {query && query['김의진'].map((a,i)=>
                            i+1 === todayDate ? <td className="bg-gray-300"> {a} </td> : <td> {a} </td>)}
                        <td>
                            {query && query['김의진'].reduce((cnt,element)=> cnt + ('X'===element), 0) * 2500}원
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default PostStudyRecord;