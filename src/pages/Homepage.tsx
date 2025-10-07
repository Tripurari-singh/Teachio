import { FaArrowCircleRight } from "react-icons/fa"
import { Button } from "../components/Button"

export const Home = () => {
    return(
        <div>
            {/* section 1 */}
            {/* A Button Component , Signup Functionality Need to Be Implemented Later On */}

            <div className="relative flex flex-col items-center justify-between mx-auto text-white bg-gray-700 w-50 rounded-full  m-10  cursor-pointer
            hover:bg-slate-900 transition-colors duration-300 border-slate-700  shadow-slate-200 ">
                <div  className="flex items-center justify-between m-2">
                    <div className="mr-1 text-shadow-md">
                        Become An Instructor
                    </div>
                    <div className="flex items-center justify-between ml-1">
                        <FaArrowCircleRight />
                    </div>
                </div>
            </div>

            {/* Title Section */}
            <div className="flex flex-col items-center justify-between mt-1 pt-1">
                <div className="flex">
                <div className="m-2 p-2 text-4xl font-bold">
                    Upgrade Your Skills. 
                </div>
                <div className="m-2 p-2 text-4xl font-bold text-sky-600">
                    Find New Opportunities 
                </div>   
            </div>
            </div>

            {/* Subtitle Section */}

            <div className="flex flex-col items-center mt-5 text-md text-slate-400">
                <div className="">
                    Learn the latest technologies, from coding to cloud, through real-world projects and expert-led courses.
                </div>
                <div>
                    Build skills that actually get you hired — and stay ahead in the ever-evolving tech world.
                </div>
            </div>


            {/* Two Button Components */}
            <div className="flex flex-row justify-center items-center mt-5 pt-5">
                <div className="m-2 p-2">
                    <Button  label={"Learn More"} onClick={() => {}} variant="yellow" ></Button>
                </div>
                <div className="m-2 p-2 hover:cursor">
                    <Button  label={"Book Now"} onClick={() => {}} variant="dark" ></Button>
                </div>
            </div>
            {/* section 2 */}

            {/* Image Section */}
            <div>
                <img src="./assets"></img>
            </div>
            {/* section 3 */}

            {/* Footer */}
        </div>
    )
}