import { ReactElement } from "react";

interface FeatureComponentInterface {
    Heading_1 : string,
    Heading_2 : string ,
    Icon : React.ReactElement,
}


export function FeatureComponent({Heading_1 , Heading_2 , Icon} : FeatureComponentInterface){
    return(
        <div className="flex flex-row shadow-2xl shadow-slate-600 border-slate-600 w-150 rounded-4xl">
            <div className="bg-white rounded-full text-black w-17 h-17 flex items-center justify-center text-2xl m-2 p-2">
                {Icon}
            </div>
            <div className="flex flex-col">
                 <h1 className="text-2xl text-black font-semibold m-1 p-1"> {Heading_1} </h1>
                 <h3 className="text-lg ml-2 text-slate-700">{Heading_2}</h3>
            </div>
        </div>
    )
}



