import React from 'react'

const LInP = () => {
  return (
    <span className='text-[#EB9C26] font-bold group-hover:text-[rgb(200,200,200)] transition-all delay-200 ease-in-out'>Living In The Past</span>
  )
}

const Rate1 = () => {
  return (
    <span className='text-[#EB9C26] font-bold group-hover:text-[rgb(200,200,200)] transition-all delay-200 ease-in-out'>9.2/10</span>
  )
}
const Rate2 = () => {
  return (
    <span className='text-[#EB9C26] font-bold group-hover:text-[rgb(200,200,200)] transition-all delay-200 ease-in-out'>9.4/10</span>
  )
}
const MetaCritic = () => {
  return (
    <a href="https://metacritic.com/" className="text-white group-empty hover:text-[#EB9C26] cursor-pointer delay-200 ease-in-out">MetaCritic</a>
  )
}

export {
  LInP,
  Rate1,
  Rate2,
  MetaCritic,
}