import React from "react";
import { useNavigate } from "react-router-dom";
import './Logout.css';

export default function Logout() {
    const navigate = useNavigate();
    function handleLogout() {
        fetch('http://localhost:3500/logout', {
            method: 'GET',
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.success) {
                navigate('/logout');
            }
        })
    
    }

    return (
        <>
            <div className="logout" onClick={handleLogout}><img src="images/logout.webp" alt=""/>Logout</div>
        </>
    );
}