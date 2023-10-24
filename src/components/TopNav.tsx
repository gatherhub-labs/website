//import { useAppContext } from "../AppContext"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

const TopNav = () => {

    //const { isConnected, setIsConnected, login, setLogin } = useAppContext();
    const modaleLoginRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const navigate = useNavigate();

    const handleClickProfile = () => {
        if(modaleLoginRef.current != null){
            if(modaleLoginRef.current.style.display === "flex"){
                modaleLoginRef.current.style.display = "none"
            } else {
                modaleLoginRef.current.style.display = "flex"
            }
        }
    }


    const handleDeconnexion = () => {
        window.localStorage.removeItem("login")
        window.localStorage.removeItem("isConnected")
        window.localStorage.removeItem("tokenJWT")
        navigate("/website/")
    }


    return (
        <nav className="fixed flex p-4 top-0 w-full z-50 justify-between bg-slate-200 drop-shadow-md bg-opacity-30 backdrop-blur-md content-center">
            <a className="w-fit h-fit no-underline flex place-self-center hover:scale-110 duration-150" href="/website/">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12a9.96 9.96 0 0 0 1.331 4.988c.172.299.202.663.057.976l-.854 1.837A1.5 1.5 0 0 0 3.862 22H12c5.523 0 10-4.477 10-10S17.523 2 12 2zM8 13.3a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 1 0 0 2.6zm8 0a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 1 0 0 2.6zm-4 0a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 1 0 0 2.6z" fill="#00F"/>
                </svg>
            </a>
            {
                window.localStorage.getItem("isConnected") === "true" ?
                
                <svg onClick={handleClickProfile} className="flex self-center rounded-full p-2 cursor-pointer bg-slate-300 hover:bg-teal-400" width="40" height="40" viewBox="-5 -5 30 30" >
                    <path d="M10 10c-2.217 0-4.019-1.794-4.019-4S7.783 2 10 2s4.019 1.794 4.019 4-1.803 4-4.019 4m3.776.673C15.37 9.396 16.3 7.331 15.958 5.07 15.561 2.447 13.369.348 10.722.042 7.07-.381 3.971 2.449 3.971 6c0 1.89.88 3.574 2.253 4.673C2.852 11.934.39 14.895.005 18.891-.052 19.482.412 20 1.008 20a.99.99 0 0 0 .993-.891C2.404 14.646 5.837 12 10 12s7.596 2.646 7.999 7.109a.99.99 0 0 0 .993.891c.597 0 1.06-.518 1.004-1.109-.386-3.996-2.847-6.957-6.219-8.218" fillRule="evenodd"/>
                </svg>

                :
                null
            }
            <div ref={modaleLoginRef} className="hidden flex-col absolute p-4 gap-4 right-2 top-24 rounded-sm bg-teal-400">
                <p>Hello {window.localStorage.getItem("login")} !</p>
                <button onClick={handleDeconnexion} className="flex p-1 h-fit w-fit bg-slate-200 hover:bg-slate-300 duration-150 transition-colors rounded-sm self-center">Logout</button>
            </div>
        </nav>
    )
}

export default TopNav