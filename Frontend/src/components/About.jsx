import React from 'react'
import { LInP,Rate1,Rate2,MetaCritic } from "./AboutTexts"

const About = () => {
  return (
  <section id='about' className='grid grid-cols-2: md:flex md:flex-row justify-center w-full py-32'>
    <div className='md:px-6 px-32 py-20 md:w-1/2 w-full items-center'>
        <div className='z-0 flex flex-row w-full'>
            <div className="relative">
                <div className="absolute inset-0 blur-[3px] md:text-center text-left text-[72px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EB9C26] to-white background-animate">
                    About Us
                </div>
                <h1 className='relative md:text-center text-left text-[72px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EB9C26] to-white background-animate'>
                    About Us
                </h1>
            </div>
        </div>
    </div>
    <div className='px-6 md:py-0 py-12 md:w-1/2 w-full'>
        <div className='grid md:flex md:flex-row items-start w-full'>
            <h1 className='text-[32px] text-left text-poppins font-semibold text-[rgb(200,200,200)] hover:text-[#EB9C26] group transition-all delay-200 ease-in-out'>
                We are the developer's of Two Distinct Worlds and Rift In The Universe. Our first game Two Distinct Worlds released in 2020, and got <Rate1/>{` `} rate on <MetaCritic/>.
                Our second game Rift In The Universe got released in the first half of 2023 and it also got <Rate2/> rate on <MetaCritic/>.
            </h1>
        </div>
        <div className='md:flex md:flex-row items-start w-full py-16'>
            <h1 className='text-[32px] text-left text-poppins font-semibold text-[rgb(200,200,200)] hover:text-[#EB9C26] group transition-all delay-200 ease-in-out'>
                We are currently working in the development of a new project named <LInP/>. This captivating adventure follows Olivia Grey, a brilliant archaeologist in her 30s, who unexpectedly finds herself entangled in the aftermath of ancient anomalies. Transported back to her 20s by mysterious temporal rifts, Olivia discovers a chance to navigate between the realms of magic and technology, unveiling the consequences of the past two games, 'Two Distinct Worlds' and 'Rift In The Universe'. Embarking on a journey through a contemporary world shaped by the clash of magic and technology, Olivia's youth becomes both a gift and a curse. As she explores the intricacies of her surroundings, players guide her in wielding a unique blend of ancient magic and advanced technology. The anomalies that surround her are not mere chance occurrences; they are intricately linked to the delicate equilibrium between realms.
            </h1>
        </div>
    </div>  
  </section>
  )
}
export default About
