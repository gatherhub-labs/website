import { useEffect, useState } from 'react'


interface MessageProps {
    message: string;
    user: string;
}

const Message = ({ message, user }: MessageProps) => {

    const [sender, setSender] = useState(false);

    useEffect(() => {
        console.log(window.localStorage.getItem("login"))
        if(window.localStorage.getItem("login") === user){
            setSender(true)
        } else {
            setSender(false)
        }
    }
    , [])

    return(
        <div className="flex flex-col w-full">
            <div className="flex flex-col max-w-[70%] w-fit h-fit gap-4 p-4 rounded-lg" style={{backgroundColor: sender ? "#0FF" : "#F0F", placeSelf: sender ? "flex-end" : "flex-start"}}>
                <div className="flex text-lg font-bold">{user}</div>
                <div className="flex text-sm">{message}</div> 
            </div>
        </div>
    )
}

export default Message