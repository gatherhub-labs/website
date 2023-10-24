import { useEffect } from "react"
import { useState } from "react"
//import { useRef } from "react"


const LeftNav = () => {

    const [usersList, setUsersList] = useState<string[]>([])
    const [topicList, setTopicList] = useState<string[]>([])

    const [selectedTopic, setSelectedTopic] = useState<string>("")

    const [topicToBeCreated, setTopicToBeCreated] = useState<string>("")
    const [messageErrorCreateTopic, setMessageErrorCreateTopic] = useState<string>("")

    const [userToBeAskedTopic, setUserToBeAskedTopic] = useState<string>("")
    const [resultListTopicUser, setResultListTopicUser] = useState<string[]>([])

    const [topicToBesuscribed, setTopicToBesuscribed] = useState<string>("")
    const [messageErrorSubscribeTopic, setMessageErrorSubscribeTopic] = useState<string>("")

 


    useEffect(() => {
        fetch(new Request("http://localhost:8080/api/request_users_list",{method:"GET"})).then((res)=>res.json()).then((data)=>{
            console.log(data)
            setUsersList(data)
        });
        fetch(new Request("http://localhost:8080/api/request_topic_list",{method:"GET"})).then((res)=>res.json()).then((data)=>{
            console.log(data)
            setTopicList(data)
            setSelectedTopic(data[0])
        });
    },[]);     

    const createTopic = () => {
        if(topicToBeCreated === ""){
            return
        }
        var mesEntetes = new Headers();
        mesEntetes.append('Content-Type', 'application/json');
        var monInit:RequestInit = { method: 'POST',
                       headers: mesEntetes,
                       body: JSON.stringify({sender: window.localStorage.getItem("login"), content:"", timestamp:Date.now(), topic:topicToBeCreated}),
                       mode: 'cors',
                       cache: 'default' };
        
        var maRequete = new Request('http://localhost:8080/api/create_topic',monInit);
        fetch(maRequete).then((res) => res.json()).then((data) => {
            console.log(data);
            setMessageErrorCreateTopic(data)
          }
        );
    }

    const listTopicUser = () => {
        var mesEntetes = new Headers();
        mesEntetes.append('Content-Type', 'application/json');
        var monInit:RequestInit = { method: 'POST',
                       headers: mesEntetes,
                       body: JSON.stringify({sender: userToBeAskedTopic, content:"", timestamp:Date.now(), topic:""}),
                       mode: 'cors',
                       cache: 'default' };
        
        var maRequete = new Request('http://localhost:8080/api/list_topics_user',monInit);
        fetch(maRequete).then((res) => res.json()).then((data) => {
            console.log(data);
            setResultListTopicUser(data)
          }
        );
    }

    const subscribeTopic = () => {
                var mesEntetes = new Headers();
        mesEntetes.append('Content-Type', 'application/json');
        var monInit:RequestInit = { method: 'POST',
                       headers: mesEntetes,
                       body: JSON.stringify({sender: window.localStorage.getItem("login"), content:"", timestamp:Date.now(), topic:topicToBesuscribed}),
                       mode: 'cors',
                       cache: 'default' };
        
        var maRequete = new Request('http://localhost:8080/api/add_to_topiclist',monInit);
        fetch(maRequete).then((res) => res.json()).then((data) => {
            console.log(data);
            setMessageErrorSubscribeTopic(data)
          }
        );
    }

    return(
        <aside className="fixed bottom-0 left-0 p-4 overflow-scroll flex flex-col h-[90%] w-[20%] z-40 bg-white gap-8 content-center">
            <div className="flex flex-col gap-4 bg-blue-800 rounded-sm p-4">
                <input onChange={(e)=>setUserToBeAskedTopic(e.target.value)} className="flex p-2 bg-slate-200 rounded-sm outline-none border-none" type="text" placeholder="Enter user to get his topics"/>
                <button onClick={listTopicUser} className="flex p-2 bg-slate-200 rounded-sm outline-none border-none w-fit self-center">List topics</button>
                <p className="text-white">{resultListTopicUser}</p>
            </div>
            <div className="flex flex-col gap-4">
                <p>USERS:</p>
                {   
                    usersList.map((user) => {
                        return(
                            <div className="flex p-2 bg-blue-300 rounded-sm cursor-pointer place-content-center hover:bg-slate-400">{user}</div>
                        )
                    })
                }
            </div>
            <div className="flex flex-col gap-4">
                <p>TOPICS:</p>
                {
                    topicList.map((topic) => {
                        return(
                            <div onClick={()=>setSelectedTopic(topic)} className="flex p-2 bg-purple-300 rounded-sm cursor-pointer place-content-center hover:bg-slate-400">{topic}</div>
                        )
                    })
                }
            </div>
            <div className="flex flex-col gap-4 bg-purple-900 rounded-sm p-4">
                <input onChange={(e)=>setTopicToBeCreated(e.target.value)} className="flex p-2 bg-slate-200 rounded-sm outline-none border-none" type="text" placeholder="Create topic"/>
                <button onClick={createTopic} className="flex p-2 bg-slate-200 rounded-sm outline-none border-none w-fit self-center">Create</button>
                <p className="text-white">{messageErrorCreateTopic}</p>
            </div>

            <div className="flex flex-col gap-4 bg-yellow-500 rounded-sm p-4">
                <input onChange={(e)=>setTopicToBesuscribed(e.target.value)} className="flex p-2 bg-slate-200 rounded-sm outline-none border-none" type="text" placeholder="Type the topic you want to subscribe to"/>
                <button onClick={subscribeTopic} className="flex p-2 bg-slate-200 rounded-sm outline-none border-none w-fit self-center">Subscribe</button>
                <p className="text-white">{messageErrorSubscribeTopic}</p>
            </div>

        </aside>
    )
}

export default LeftNav;