
import { FaArrowCircleRight } from "react-icons/fa"
import { Button } from "../components/Button"
import { Block } from "../components/BlockComponent"
//@ts-ignore
import CodeImage from "../assets/Code.png"
//@ts-ignore
import InstructotImage from "../assets/Instructor.png"
import { CodeDemo } from "@/components/CodeAnimationShadcn"
import { HighlightedText } from "@/components/HighlightedTextComponent"
import { ArrowButton } from "@/components/ArrowButtonComponent"
import { SubHeading } from "@/components/SubHeadingComponent"
import { FeatureComponent } from "@/components/FeaturesComponent"

import { BsPersonAdd } from "react-icons/bs";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { MdOutlineSchedule } from "react-icons/md";
import { FaCode } from "react-icons/fa";
import { RiUserCommunityFill } from "react-icons/ri";
import { MdAccessAlarm } from "react-icons/md";
import { InfiniteMovingCardsDemo } from "@/components/InfiniteMovingCardsDemo"
import { WobbleCardDemo } from "@/components/WobbleCardComponent"
import AnimatedWaveFooter from "@/components/common/Footer"






export const Home = () => {
    return (
        <>
           <div className="overflow-x-hidden w-full ">
                  <div className="relative h-full w-full">
                <div className="relative z-10">
                    {/* All your other components go here, completely unchanged */}
                
                {/* section 1 */}
                {/* Block Component & Code Component */}
            <div className="flex justify-around m-10 p-20">
                <div className="mr-10 pr-10">
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
                {/* Code Animation Component */}
                <div className="ml-10 pl-10 p-10 shadow-slate-600 shadow-2xl ">
                    <CodeDemo
                        duration={18000} // how long typing lasts (seconds)
                        delay={1200} // delay before typing starts
                        writing={true} // enables typing animation
                        cursor={true} // shows blinking cursor
                    />
                </div>
             </div>


             <div className="flex items-center justify-center m-10 rounded-b-2xl">
                 <div className="mr-10 pr-10 p-10 shadow-slate-600 shadow-2xl ">
                    <CodeDemo
                        duration={18000} // how long typing lasts (seconds)
                        delay={1200} // delay before typing starts
                        writing={true} // enables typing animation
                        cursor={true} // shows blinking cursor
                    />    
                 </div>
                 <div className="ml-20 pl-20 p-10">
                    
                <Block
                        HeadingLabel_1="Unlock your"
                        HeadingLabel_2="potential with AI"
                        HeadingLabel_3="Master AIML !"
                        SubHeadingLine_1="Dive into machine learning, deep neural networks,"
                        SubHeadingLine_2="and cutting-edge data science techniques."
                        SubHeadingLine_3="Transform raw data into powerful insights now."
                        Button_1_Label="Enroll Today"
                        Button_2_Label="View Courses"
                        Button_1_varient="yellow"
                        Button_2_varient="dark"
                    />
              </div>
             </div>

                </div>
            </div> 
            



            {/* Section - 2 */}
            <div className="bg-gradient-to-b from-black via-gray-500 to-white h-ful w-full ">
               <div className=" mt-20 w-full h-full flex flex-row ml-20">
                    <div className="mt-40 mr-auto ml-10 ">
                        <HighlightedText HeadingLabel_1="Get the skills you need"  HeadingLabel_2=" For a Job" HeadingLabel_3="that is in Demand" />
                    </div>
                    <div className="flex flex-col m-10 mt-40">
                            <SubHeading
                            SubHeadingLine_1="Learn smarter with Teachio — your gateway to expert-led online courses."
                            SubHeadingLine_2="Master new skills at your own pace, anytime, anywhere."
                            SubHeadingLine_3="Empower your future through learning that fits your life."
                            />
                            <div className="mr-150">
                                <ArrowButton label={"Learn More"} onClick={() => {}} />
                            </div>
                    </div>
               </div>

               {/* Features & FeatureImage Components */}
               <div className="mt-20 mr-5 flex flex-row pb-40">
                <div className=" ml-25 mr-5 flex flex-col gap-5 m-5 p-5 rounded-2xl ">
                    <FeatureComponent
                        Heading_1="Expert Teachers"
                        Heading_2="Learn from the best minds in the industry."
                        Icon={<BsPersonAdd />}
                    />
                    <FeatureComponent
                        Heading_1="Certified Learning"
                        Heading_2="Get recognized certifications to boost your career."
                        Icon={<AiFillSafetyCertificate />}
                    />
                    <FeatureComponent
                        Heading_1="Flexible Schedule"
                        Heading_2="Learn at your own pace, anytime, anywhere."
                        Icon={<MdOutlineSchedule />}
                    />
                    <FeatureComponent
                        Heading_1="Practical Projects"
                        Heading_2="Apply your knowledge with hands-on projects."
                        Icon={<FaCode />}
                    />
                    <FeatureComponent
                        Heading_1="Community Support"
                        Heading_2="Join a thriving community of learners."
                        Icon={<RiUserCommunityFill />}
                    />
                    <FeatureComponent
                        Heading_1="Lifetime Access"
                        Heading_2="Access courses forever and revisit anytime."
                        Icon={<MdAccessAlarm />}
                    />
                    </div>                  
                    
                    {/* <FeatureImageComponent/> */}
                    
                        <div className="ml-20 flex items-center justify-stretch rounded-2xl ">
                            <img className="shadow-slate-700 shadow-2xl bg-gradient-to-br" src={CodeImage}></img>
                            {/* Green Block OverLap Component */}
                            <div className="bg-green-900 text-white absolute flex flex-row items-center p-10
                              left-[50%] translate-40 translate-y-60" >
                                <div className="flex flex-row items-center gap-5">
                                    <p className="text-3xl font-bold">10</p>
                                    <p className="text-green-400 text-sm"> Years Of Experience</p>
                                </div>
                                <div className="flex flex-row items-center gap-5 px-4">
                                    <p className="text-3xl font-bold pr-5">|</p>
                                    <p className="text-3xl font-bold">250</p>
                                    <p className="text-green-400 text-sm">Types Of Courses</p>
                                </div>
                            </div>
                        </div>
                    

                    
               </div>
            </div> 


            {/*    Become an Instructur Section */}

                    <div className="flex flex-row ">
                       <div className="flex items-center justify-center m-10 p-10 ">
                                {/* Image */}
                                <img className="w-150 shadow-2xl shadow-slate-600" src={InstructotImage}></img>
                       </div>   
                       <div className="flex items-center justify-center ml-20 pl-20">
                            <Block
                                    HeadingLabel_1="Become an"
                                    HeadingLabel_2="Instructor"
                                    HeadingLabel_3="Today"
                                    SubHeadingLine_1="Share your knowledge with thousands of learners"
                                    SubHeadingLine_2="Create and publish your own course with ease"
                                    SubHeadingLine_3="Earn passive income while teaching online"
                                    Button_1_Label="Start Teaching"
                                    Button_2_Label="Learn More"
                                    Button_1_varient="yellow"
                                    Button_2_varient="dark"
                                />
                        </div>
                    </div>    
                    
                    {/* WobbleCard Section */}
                    <div className="mt-50">
                        <WobbleCardDemo/>
                    </div>

                    {/* Reviews Section */}
                    <div className="bg-black mt-30">
                        <div className="flex items-center justify-center mt-30">
                            <div className="mt-30 rounded-4xl shadow-2xl shadow-slate-500 m-20 px-6">
                                <HighlightedText
                                HeadingLabel_1="Review from"
                                HeadingLabel_2="our Users"
                                />
                            </div>
                        </div>
                        <div className="dark">
                           <InfiniteMovingCardsDemo/>    
                        </div>    
                    </div>   

                    {/* Footer    */}
                     
                    <div className="bg-gradient-to-b from-white via-slate-950 to-blackk">
                        <div className="">
                          <AnimatedWaveFooter/>
                        </div>
                    </div>
           </div>
            
        </>
    )
}