import { Button } from "./Button";

interface BlockContentInterface {
    HeadingLabel_1 : string,
    HeadingLabel_2 : string,
    HeadingLabel_3 : string,
    SubHeadingLine_1 : string,
    SubHeadingLine_2 : string,
    SubHeadingLine_3 : string,
    Button_1_Label : string,
    Button_2_Label : string,
    Button_1_varient : string,
    Button_2_varient : string,

}

export function Block({
HeadingLabel_1,
  HeadingLabel_2,
  HeadingLabel_3,
  SubHeadingLine_1,
  SubHeadingLine_2,
  SubHeadingLine_3,
  Button_1_Label,
  Button_2_Label,
  Button_1_varient,
  Button_2_varient,

} : BlockContentInterface){
    return(
        <div className="flex flex-col items-center mt-20">
            {/* Heading Component */}
            <div>
            <div className="flex flex-col">
                <div className="flex flex-row items-center">
                <div className="text-4xl font-bold pr-2">
                    {HeadingLabel_1} 
                </div>
                <div className="text-4xl font-bold m-1 text-sky-500">
                    {HeadingLabel_2}
                </div>
            </div>
            <div className="text-4xl font-bold m-1 text-white">
                      {HeadingLabel_3} 
            </div>
            </div>
           
           {/* Subheading Component */}
            <div className="flex ">
                <div className=" text-slate-400 mt-4 m-1">
                  {SubHeadingLine_1},<br></br>
                  {SubHeadingLine_2},<br></br>
                  {SubHeadingLine_3},<br></br>
               </div>
            </div>



            {/* Buttons Components */}
            <div className="flex flex-row mt-3 pt-3">
                <div className="mr-4 pr-4">
                    <Button
                     label={Button_1_Label}
                     variant={Button_1_varient as "yellow" | "dark"}
                     />

                </div>
                <div className="ml-4 pl-4">
                    <Button
                    label={Button_2_Label}
                    variant={Button_2_varient as "yellow" | "dark"}
                    />

                </div>
            </div>
        </div>
    </div>
    )
}