interface SubHeadingInterface {
    SubHeadingLine_1 : string , 
    SubHeadingLine_2 : string ,
    SubHeadingLine_3 : string ,
}

export function SubHeading({SubHeadingLine_1 , SubHeadingLine_2 , SubHeadingLine_3} : SubHeadingInterface){
    return(
        <div>
             <div className="flex ">
                <div className=" text-slate-300 mt-4 m-1 text-lg">
                  {SubHeadingLine_1},<br></br>
                  {SubHeadingLine_2},<br></br>
                  {SubHeadingLine_3},<br></br>
               </div>
            </div>
        </div>
    )
}