import React from 'react'
import { useState } from 'react';
import { gameContexts } from '../constants'
const Games = () => {
    const gameBgStyle = "rounded-3xl z-0 bg-gradient-to-r hover:from-[#f5bf5a] hover:to-[#FFA904] from-[#6db9f3] to-[#2ba1fb] background-animate text-black text-poppins font-bold text-[22px] px-2 py-2";
    const gameGetKeyStyle = "cursor-pointer rounded-3xl z-0 bg-gradient-to-r from-[#FCFF26] to-[#D8D989] hover:from-[#9326FF] hover:to-[#b189da] background-animate text-black text-poppins font-bold text-[22px] px-2 py-2 hover:text-[#fbff00]";
    const [getKeyPage,setGetKeyPage] = useState("");
    const [keyType,setKeyType] = useState("")
    const [keyCode,setKeyCode] = useState("");

    const handleGetKey = async () => {
        try {
            const id = parseInt(localStorage.getItem('userId'));
            const url = `http://localhost:5033/api/User/GenerateKey?id=${id}&keyType=${keyType}&gameName=${getKeyPage}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
        
              const data = await response.json();
        
              if (response.ok) {
                setKeyCode(data);
              } else {
                alert(data);
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
              alert("Error fetching user data.");
            }
          };

    const handleClose = ()=> {
        setGetKeyPage("")
        setKeyType("")
        setKeyCode("")
    }
    return (
        <div>
            <section id='games' className='h-[1920] w-full flex flex-col columns-2 items-center justify-center py-32'>
                <div className='z-0 relative md:items-center items-start md:px-0 px-16 w-full'>
                    <h1 className='absolute inset-0 md:px-0 px-[64px] blur-[3px] md:text-center text-left text-[72px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EB9C26] to-white background-animate'>
                        Our Games
                    </h1>
                    <h1 className='relative md:text-center text-left text-[72px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f3a025] to-white background-animate'>
                        Our Games
                    </h1>
                </div>
                <div className='grid md:grid-cols-2 grid-cols-1 items-center justify-center w-full'>
                    {gameContexts.map((cGame) =>
                        <div className='grid grid-cols-1 px-6 md:px-10 py-16 group items-center'>
                            <h1 className='flex text-white text-[72px] text-left group-hover:text-orange-400 text-poppins font-semibold transition-all delay-100'>
                                {cGame.name}
                            </h1>
                            <div className='flex px-4 py-5'>
                                {
                                    cGame.state !== "wip" ? (
                                        <div className="flex gap-6 ">
                                            <a href={`https://store.steampowered.com/app/${cGame.appCode}/${cGame.name}`} className={gameBgStyle}>
                                                <div className="absolute blur-[4px] z-10">
                                                    Try Out Now
                                                </div>
                                                <div className='z-20'>
                                                    Try Out Now
                                                </div>
                                            </a>
                                            <a href='#getKey' className={localStorage.getItem('supportTime')>=3? gameGetKeyStyle:"hidden"} onClick={() => setGetKeyPage(cGame.shortName)}>
                                                <div className="absolute blur-[4px] z-10">
                                                    Get A Game Key
                                                </div>
                                                <div className='z-20'>
                                                    Get A Game Key
                                                </div>
                                            </a>
                                        </div>
                                    ) :
                                    (
                                        <div className={gameBgStyle}>
                                            <div className="absolute blur-[4px] z-10">
                                                Work In Progress...
                                            </div>
                                            <div className='z-20'>
                                                Work In Progress...
                                            </div>
                                        </div>
                                    )
                                }
                                
                            </div>
                            <span className='flex py-5 text-gray-400 text-[26px] group-hover:text-white text-poppins font-medium transition-all delay-100'>
                                {cGame.text}
                            </span>
                        </div>
                    )}
                </div>
            </section>
            <div className={getKeyPage !== ""?'flex justify-center':"hidden"}>
                <div className={"fixed top-32 grid-rows-4 grid-cols-1 grid-flow-col bg-secondary md:w-[80%] w-[90%]  z-500 rounded-[25px] min-h-[80vh] justify-center items-center"}>
                    <a href='#games' className='absolute top-0 right-0 text-dimWhite hover:text-white p-4 cursor-pointer font-semibold text-[30px] transition-all delay-75'
                    onClick={handleClose}>
                        Close
                    </a>
                    <div className='text-[24px] text-center pt-24 text-white'>
                        <div className='font-semibold text-red-600'>
                            Get Key Page
                        </div>
                        <div className='flex justify-center gap-8 pt-10 text-[20px] '>
                            <div className={`${getKeyPage==="tdw"?"text-white":"font-normal text-[rgba(255,255,255,0.6)]"} cursor-pointer`} onClick={() => setGetKeyPage("tdw")}>
                                Two Distinct Worlds
                            </div>
                            <div className={`${getKeyPage==="rtu"?"text-white":"font-normal text-[rgba(255,255,255,0.6)]"} cursor-pointer`} onClick={() => setGetKeyPage("rtu")}>
                                Rift In The Universe
                            </div>
                        </div>
                        <div className='font-semibold pt-4'>
                            You can get a discount or game code here.
                        </div>
                        <div className='text-[18px] pt-10'>
                            You have supported us for <span className='text-red-500'>{localStorage.getItem('supportTime')}</span> months. <br/>
                            Note that each game code costs <span className='text-red-500'>9 months</span> and each %30 discount code costs <span className='text-red-500'>3 months</span> of support. 
                        </div>
                        <div className='flex justify-center gap-32 pt-12 text-[20px] text-black font-semibold'>
                            <a className='cursor-pointer bg-gradient-to-r from-[#7fbdec] to-[#36A8FF] hover:from-[#5a9ed2] hover:to-[#137ed0] rounded-[50%] px-3 py-3 background-animate'
                                onClick={() =>setKeyType("discount")}>
                                <div className='absolute blur-[4px]'>
                                    Get An 30%<br/>Discount Code
                                </div>
                                Get An 30%<br/>Discount Code
                            </a>
                            <a className='cursor-pointer bg-gradient-to-r from-[#e28786] to-[#FF3B36] hover:from-[#ce6564] hover:to-[#da1815] rounded-[50%] px-3 py-3 background-animate'
                                onClick={() =>setKeyType("game")}>
                                <div className='absolute blur-[4px]'>
                                    Get A Full<br/>Game Code
                                </div>
                                Get A Full<br/>Game Code
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={keyType !== ""?'flex justify-center items-center':"hidden"}>
                {keyCode===""?
                    <div className={"fixed top-64 bg-[#4A1110] md:w-[30%] w-[50%] z-100 rounded-[25px] min-h-[25vh] justify-center items-center"}>
                        <div className='text-white font-semibold text-[24px] py-6 px-4 flex justify-center text-center'>
                            Are You Certain That You Want To Get{keyType.includes("discount") ? " 30% Discount Code " : " Full Game Code "}for{getKeyPage.includes("tdw") ? " Two Distinct Worlds?" : " Rift In The Universe?"}
                        </div>
                        <div className='flex justify-center gap-10 py-12'>
                            <a className='bg-red-700 md:px-2 px-5 md:py-1 py-2 rounded-[50%] cursor-pointer text-[20px] font-bold' onClick={()=>setKeyType("")}>
                                No
                            </a>
                            <a className=' bg-green-500 md:px-2 px-5 md:py-1 py-2 rounded-[50%] cursor-pointer text-[20px] font-bold' onClick={handleGetKey}>
                                Yes
                            </a>
                        </div>
                    </div>:
                    <div className={"fixed top-64 bg-[#4A1110] md:w-[30%] w-[50%] z-100 rounded-[25px] min-h-[25vh] justify-center items-center"}>
                        <div className='text-white font-semibold text-[24px] py-6 px-4 flex justify-center text-center'>
                            {keyCode.includes("-")?
                            `Here is your ${keyType.includes("discount") ? " 30% Discount Code " : " Full Game Code "}for${getKeyPage.includes("tdw") ? " Two Distinct Worlds:" : " Rift In The Universe:"}`:""}<br/>
                            {keyCode}
                        </div>
                        <a className='flex justify-center text-dimWhite hover:text-white text-center p-4 cursor-pointer font-semibold text-[30px] transition-all delay-75'
                            onClick={()=>{setKeyType("");setKeyCode("");}}>
                            Close
                        </a>
                    </div>
                }
            </div>
        </div>
    )
}

export default Games