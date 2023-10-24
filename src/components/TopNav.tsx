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
                <div className="flex gap-8">
                    <p className="flex self-center text-xl gap-2">Hello <b className="font-bold text-blue-600">{window.localStorage.getItem("login")}</b> !</p>
                    <button className="flex h-fit w-fit bg-blue-400 p-4 font-bold rounded-full hover:bg-slate-300 duration-150 transition-colors self-center">Connect to drive</button>
                    <button onClick={handleDeconnexion} className="flex h-fit w-fit bg-red-400 p-4 font-bold rounded-full hover:bg-slate-300 duration-150 transition-colors self-center">Logout</button>
                </div>
                :
                null
            }

        </nav>
    )
}

export default TopNav