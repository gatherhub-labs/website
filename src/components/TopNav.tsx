import { useNavigate } from "react-router-dom"
import GoogleLoginButton from "./GoogleLoginButton";

const TopNav = () => {

    const navigate = useNavigate();


    const handleDeconnexion = () => {
        window.localStorage.removeItem("login")
        window.localStorage.removeItem("isConnected")
        window.localStorage.removeItem("tokenJWT")
        navigate("/website/")
    }


    return (
        <nav className="fixed flex p-4 top-0 w-full h-[10%] z-50 justify-between bg-slate-200 drop-shadow-md bg-opacity-30 backdrop-blur-md content-center">
            <a className="w-fit h-fit no-underline flex place-self-center hover:scale-110 duration-150" href="/website/">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12a9.96 9.96 0 0 0 1.331 4.988c.172.299.202.663.057.976l-.854 1.837A1.5 1.5 0 0 0 3.862 22H12c5.523 0 10-4.477 10-10S17.523 2 12 2zM8 13.3a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 1 0 0 2.6zm8 0a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 1 0 0 2.6zm-4 0a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 1 0 0 2.6z" fill="#00F"/>
                </svg>
            </a>
            
            {
                window.localStorage.getItem("isConnected") === "true" ?
                <div className="flex gap-8">
                    <p className="flex self-center text-xl gap-2">Hello <b className="font-bold text-blue-600">{window.localStorage.getItem("login")}</b> !</p>
                    <GoogleLoginButton />
                    <button onClick={handleDeconnexion} className="flex h-fit w-fit bg-red-400 p-4 font-bold rounded-full hover:bg-slate-300 duration-150 transition-colors self-center">Logout</button>
                </div>
                :
                null
            }

        </nav>
    )
}

export default TopNav