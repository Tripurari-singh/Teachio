import { FaArrowCircleRight } from "react-icons/fa"
import { Button } from "../components/Button"
import { Block } from "../components/BlockComponent"
import Myimage from  "../assets/Image.png"



export const Home = () => {
    return(
        <>
            <div>
                {/* section 1 */}
                {/* A Button Component , Signup Functionality Need to Be Implemented Later On */}

                <div className="relative flex flex-col items-center justify-between mx-auto text-white bg-gray-700 w-50 rounded-full  m-10  cursor-pointer
                hover:bg-slate-900 transition-colors duration-300 border-slate-700  shadow-slate-200 ">
                    <div className="flex items-center justify-between m-2">
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
                        <Button label={"Learn More"} onClick={() => {}} variant="yellow" ></Button>
                    </div>
                    <div className="m-2 p-2 hover:cursor">
                        <Button label={"Book Now"} onClick={() => {}} variant="dark" ></Button>
                    </div>
                </div>

                {/* section 2 */}

                {/* Image Section */}
                

                {/* section 3 */}
                <div className="flex flex-col items-center mt-2 pt-2 border-r-yellow-200 shadow-amber-100">
                    <div className="image-container shadow-2xl shadow-amber-100 rounded-2xl">
                    <img src={Myimage} alt="description" className="h-100 shadow-lg shadow-amber-50 rounded-4xl" ></img>      
                    <div>
                </div>
            </div>
        </div>


            {/* Block Component & Code Component */}
            <div className="flex m-10 p-10">
                <Block
                    HeadingLabel_1="Level up your"
                    HeadingLabel_2="coding skills!"
                    HeadingLabel_3="Learn to code anytime"
                    SubHeadingLine_1="Learn from industry experts, build real-world projects,"
                    SubHeadingLine_2="and gain the confidence to create anything you imagine."
                    SubHeadingLine_3="Start your coding journey today."
                    Button_1_Label="Get Started"
                    Button_2_Label="Learn More"
                    Button_1_varient="yellow"
                    Button_2_varient="dark"
                 />
            </div>



                



                {/* Footer */}
            </div>
        </>
    )
}
