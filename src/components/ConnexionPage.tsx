import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';

const ConnexionPage = () => {

    const navigate = useNavigate();

    const handleEyeClick = () => {
        if (inputPasswordRef.current?.getAttribute("type") === "password") {
            inputPasswordRef.current.setAttribute("type", "text");
            if(lineRef.current != null){
                lineRef.current.style.display = "block"
            }
            
        } else {
            inputPasswordRef.current.setAttribute("type", "password");
            if(lineRef.current != null){
                lineRef.current.style.display = "none"
            }
        }
    }

/*     const initiateWebsocket = () => {
        // Créer une connexion WebSocket
        const socket = new WebSocket("ws://127.0.0.1:18124");
        // La connexion est ouverte
        socket.addEventListener("open", function (event: any) {
            socket.send("Coucou le serveur !");
        }); 
        // Écouter les messages
        socket.addEventListener("message", function (event) {
            console.log("Voici un message du serveur", event.data);
        });
        // Envoyer un message
        socket.onopen = function (event) {
            socket.send(
              "Coucou from"+window.localStorage.getItem("login"),
            );
          };
    } */



    const handleConnexion = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        if(inputUsernameRef.current.value === ""){
            messageErrorRef.current.innerHTML = "Please enter a username"
            setTimeout(() => {
                messageErrorRef.current.innerHTML = ""
            }
            , 3000)
            return
        }
        if(inputPasswordRef.current.value === ""){
            messageErrorRef.current.innerHTML = "Please enter a password"
            setTimeout(() => {
                messageErrorRef.current.innerHTML = ""
            }
            , 3000)
            return
        }
        window.localStorage.setItem("login", inputUsernameRef.current.value); // To save the login in the local storage
        window.localStorage.setItem("isConnected", "true");
        //initiateWebsocket();
        navigate("/website/home") //this line is to change the page
        //window.localStorage.setItem("tokenJWT", "token")
    }



    const inputPasswordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const inputUsernameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const lineRef = useRef() as React.MutableRefObject<SVGLineElement>;
    const messageErrorRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    if(window.localStorage.getItem("isConnected") === "true"){
        window.location.href = "/website/home"
        return null
    }

    return (
        <div className="flex h-screen w-full place-content-center">
            <TopNav />
            <form onSubmit={handleConnexion} className='flex flex-col w-fit h-fit self-center rounded-sm gap-6 p-6 bg-teal-500'>
                <input ref={inputUsernameRef} type="text" placeholder="Username" className="flex w-full self-center px-1 bg-slate-100 rounded-sm border-none outline-none" />
                <div className="flex self-center px-1 bg-slate-100 rounded-sm border-none outline-none">
                    <input ref={inputPasswordRef} type="password" placeholder="Password" className="flex px-1 bg-transparent border-none outline-none" />
                    <svg onClick={handleEyeClick} className="flex left-0 h-full p-0 stroke-black self-center ml-1 cursor-pointer duration-300 transform ease-in-out" width="24" height="24" viewBox="1.5 1.5 21 21" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" />
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"/>
                        <line ref={lineRef} style={{display : 'none'}} x1="4" y1="4" x2="20" y2="20" />
                    </svg>
                </div>
                <div ref={messageErrorRef} className='text-red-500 font-bold self-center'></div>
                <button className="flex self-center px-1 bg-slate-300 hover:bg-slate-400 rounded-sm duration-150 transition-colors" type="submit">Connexion</button>
            </form>
        </div>
    )
}

export default ConnexionPage