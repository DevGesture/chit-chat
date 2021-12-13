import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topar/Topbar";
import "./home.css";

export default function Home() {
    return (
        <>
            <Topbar />
            <div className="home">
                <Sidebar />
                <Feed />
                <Rightbar />
            </div>
        </>
    )
}
