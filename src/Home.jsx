import Navbar from "./Nav.jsx";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function Home(){
    const location = useLocation();
    const userData = location.state;

    return(
        <div style={{ minHeight: '100vh', width: '100%', margin: 0, padding: 0 }}>
            <Navbar 
                email = {userData.email}
            />
            <div style={{ paddingTop: '60px' }}>
                <Outlet />
            </div>
        </div>
    )
}