interface MessageProps {
    sender: string;
    content: string;
    timestamp: number;
    topic: string;
}

const Message = ({ sender, content, timestamp, topic }: MessageProps) => {


    return(
        <div className="flex flex-col w-full">
            <div className="flex flex-col max-w-[70%] w-fit h-fit gap-4 p-4 rounded-lg" style={{backgroundColor: (window.localStorage.getItem("login") === sender) ? "#0FF" : "#F0F", placeSelf: (window.localStorage.getItem("login") === sender) ? "flex-end" : "flex-start"}}>
                <div className="flex text-lg font-bold">{sender}</div>
                <div className="flex text-md">{content}</div> 
                <div className="flex text-blue-500 text-md gap-2">
                    <div className="flex-grow self-center">{topic}</div>
                    <div className="flex text-xs self-center">{new Date(timestamp).toLocaleString()}</div>
                </div>
            </div>
        </div>
    )
}

export default Message