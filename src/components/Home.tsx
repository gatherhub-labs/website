//import { useEffect } from 'react'
import Layout from './Layout'
import Message from './Message'
//import { useAppContext } from '../AppContext'
//import { useState } from 'react'

const Home = () => {

    //const { isConnected, setIsConnected } = useAppContext();
    //window.localStorage.getItem("isConnected") === "true" ? setIsConnected(true) : setIsConnected(false)

    if(window.localStorage.getItem("isConnected") !== "true"){
        window.location.href = "/website/"
        return null
    }

/*     type Message = {
        content: string;
        sender: string;
        timestamp: number;
        topic: string;
    }

    type Conversation = {
        topic: string;
        messages: Message[];
    } */

    //const [conversation, setConversations] = useState<Conversation>({topic: "topic", messages: []});

/*     useEffect(() => {
        fetch(new Request("http://localhost:8080/api/request_users_list",{method:"GET"})).then((res)=>res.json()).then((data)=>console.log(data))
    }, []) */


    return(
        <Layout>
            <div className="flex p-4 justify-between flex-col bg-slate-200 place-content-center place-items-center gap-16 w-full overflow-scroll">
                <div className="flex flex-col w-[60%] gap-4">
                    <Message message="Hello julien!" user="user1"/>
                    <Message message="Hello user1" user="julien"/>
                    <Message message="How are you ?" user="julien"/>
                </div>
                <div className="flex w-[50%] p-2 rounded-full bg-slate-300 place-content-center">
                    <input className="flex w-full p-2 rounded-full bg-transparent outline-none border-none" type="text" placeholder="Type message"/>
                    <svg className="flex self-center cursor-pointer hover:scale-125 duration-300 hover:stroke-blue-700 stroke-black" width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path d="M11.5 12H5.419m-.172.797l-1.005 3.001c-.55 1.644-.825 2.466-.628 2.972a1.5 1.5 0 0 0 .994.9c.523.146 1.314-.21 2.895-.921l10.134-4.56c1.543-.694 2.314-1.041 2.553-1.524a1.5 1.5 0 0 0 0-1.33c-.238-.482-1.01-.829-2.553-1.524L7.485 5.243c-1.576-.709-2.364-1.064-2.887-.918a1.5 1.5 0 0 0-.994.897c-.198.505.074 1.325.619 2.966l1.026 3.092.159.567a1.5 1.5 0 0 1 0 .385c-.019.144-.066.285-.16.566z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </Layout>
    )
}

export default Home