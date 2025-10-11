import { FaArrowCircleRight } from "react-icons/fa";
import { HiOutlineArrowSmRight } from "react-icons/hi";


interface ButtonInterface {
  label: string
  onClick: () => void
}


export function ArrowButton({label , onClick} : ButtonInterface){
    return (
        <div className="relative flex flex-col items-center justify-center mx-auto text-white bg-yellow-400 w-40 rounded-full m-10 cursor-pointer hover:bg-yellow-600 transition-colors duration-300 border-slate-700 shadow-slate-200">
             <div className="flex items-center justify-between m-2">
                <div className="mr-1 text-black text-shadow-md">
                    {label}
                </div>
                <div className="flex text-black items-center justify-between ml-1">
                     <HiOutlineArrowSmRight />
                </div>
            </div>
        </div>
    )
}