import React from 'react'

const Footer = () => {
  return (
    <div className='grid w-full min-h-[30vh] py-1 justify-center text-center text-[rgba(255,255,255,0.6)] text-[20px] border-t-2 border-black'>
      <div className='text-[32px] pt-6 font-bold text-white'>
        Noble Dream
      </div>
      <div className=''>
        <div className='h-[1px] w-[200px] bg-white' style={{ marginTop: "-10px"}}></div>
      </div>
      <div className='pl-12'>
        <div className='h-[1px] w-[100px] bg-white' style={{ marginTop: "-10px"}}></div>
      </div>
      <div className='grid pt-1'>
        <a className="hover:text-white" href="store.steampowered.com">Steam Page</a>
      </div>
      <div className='grid'>
        <a className="hover:text-white" href="https://www.patreon.com/">Patreon Page</a>
      </div>
      <div className='grid'>
        <a className="hover:text-white" href="https://www.instagram.com/">Instagram Page</a>
      </div>
    </div>
  )
}

export default Footer