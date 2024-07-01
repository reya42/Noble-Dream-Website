import React from 'react'
import { useState } from 'react'
import { pass_hide,pass_show } from "../assets";

const Login = (parentActive) => {
  const [id,setId]=useState(-1)
  const [passToggle,setPassToggle] = useState(true)
  const [currentActive,setCurrentActive] = useState(parentActive)

  const handleCurrentActive = (x)=> {
    setCurrentActive(x);
    setPassToggle(true)
  }

  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5033/api/User/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
            email: "temp email",
          }),
        });

      const data = await response.json();

      if (response.ok && data.id) {
        setId(data.id)
        localStorage.setItem('userId',data.id);
        localStorage.setItem('username',data.username);
        localStorage.setItem('email',data.email);
        localStorage.setItem('supportTime',data.supportTime);
        localStorage.setItem('doSupports',data.doSupports);
        localStorage.setItem('isAdmin',data.isAdmin);
      }
      else {
        alert(data); 
      }
    }
    catch (error) {
      errorText="An error occured during" +x;
      alert(errorText );
    }
  };
  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5033/api/User/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
            email: email,
          }),
        });

      const data = await response.json();

      if (response.ok) {
        alert(data)
        if (data === "Successfully created a new account") {
          handleCurrentActive("login")
        }
      }
      else {
        alert(data); 
      }
    }
    catch (error) {
      alert("An error occured during" +error);
    }
  };

  return {
    currentActive,
    handleCurrentActive,
    render: () =>(
      <div className={`${currentActive === "login" || currentActive === "signup" ? "flex" : "hidden"}`}>
        <div className={`grid-rows-4 grid-cols-1 grid-flow-col bg-secondary w-full rounded-[25px] min-h-[80vh] justify-center items-center relative`}>
        {parseInt(localStorage.getItem('userId'), 10) === -1?
          <div>
            {currentActive === "login" ?
            <div>
              <div className="grid text-white font-semibold text-[32px] px-12 pt-32 pb-6 text-center">
                Welcome back to your account. <br />
                Please enter your information to login to your account.
              </div>
              <form className="grid gap-4 px-12 pt-6 md:max-w-[60%] sm:max-w-[70%] max-w-[94%] mx-auto" action="">
                <label htmlFor="username" className="text-white text-center font-semibold text-[20px]">
                  Username
                </label>
                <input type="text" id="username" name="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)}
                  className="text-center border-2 border-white rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-full"/>
              </form>
              <form className="grid gap-4 px-12 pt-6 md:max-w-[60%] sm:max-w-[70%] max-w-[94%] mx-auto" action="">
                <label htmlFor="password" className="text-white text-center font-semibold text-[20px]">
                  Password
                </label>
                <div className="flex justify-between items-center gap-1">
                    <input type={passToggle?"password":"text"} id="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}
                  className="text-center border-2 border-white rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-full"/>
                    <img src={passToggle?pass_hide:pass_show} onClick={() => setPassToggle(!passToggle)} className="max-h-[32px] cursor-pointer"/>
                  </div>
              </form>
            </div>
            :
            <div>
              <div className="grid text-white font-semibold text-[32px] px-12 pt-32 pb-6 text-center">
                Please enter necessery information to signup.
              </div>
              <form className="grid gap-4 px-12 pt-6 md:max-w-[60%] sm:max-w-[70%] max-w-[94%] mx-auto" action="">
                <label htmlFor="username" className="text-white text-center font-semibold text-[20px]">
                  Username
                </label>
                <input type="text" id="username" name="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)}
                  className="text-center border-2 border-white rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-full"/>
              </form>
              <form className="grid gap-4 px-12 pt-6 md:max-w-[60%] sm:max-w-[70%] max-w-[94%] mx-auto" action="">
                <label htmlFor="password" className="text-white text-center font-semibold text-[20px]">
                  Password
                </label>
                <div className="flex justify-between items-center gap-1">
                    <input type={passToggle?"password":"text"} id="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}
                  className="text-center border-2 border-white rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-full"/>
                    <img src={passToggle?pass_hide:pass_show} onClick={() => setPassToggle(!passToggle)} className="max-h-[32px] cursor-pointer"/>
                  </div>
              </form>
              <form className="grid gap-4 px-12 pt-6 md:max-w-[60%] sm:max-w-[70%] max-w-[94%] mx-auto" action="">
                <label htmlFor="email" className="text-white text-center font-semibold text-[20px]">
                  Email
                </label>
                <input type="text" id="email" name="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}
                  className="text-center border-2 border-white rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-full"/>
              </form>
              
            </div>
            }
            <div className="absolute bottom-12 w-full flex items-center justify-center">
              {/* Button Part */}
              <a href="#login" onClick={currentActive === "login"? handleLogin : () => handleCurrentActive("login")}>
                <div className={`w-fit p-2 mx-2 rounded-[50%] ${currentActive === "login"? "bg-gradient-to-r from-[rgb(0,75,0)] to-[rgb(0,140,0)] background-animate" : "bg-[rgb(75,75,75)] hover:bg-[rgb(100,100,100)]"} text-white text-[20px] font-semibold`} >
                  Login
                </div>
              </a>
              <div className="flex">
              <a href="#signup" onClick={currentActive === 'signup' ? handleRegister : () => handleCurrentActive("signup")}>
                <div
                  className={`w-fit p-2 mx-2 rounded-[50%] ${
                    currentActive === 'signup' ? 'bg-gradient-to-r from-[rgb(0,75,0)] to-[rgb(0,140,0)] background-animate' : 'bg-[rgb(75,75,75)] hover:bg-[rgb(100,100,100)]'} text-white text-[20px] font-semibold`}>
                  Signup
                </div>
              </a>
            </div>
          </div>
        </div>
        :
        <div className='grid text-white font-semibold text-[32px] px-12 pt-32 pb-6 text-center'>
          You have successfully logged in to your account
          Please close this tab to continue
        </div>
        }
      </div>
    </div>
  )}
};

export default Login