import LeftNav from "./LeftNav";
import TopNav from "./TopNav";

interface LayoutProps {
    children: React.ReactNode;
}


const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col h-screen w-full text-black">
            <TopNav />
            <div className="flex w-full mt-[10vh] h-[90vh]">
                <div className="flex basis-[20%] h-full">
                    <LeftNav />
                </div>
                <div className="flex basis-[80%] h-full w-full">
                    { children }
                </div>
            </div>
        </div>
    );
}

export default Layout;