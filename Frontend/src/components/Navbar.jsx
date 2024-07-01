import { navLinks, login } from "../constants";
import { close,menu,logon_active,logon_idle } from "../assets";
import { useState, useEffect } from "react";
import { Login,Profile } from "./";

const Navbar = () => {
  const [id,setId] = useState(() => {
    const storedId = localStorage.getItem('userId');
    return storedId ? storedId : -1});

  useEffect(() => {setId(localStorage.getItem('userId'))}, [localStorage.getItem('userId')])

  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  const loginInstance = Login()
  const profileInstance = Profile(active)
  
  const handleLoginClick = (x) => {
    setToggle(false);
    setActive(x);
    loginInstance.handleCurrentActive(x);
    profileInstance.setCurrentActive(x);
    profileInstance.setCurrentPassToggle(true);
    profileInstance.setPassToggle(true);
  };
  
  const [reRender,setRerender] = useState(window.innerWidth);
  useEffect(()=>{
    setRerender(window.innerWidth)
  },[window.innerWidth])

  return (
      <nav className="z-50 w-full fixed grid grid-flow-row" style={{ marginLeft: "-24px" }}>
        <div className="flex w-full min-h-[50px] py-1 justify-between items-center navbar md:bg-gradient-to-b from-[#181f25] to-[#060c10] bg-transparent" >
          <div className="md:flex hidden min-h-[50px] justify-center items-center xl:w-full w-[80%]" >
            {navLinks.slice(0, 2).map((nav) => (
              <div key={nav.id} className={`font-poppins font-normal cursor-pointer text-[22px] hover:text-[#E8B972] transition-all delay-100 ease-out 
              ${ active === nav.title ? "text-white" : "text-dimWhite"} md:mx-10 mx-3`} onClick={() => handleLoginClick(nav.title)}>
                <a href={`#${nav.id}`}>{nav.title}</a>
              </div>
            ))}
            <div className="grid grid-rows-1 cursor-pointer grid-flow-col sm:mx-1 mx-0 text-poppins font-bold text-[52px]" onClick={() => handleLoginClick("Home")}>
                <div className="text-transparent bg-clip-text bg-gradient-to-tl from-[#EB9C26] to-orange-200 background-animate">
                  Noble
                </div>
                <div className="px-2 text-white ">
                Dream
                </div>
            </div>
            {navLinks.slice(2).map((nav) => (
              <div
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-[22px] hover:text-[#E8B972] transition-all delay-100 ease-out ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } sm:mx-10 mx-3`}
                onClick={() => handleLoginClick(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </div>
            ))}
          </div>
          {/* login and signup images */}
          <div className="md:flex hidden items-center justify-end absolute top-0 right-0 py-[0.6rem] px-12" >
            {parseInt(id) ===-1 ?
              login.map(
                (currentLoginImage) =>
                <a href={`#${currentLoginImage.id}`} className={`mx-1 cursor-pointer ${loginInstance.currentActive===currentLoginImage.id? "bg-[#121517]":"bg-[#070c0e]"} rounded-[2000px]`} onClick={() => handleLoginClick(currentLoginImage.id)}>
                  <img src={loginInstance.currentActive === currentLoginImage.id ? currentLoginImage.active : currentLoginImage.idle} alt={currentLoginImage.id} className="max-h-[64px] min-h-[32px]"/>
                </a>
              )
              :
              <a href={`#logon`} className={`mx-1 cursor-pointer bg-[#121517] rounded-[2000px]`} onClick={profileInstance.currentActive === "alt" ? () => handleLoginClick("a") : () => handleLoginClick("alt")}>
                <img src={active==="alt"? logon_active : logon_idle} alt="logon_icon" className="max-h-[64px] min-h-[32px]"/>
              </a>  
            }
          </div>
          {/* Small screen part */}
          <div className="z-10 items-start md:hidden w-full flex flex-col md:px-0 px-2">
            <div className={`${toggle? profileInstance.currentActive.includes("Profile")? "hidden" : "bg-gradient-to-tr from-[rgba(21,27,33,0.8)] to-[rgba(60,64,57,0.8)] rounded-[20px]": "bg-transparent"} `}>
              <div className="flex justify-end items-center group w-full px-8 cursor-pointer" onClick={loginInstance.currentActive=="login" || loginInstance.currentActive=="signup"? () => setToggle(false) :
                    profileInstance.currentActive.includes("alt") && toggle ? () => handleLoginClick("a"): () => setToggle(!toggle) }>
                <img src={toggle ? close : menu} alt="menu" className={`max-h-[90px] object-contain ${!toggle? "bg-gradient-to-tr from-[rgba(21,27,33,0.8)] to-[rgba(60,64,57,0.8)] rounded-[20px]" : "bg-transparent"}`}/>
              </div>
              <div className="flex items-center justify-center max-w-min">
                <div className={`${!toggle ? "hidden" : "grid"} p-6 top-32 right-0 my-2 min-w-[100px] rounded-xl sidebar max-w-min`}>
                    <ul className="flex justify-center items-center px-2 flex-col max-w-min w-fit">
                      {navLinks.map((nav, index) => (
                          <li key={nav.id}
                          className={`relative font-poppins font-medium cursor-pointer text-[24px] max-w-min w-fit hover:text-[#eaab4e] transition-all delay-100 ease-out  ${active === nav.title ? "text-white" : "text-dimWhite"}
                          ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`} onClick={() => handleLoginClick(nav.title)}>
                            <a href={`#${nav.id}`} className="max-w-min w-fit">{nav.title}</a>
                          </li>
                      ))}
                    </ul>
                    <div className="flex max-w-[120px] w-fit py-3 justify-end right-0">
                      {parseInt(id) ===-1 ?
                        login.map(
                          (currentLoginImage) =>
                          <a href={`#${currentLoginImage.id}`} className={`mx-1 cursor-pointer ${loginInstance.currentActive===currentLoginImage.id? "bg-[#121517]":"bg-[#070c0e]"} rounded-[2000px]`} onClick={() => handleLoginClick(currentLoginImage.id)}>
                            <img src={loginInstance.currentActive === currentLoginImage.id ? currentLoginImage.active : currentLoginImage.idle} alt={currentLoginImage.id} className="max-h-[64px] min-h-[32px]"/>
                          </a>
                        )
                        :
                        <a href={`#logon`} className={`flex justify-end mx-1 cursor-pointer bg-[#121517] rounded-[100%]`} onClick={profileInstance.currentActive === "alt" ? () => {handleLoginClick("a");setToggle(true);} : () => {handleLoginClick("alt");setToggle(true);}}>
                          <img src={active==="alt"? logon_active : logon_idle} alt="logon_icon" className="max-h-[64px] min-h-[32px]"/>
                        </a>  
                      }
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* login Signup Profile part */}
        <div className={`fixed h-[%80] z-20 md:w-[80%] w-[92.5%] md:mx-32 sm:mx-8 mx-4 justify-center items-center`} style={{ marginTop: "100px" }}>
          <div className={profileInstance.currentActive.startsWith("alt")? "" : "hidden"}>
            {profileInstance.render()}
          </div>
          <div className={`${loginInstance.currentActive === "login" || loginInstance.currentActive === "signup" ? "show" : "hidden"} w-full`}>
            {loginInstance.render()}
          </div>
          <div className={`${(loginInstance.currentActive === "login" || loginInstance.currentActive === "signup") || 
                            (!profileInstance.currentActive.endsWith("alt") && profileInstance.currentActive.startsWith("alt") ) ? "" : "hidden"} 
                text-dimWhite hover:text-white absolute top-0 right-0 p-4 cursor-pointer font-semibold text-[30px] transition-all delay-75`}
                onClick={() => {handleLoginClick("a");profileInstance.setKeysPage(false);}}>
            Close
          </div>
        </div>
        
      </nav>
    )
};

export default Navbar;
