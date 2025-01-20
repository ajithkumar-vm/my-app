import React, { use } from "react";
import './MyAccount.css';
import { useEffect, useState } from "react";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

export default function MyAccount() {
    const [user, setUser] = useState(null);
    const [selected, setSelected] = useState('account');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3500/account', {
            method: 'GET',
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            setUser(data.user);
            if (data.redirect) {
                navigate(data.redirect) 
            };
        });
    }, []);
    if(!user) return <div>Loading...</div>;

    function handleSelect(e) {
        setSelected(e.target.innerText.toLowerCase());
    }
    return (
        <>
            <div className="my-account">
                <div className="account-header">
                    <div className="account-logo">PAW PRINTS</div>
                    <div className="account-holder">{user.name}</div>
                </div>
                <div className="account-info">
                    <div className="account-nav">
                        <div className={`side-nav` + (selected === 'account' ? ' selected' : '')} onClick={handleSelect}><img src="images/account.jpg" alt=""/>Account</div>
                        <div className={`side-nav` + (selected === 'orders' ? ' selected' : '')} onClick={handleSelect}><img src="images/order.jpg" alt=""/>Orders</div>
                        <div className={`side-nav` + (selected === 'address' ? ' selected' : '')} onClick={handleSelect}><img src="images/address.avif" alt=""/>Address</div>
                        <div className={`side-nav` + (selected === 'payment' ? ' selected' : '')} onClick={handleSelect}><img src="images/payment.jpg" alt=""/>Payment</div>
                        <Logout />
                    </div>
                    <div className="account-details">
                        <Profile user={user}/>
                    </div>
                </div>
            </div>
        </>
    );
}