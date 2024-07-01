import React from 'react'

const Home = () => (
  
  <section id='home' className='grid grid-cols-2: xl:flex xl:flex-row justify-center py-[22rem] w-full '>
    <div className='xl:px-12 px-0 xl:w-1/2 w-full'>
      <div className='flex flex-row xl:px-0 px-3 items-center w-full'>
        <h1 className='text-white text-[72px] hover:text-white text-poppins xl:text-left text-center font-bold group'>
          Welcome To The <br/>Place Where You Feel<br/>
          <div className=" z-0 relative">
            <div className="absolute inset-0 blur text-transparent bg-clip-text bg-gradient-to-r from-[#594DFF] to-white hover:bg-gradient-to-r background-animate">
              The Space And Time.
            </div>
            <span className='relative text-transparent bg-clip-text bg-gradient-to-r from-[#594DFF] to-white hover:bg-gradient-to-r background-animate'>
              The Space And Time.
            </span>
          </div>
        </h1>
      </div>
    </div>
    <div className='px-6 xl:py-0 py-12 xl:w-1/2 w-full'>
      <div className='flex flex-col xl:items-right items-center w-full'>
        <h1 className='text-[32px] xl:text-right text-center text-poppins font-semibold text-white'>
          <a href="" className='hover:text-[#EB9C26] transition-all delay-100 ease-out group'>Try Out Our New Game<br />
          <span className='text-transparent bg-clip-text bg-gradient-to-br from-orange-700 to-orange-300 background-animate'>
            Rift In The Universe</span><br />Now!</a>
        </h1>
      </div>
    </div>
  </section>
)


export default Home