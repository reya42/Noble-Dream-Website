import { useEffect,useState } from "react";
import { pass_hide,pass_show } from "../assets";

const Profile = (parentActive) => {
  const [passToggle,setPassToggle] = useState(true)
  const [currentPassToggle,setCurrentPassToggle] = useState(true)
  const [localStorageVals, setLocalStorageVals] = useState(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedSupportTime = localStorage.getItem('supportTime');
    const storedDoSupports = localStorage.getItem('doSupports');
    const storedIsAdmin = localStorage.getItem('isAdmin');

    if (
      storedUserId === null ||
      storedUsername === null ||
      storedEmail === null ||
      storedSupportTime === null ||
      storedDoSupports === null ||
      storedIsAdmin === null
    ) {
      // Set default values in local storage if not already present
      localStorage.setItem('userId', -1);
      localStorage.setItem('username', '');
      localStorage.setItem('email', '');
      localStorage.setItem('supportTime', 0);
      localStorage.setItem('doSupports', false);
      localStorage.setItem('isAdmin', false);
      };
      return "a";})

  const [keysPage,setKeysPage] = useState(false);
  const [currentActive,setCurrentActive] = useState(parentActive)
  const [reRender,setRerender] = useState(window.innerWidth);
  useEffect(()=>{
    setRerender(window.innerWidth)
  },[window.innerWidth])
  
  const closeAccount = () => {
    localStorage.setItem('userId','-1');
    setCurrentActive("a");
    localStorage.setItem('username',"");
    localStorage.setItem('email',"");
    localStorage.setItem('supportTime',0);
    localStorage.setItem('doSupports',false);
    localStorage.setItem('isAdmin',false);
    setKeysPage(false);
    setMyKeys([])
  }

  const [users, setUsers] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5033/api/User', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const [myKeys, setMyKeys] = useState([]);
  const fetchKeys = async () => {
    try {
      const id = parseInt(localStorage.getItem("userId"));
      const url = `http://localhost:5033/api/User/GetKeys?id=${id}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        if (data !="There is no key to get.") {
          setMyKeys(data);
        }else{
          setMyKeys([])
          console.log(data)
        }
      } else {
        setMyKeys([])
        alert(data);
      }
    } catch (error) {
      setMyKeys([])
      console.error('Error fetching user data:', error);
      alert("Error fetching user data.");
    }
  };
  useEffect(()=> {
    if (localStorage.getItem("userId") !== null && localStorage.getItem("userId") != -1) {
      fetchKeys()
    }
  },[keysPage])
  
  useEffect(() => {
    if (currentActive.includes("admin")) {
      fetchData()
    }
  }, [currentActive]);    //  Current active her değiştiğinde eğer admin içeren bir değere dönüşüyorsa users objesini database'den update eder 

  const [newState,setNewState] = useState("")
  const [currentPassword,setCurrentPassword] = useState("")
  const [whatToUpdate,setWhatToUpdate] = useState("")

  const handleUpdateButtons = (x) =>{
    if(x=="altProfile"){
      setCurrentActive(x)
      setWhatToUpdate("")
      setCurrentPassToggle(true);
      setPassToggle(true);
    }
    else{
      setCurrentActive("altUpdate"+x+"Profile")
      setWhatToUpdate(x)
    }
  }

  const handleFetchKeys = () => {
    if (localStorage.getItem("userId") !== null && localStorage.getItem("userId") != -1) {
      setKeysPage(true);
      fetchKeys();
    }
  }

  const updateEmail = (x)=>{
    localStorage.setItem('email',x)
  }

  const handleUpdate = async () => {
    try {
      const id = parseInt(localStorage.getItem("userId"));
      const url = `http://localhost:5033/api/User/update?id=${id}&whatToUpdate=${whatToUpdate}&newState=${newState}&currentPass=${currentPassword}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        if (whatToUpdate.includes("mail")) {
          updateEmail(newState);
        }
        setCurrentActive("altProfile");
        alert(data);
      } else {
        alert("Update failed. Status: " + response.status + " - " + response.statusText);
      }
    } catch (error) {
      alert("An error occurred during the update: " + error);
    }
  };
  
  const handleUpdateDate = async (idToUpdate) => {
    try {
      const id = parseInt(idToUpdate);
      const url = `http://localhost:5033/api/User/updateDate?id=${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        fetchData()
        alert(data)
      } else {
        alert("Update date failed. Status: " + response.status + " - " + response.statusText);
      }
    } catch (error) {
      alert("An error occurred during the update: " + error);
    }
  };

  const handleToggleSub = async (idToToggle) => {
    try {
      const id = parseInt(idToToggle);
      const url = `http://localhost:5033/api/User/toggle?id=${id}&thingToToggle=DoSupports`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        fetchData()
        console.log(data)
      } else {
        alert("Update date failed. Status: " + response.status + " - " + response.statusText);
      }
    } catch (error) {
      alert("An error occurred during the update: " + error);
    }
  };

  const handleToggleActive = async (idToToggle) => {
    try {
      const id = parseInt(idToToggle);
      const url = `http://localhost:5033/api/User/toggle?id=${id}&thingToToggle=IsActive`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        fetchData()
        console.log(data)
      } else {
        alert("Update date failed. Status: " + response.status + " - " + response.statusText);
      }
    } catch (error) {
      alert("An error occurred during the update: " + error);
    }
  };
  return {
    currentActive,
    setCurrentActive,
    setPassToggle,
    setCurrentPassToggle,
    setKeysPage,
    render : () => (
    <div>
      <div className={`${currentActive.endsWith("alt") && currentActive.startsWith("alt") ? "absolute xl:-right-60 lg:-right-40 md:-right-28 top-0" + (reRender <= 1060 ?" top-44 left-28" : "") : "hidden"}
  py-[0.6rem] px-12 items-center justify-center text-center`}>
        <div className='bg-secondary px-2 py-2 rounded-[25px] text-[rgba(255,255,255,0.6)] text-[18px]'>
          <div className={localStorage.getItem('isAdmin').toString().includes("true") ? "flex flex-row p-2 hover:text-white transition-all delay-100" : "hidden"}>
            <a href="#admin" className="md:flex hidden" onClick={() => setCurrentActive("altAdmin")}>
              Admin Console
            </a>
            <div className="text-[rgba(255,200,200,.8)] md:hidden flex">
              Admin Console Disabled
            </div>
          </div>
          <div className='flex flex-row p-2 hover:text-white transition-all delay-100'>
            <a href="#profile" onClick={() => setCurrentActive("altProfile")}>
              View Profile
            </a>
          </div>
          <div className='flex flex-row p-2 hover:text-white transition-all delay-100'>
            <a href="#closeAccount" onClick={closeAccount}>
              Close Your Account
            </a>
          </div>
        </div>
      </div>
      <div className={currentActive==="alt" ? "hidden" : "grid-rows-4 grid-cols-1 grid-flow-col bg-secondary w-full rounded-[25px] min-h-[80vh] justify-center items-center relative"}>
        {currentActive.toString().endsWith("Profile")?
          <div>
            <div className="flex justify-center items-center pt-16 pb-6 text-center">
              <div className={`px-12 text-[22px] cursor-pointer ${!keysPage?"text-white font-semibold":"text-[rgba(255,255,255,0.6)] hover:text-white font-normal"} `}
                onClick={()=> setKeysPage(false)}>
                Profile
              </div>
              <div className={`px-12 text-[22px] cursor-pointer ${keysPage?"text-white font-semibold":"text-[rgba(255,255,255,0.6)] hover:text-white font-normal"} `}
                onClick={() => handleFetchKeys()}>
                My Keys
              </div>
            </div>
            {keysPage?
              <div>
                <div className="grid text-white font-semibold text-[28px] px-12 pt-4 pb-6 text-center">
                  <span className="text-transparent bg-clip-text bg-gradient-to-tl from-[#eb2626] to-red-300 background-animate">Hello {localStorage.getItem('username')}</span>
                  You can see your steam keys here
                </div>
                {myKeys.length > 0 || myKeys === "There is no key to get." ? 
                  <table className="min-w-full">
                    <thead>
                      <tr className="font-poppins font-semibold text-[18px] text-white">
                        <th>Discount Type</th>
                        <th>Game</th>
                        <th>Key Code</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myKeys.map((myKey, index) => (
                        <tr key={index} className="text-white text-[18px]">
                          <td className="text-center">
                            {myKey.type.includes("discount") ? "30% Discount Code" : "Full Game Code"}
                          </td>
                          <td className="text-center">
                            {myKey.game.includes("tdw") ? "Two Distinct Worlds" : "Rift In The Universe"}
                          </td>
                          <td className="text-center">
                            {myKey.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                </table>
               : <p className="text-center text-white text-[20px] font-semibold pt-12">No keys found on your name.</p>}
              </div>
              :
              <div>
                <div className="grid text-white font-semibold text-[28px] px-12 pt-4 pb-6 text-center">
                  <span className="text-transparent bg-clip-text bg-gradient-to-tl from-[#eb2626] to-red-300 background-animate">Hello {localStorage.getItem('username')}</span>
                  You can see and update your data here
                </div>
                <form className="grid gap-4 px-12 pt-4 md:max-w-[60%] sm:max-w-[70%] max-w-[94%] mx-auto" action="">
                  <label htmlFor="email" className="text-white text-center font-semibold text-[20px]">
                    Email
                  </label>{currentActive.toString().includes("UpdateEmail")? 
                    <input type="text" id="email" name="email" placeholder="Enter your email" onChange={(e) => setNewState(e.target.value)}
                      className="text-center border-2 border-white rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-full"/>
                    :
                    <div className="flex justify-center">
                      <label htmlFor="email" className="text-white text-center font-normal text-[20px]">
                        {localStorage.getItem('email')}
                      </label>
                      <a href="#update" onClick={() => handleUpdateButtons("Email")} className={currentActive.toString().includes("Password")?"hidden":"cursor-pointer"}>
                        <div className={`flex w-fit p-2 mx-2 rounded-[50%] bg-[rgb(0,140,0)] text-white text-[18px]`} >
                          Update
                        </div>
                      </a>
                    </div>
                  }
                </form>
                <form className="grid gap-4 px-12 pt-6 md:max-w-[60%] sm:max-w-[70%] max-w-[94%] mx-auto" action="">
                  <label htmlFor="password" className="text-white text-center font-semibold text-[20px]">
                    Password
                  </label>{currentActive.toString().includes("UpdatePassword")?
                    <div className="flex justify-between items-center gap-1">
                      <input type={passToggle?"password":"text"} id={passToggle?"password":"text"} name="password" placeholder="Enter your password" onChange={(e) => setNewState(e.target.value)}
                      className="text-center border-2 border-white rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-full max-h-[50px]"/>
                      <img src={passToggle?pass_hide:pass_show} onClick={() => setPassToggle(!passToggle)} className="max-h-[32px] cursor-pointer"/>
                    </div>:
                  <div  className="flex justify-center">
                    <label htmlFor="password" className="text-white text-center font-normal text-[20px]">
                      ***********
                    </label>
                    <a href="#update" onClick={() => handleUpdateButtons("Password")} className={currentActive.toString().includes("Email")?"hidden":""} >
                      <div className={`flex w-fit p-2 mx-2 rounded-[50%] bg-[rgb(0,140,0)] text-white text-[18px]`} >
                        Update
                      </div>
                    </a>
                  </div>
                  }
                </form>
                {currentActive.toString().includes("Update")? 
                <div>
                  <form className="grid gap-4 px-12 pt-6 md:max-w-[60%] sm:max-w-[70%] max-w-[94%] mx-auto" action="">
                    <label htmlFor="currentPassword" className="text-white text-center font-semibold text-[20px]">
                      Current Password
                    </label> 
                    <div className="flex  justify-between gap-1">
                      <input type={currentPassToggle?"password":"text"} id="currentPassword" name="currentPassword" placeholder="Enter your current password" onChange={(e) => setCurrentPassword(e.target.value)}
                        className="text-center border-2 border-white rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-full max-h-[50px]"/>
                      <img src={currentPassToggle?pass_hide:pass_show} onClick={() => setCurrentPassToggle(!currentPassToggle)} className="max-h-[32px] cursor-pointer"/>
                    </div>
                  </form>
                  <div className="flex justify-center py-4">
                  <a href="#cancel" onClick={() => handleUpdateButtons("altProfile")}>
                    <div className={`w-fit p-2 mx-2 rounded-[50%] bg-[rgb(140,0,0)] text-white text-[18px]`} >
                      Cancel
                    </div>
                  </a>
                  <a href="#apply" onClick={() => handleUpdate() }>
                    <div className={`w-fit p-2 mx-2 rounded-[50%] bg-[rgb(0,140,0)] text-white text-[18px]`}>
                      Apply
                    </div>
                  </a>
                </div>
                </div>
                :<div>
                  <div className="grid justify-center items-center gap-4 px-12 pt-6 md:max-w-[60%] sm:max-w-[70%] max-w-[94%] mx-auto" action="">
                    <label htmlFor="email" className="text-white text-center font-semibold text-[20px]">
                      You supported us:
                    </label>
                    <label htmlFor="password" className="text-white text-center font-normal text-[20px]">
                      {localStorage.getItem('supportTime')} Months
                    </label>
                  </div>
                  {localStorage.getItem('doSupports')?
                      <div className="grid gap-4 px-12 pt-6 md:max-w-[60%] sm:max-w-[70%] max-w-[94%] mx-auto" action="">
                        <label htmlFor="email" className="text-white text-center font-semibold text-[20px]">
                          You Are Currently Not Supporting Us
                        </label>
                      </div>:
                      <div className="grid gap-4 px-12 pt-6 md:max-w-[60%] sm:max-w-[70%] max-w-[94%] mx-auto" action="">
                        <label htmlFor="email" className="text-transparent bg-clip-text bg-gradient-to-l from-[#eb2626] to-red-300 background-animate text-center font-semibold text-[20px]">
                          You Are Supporting Us
                        </label>
                      </div>
                  }
              </div>
              }
            </div>
              }
          </div>
          
        :
        <div>
          <div className="grid font-semibold text-[28px] px-12 pt-8 pb-6 text-center text-transparent bg-clip-text bg-gradient-to-l from-[#eb2626] to-red-300 background-animate">
            Admin Page
          </div>
          <div className="flex justify-center font-semibold text-[20px] pb-1 text-center text-[#ff0000]">
            Dont forget to update time before toggling subscription!
          </div>
          <div className="text-white md:text-[20px] text-[18px] px-12 pt-6 pb-6 text-center items-center justify-center">
              {users.length > 0 ? (
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Is Admin</th>
                      <th>Support Time</th>
                      <th>Last Update Time</th>
                      <th>Do Supports</th>
                      <th>Is Active</th>
                      <th className="text-green-500">Update Time</th>
                      <th className="text-transparent bg-clip-text bg-[#EB9C26]">Toggle<br/>Subsription</th>
                      <th className="text-red-500">Toggle<br/>Is Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user,index) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        {user.isAdmin ? <td className="text-[rgb(0,200,0)]">Yes</td> : <td className="text-[rgb(200,0,0)]">No</td>}
                        <td>{user.supportTime} Months</td>
                        <td>{new Date(user.lastUpdateDate).toLocaleDateString()}</td> 
                        {user.doSupports ? <td className="text-[rgb(0,200,0)]">Yes</td> : <td className="text-[rgb(200,0,0)]">No</td>}
                        {user.isActive ? <td className="text-[rgb(0,200,0)]">Yes</td> : <td className="text-[rgb(200,0,0)]">No</td>}
                        <td>
                          <a onClick={()=> handleUpdateDate(user.id)}>
                            <div className="rounded-[20px] bg-[rgb(0,200,0)] hover:bg-[rgb(0,255,0)] cursor-pointer">Update</div>
                          </a>
                        </td>
                        <td>
                          <a onClick={() => handleToggleSub(user.id)}>
                            <div className={`${user.doSupports?"hover:bg-[rgb(200,0,0)]":"hover:bg-[rgb(0,200,0)]"} rounded-[20px] bg-[rgb(80,80,80)] cursor-pointer`}>
                              {user.doSupports?"Set False":"Set True"}
                            </div>
                          </a>
                        </td>
                        <td>
                          <a onClick={() => handleToggleActive(user.id)}>
                            <div className={`${user.isActive?"hover:bg-[rgb(200,0,0)]":"hover:bg-[rgb(0,200,0)]"} rounded-[20px] bg-[rgb(80,80,80)] cursor-pointer`}>
                              {user.isActive?"Set False":"Set True"}
                            </div>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No users found in the database.</p>
              )}
            </div>
          <div className="flex justify-end text-end px-16">
            <a className="text-dimWhite hover:text-white cursor-pointer font-semibold text-[20px] transition-all delay-75"  onClick={() => fetchData()}>
              Refresh
            </a>
          </div>
          </div>
        }
      </div> 
    </div>
    )
  }
}

export default Profile