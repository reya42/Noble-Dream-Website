import {Navbar, Home, About, Games, Support, Footer} from "./components"

const App = () => {
  
  
  return (
    <div className="bg-primary w-full overflow-hidden">      
      <div>
        <div className="px-6 flex justify-center items-center">
          <div className="w-full">
            <Navbar/>
          </div>
        </div>
        <div className="bg-primary flex justify-center items-start">
          <div className="w-full">
            <Home />
          </div>
        </div>
        <div className="min-h-screen flex justify-center items-center md:w-full bg-orbitals bg-fixed bg-no-repeat bg-cover"></div>
        <div className="bg-primary flex justify-center items-start">
          <div className="w-full">
            <About />
          </div>
        </div>
        <div className="min-h-screen flex justify-center items-center w-full bg-portal bg-fixed bg-no-repeat bg-cover"></div>
        <div className="bg-primary flex justify-center items-start">
          <div className="w-full">
            <Games />
          </div>
        </div>
        <div className="min-h-screen flex justify-center items-center w-full bg-eternity bg-fixed bg-no-repeat bg-cover"></div>
        <div className="bg-primary flex justify-center items-start">
          <div className="w-full">
            <Support />
          </div>
        </div>
        <div className="bg-[rgb(20,25,32)] flex justify-center items-start">
          <div className="w-full">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
/*

*/