interface HighLightedTextInterface {
    HeadingLabel_1 : string ,
    HeadingLabel_2 : string , 
    HeadingLabel_3 : string , 
}
export function HighlightedText({HeadingLabel_1 , HeadingLabel_2 , HeadingLabel_3} : HighLightedTextInterface){
    return(
        <div>
            <div className="flex flex-col">
                <div className="flex flex-row items-center">
                <div className="text-4xl text-slate-200 font-bold pr-2">
                    {HeadingLabel_1}
                </div>
                <div className="text-4xl font-bold m-1 text-sky-500">
                    {HeadingLabel_2}
                </div>
            </div>
            <div className="text-4xl font-bold m-1 text-sky-500 ">
                      {HeadingLabel_3} 
            </div>
            </div>
        </div>
    )
}