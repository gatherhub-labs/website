import { useEffect, useRef, useState } from 'react'
import Layout from './Layout'
import Message from './Message'


const Home = () => {

    const [messagesList, setMessagesList] = useState<Record<string, unknown>[]>();
    const [messageToBeSent, setMessageToBeSent] = useState<string>("")
    const [sendMessageError, setSendMessageError] = useState<string>("")

    const inputMessage = useRef<HTMLInputElement>(null);

    if(window.localStorage.getItem("isConnected") !== "true"){
        window.location.href = "/website/"
        return null
    }


    const loadConversation = () => {
        if(window.localStorage.getItem("currentTopic") === ""){
            return
        }
        var mesEntetes = new Headers();
        mesEntetes.append('Content-Type', 'application/json');
        var monInit:RequestInit = { method: 'POST',
                       headers: mesEntetes,
                       body: JSON.stringify({sender: window.localStorage.getItem("login"), content:"", timestamp:Date.now(), topic:window.localStorage.getItem("currentTopic")}),
                       mode: 'cors',
                       cache: 'default' };
        
        var maRequete = new Request('http://localhost:8080/api/request_all_messages_topic',monInit);
        fetch(maRequete).then((res) => res.json()).then((data) => {
            console.log("request_all_message_topic",data);
            let newMessageList : Record<string, unknown>[] = [];
            for(let i = 0; i < data.length; i++){
                let message = JSON.parse(data[i]) as Record<string, unknown>;
                newMessageList.push(message);
            }
            //Now we have the list of messages, we have to sort them by timestamp
            newMessageList.sort((a,b) => (a.timestamp as number) - (b.timestamp as number));
            setMessagesList(newMessageList)
          }
        );
    }

    const sendMessage = () => {
        var mesEntetes = new Headers();
        mesEntetes.append('Content-Type', 'application/json');
        var monInit:RequestInit = { method: 'POST',
                       headers: mesEntetes,
                       body: JSON.stringify({sender: window.localStorage.getItem("login"), content:messageToBeSent, timestamp:Date.now(), topic:window.localStorage.getItem("currentTopic")}),
                       mode: 'cors',
                       cache: 'default' };
        
        var maRequete = new Request('http://localhost:8080/api/send_to_topic',monInit);
        fetch(maRequete).then((res) => res.json()).then((data) => {
            setSendMessageError(data);
            let message = JSON.parse(JSON.stringify({sender: window.localStorage.getItem("login"), content:messageToBeSent, timestamp:Date.now(), topic:window.localStorage.getItem("currentTopic")}));
            let newMessageList = [...(messagesList ?? []), message];
            setMessagesList(newMessageList);
          }
        );
    }

    document.addEventListener('keydown', (event) => {
        if(event.key === 'Enter' && inputMessage.current != null && document.activeElement === inputMessage.current) {
            sendMessage()
        }
    }
    );

    useEffect(() => {
        loadConversation()
    }
    ,[]);

    return(
        <Layout>
            <div className="flex justify-between flex-col bg-slate-200 place-content-center place-items-center gap-16 w-full overflow-scroll">
                <div className="top-0 sticky p-4 flex w-full place-content-center gap-8 bg-blue-200">
                    <input onChange={(e)=>window.localStorage.setItem("currentTopic", e.target.value)} className="flex p-2 bg-blue-400 rounded-sm border-none placeholder-black placeholder-opacity-60" type="text" placeholder="Enter topic"/>
                    <button onClick={loadConversation} className="flex h-fit w-fit bg-blue-600 p-4 font-bold rounded-full hover:bg-slate-300 duration-150 transition-colors self-center">Load this topic conversation</button>
                    <div className="flex self-center gap-2 text-xl">Current topic: <b className="font-bold">{window.localStorage.getItem("currentTopic")}</b></div>
                </div>
                <div className="flex flex-col w-[60%] gap-4 p-8">
                    {
                        messagesList?.map((message, index) => {
                            return <Message key={index} sender={message.sender as string} content={message.content as string} timestamp={message.timestamp as number} topic={message.topic as string}/>
                        })
                    }
                </div>
                <div className="flex flex-col bottom-0 sticky p-4 w-full place-content-center bg-slate-200">
                    <div className="flex w-[50%] p-2 rounded-full bg-slate-300 place-self-center">
                        <input ref={inputMessage} onChange={(e)=>setMessageToBeSent(e.target.value)} className="flex w-full p-2 rounded-full bg-transparent outline-none border-none" type="text" placeholder="Type message"/>
                        <svg onClick={()=>{sendMessage();if(inputMessage.current!=null){inputMessage.current.value=""}}} className="flex self-center cursor-pointer hover:scale-125 duration-300 hover:stroke-blue-700 stroke-black" width="30" height="30" viewBox="0 0 24 24" fill="none">
                            <path d="M11.5 12H5.419m-.172.797l-1.005 3.001c-.55 1.644-.825 2.466-.628 2.972a1.5 1.5 0 0 0 .994.9c.523.146 1.314-.21 2.895-.921l10.134-4.56c1.543-.694 2.314-1.041 2.553-1.524a1.5 1.5 0 0 0 0-1.33c-.238-.482-1.01-.829-2.553-1.524L7.485 5.243c-1.576-.709-2.364-1.064-2.887-.918a1.5 1.5 0 0 0-.994.897c-.198.505.074 1.325.619 2.966l1.026 3.092.159.567a1.5 1.5 0 0 1 0 .385c-.019.144-.066.285-.16.566z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="flex text-red-600 self-center">{sendMessageError}</div>
                </div>

            </div>
        </Layout>
    )
}

export default Home