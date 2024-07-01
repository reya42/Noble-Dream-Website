import React from 'react'
import { supportWays } from '../constants'

const Support = () => {
  return (
    <section id='support' className='flex flex-col columns-2 items-center justify-center py-32 w-full'>
        <div className='z-0 relative md:items-center items-start md:px-0 px-16 w-full'>
            <h1 className='absolute inset-0 md:px-0 px-[64px] blur-[3px] md:text-center text-left text-[72px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EB9C26] to-white background-animate'>
                Support Us
            </h1>
            <h1 className='relative md:text-center text-left text-[72px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EB9C26] to-white background-animate'>
                Support Us
            </h1>
        </div>
        <div className='py-12 md:px-52 px-6 items-center justify-center w-full'>
            <div className='text-white hover:text-orange-400 text-[26px] font-semibold text-center'>
            Thank you for being a part of our journey in crafting immersive worlds and unforgettable experiences.<br />
            Your support is crucial in fueling our passion for game development and storytelling.<br/>
            Here are various ways you can contribute and become a valued member of our community.
            </div>
        </div>
        <div className='grid md:grid-rows-3 grid-rows-6 md:grid-flow-col-dense grid-flow-row gap-6 px-6 justify-center w-full'>
            {
                supportWays.map((currentWay) =>
                <div className={`${currentWay.title === "Financial Contributions" ? ("md:row-span-3 row-span-1"): ("")}
                text-gray-100 grid grid-cols-1 items-center justify-center min-h-[400px] w-full bg-gradient-to-br 
                bg-[#285476] rounded-[25px] hover:bg-[#EB9C26] transition-all ease-in delay-50 duration-300 group`}>
                    <div className='text-[42px] px-6 text-center py-4 group-hover:text-white'>
                        {currentWay.title}
                    </div>
                    <div className={`text-[20px] text-center px-20 group-hover:text-white
                    ${currentWay.title === "Financial Contributions" ? ("py-0"): ("py-4")}
                    `}>
                        {currentWay.text}
                    </div>
                    <div className='flex flex-row justify-center items-center'>
                        {currentWay.links !== null ?
                            (currentWay.links === "contact" ?
                                (
                                    <div className='relative'>
                                        <a href="" id='contact' className='relative to-r px-6 py-2 text-[22px] 
                                        font-semibold hover:bg-[#4DB2FF] rounded-[200px] text-white border-[1px] hover:border-2 border-[rgba(0,0,0,0.5)] hover:border-white bg-orange-400 transition-all ease-in-out delay-50 duration-300'>
                                            Contact Us
                                        </a>
                                    </div>
                                ):
                                    (currentWay.links.map( (currentLink,index) =>
                                    (
                                    
                                    <a href={currentLink}>
                                        <div className='w-[80px] h-[80px] items-center '>
                                            <img src={currentWay.icons[index]} alt={currentWay.icons[index]} className="w-[70px] h-[70px] border-[1px] hover:border-2 border-[rgba(0,0,0,0.5)] hover:border-[#4DB2FF] rounded-[10px] hover:w-[80px] hover:h-[80px]" />
                                        </div>
                                    </a>
                                    )
                                    ))
                                ):
                            (
                                <div></div> // If links are null then there is nothing to display, but we cant leave it empty
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    </section>
  )
}

export default Support