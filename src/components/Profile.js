import React from "react";
import './Profile.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ user }) {
    const [profilePicURL, setProfilePicURL] = useState(null);
    const [pic, setPic] = useState(null);
    const navigate = useNavigate();

    function handleChange(e) {
        setProfilePicURL(URL.createObjectURL(e.target.files[0]));
        const imageFile = new FormData();
        imageFile.append('image', e.target.files[0]);
        fetch('http://localhost:3500/uploadPhoto', {
            method: 'POST',
            credentials: 'include',
            body: imageFile
        })
    }

    useEffect(() => {
        fetch('http://localhost:3500/getPic', {
            method: 'GET',
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.redirect) {
                navigate(data.redirect) 
            };
            setPic(data.image);
        });
    }, []);

    return (
        <>
            <div className="profile">
                <div className="profile-header">Profile</div>
                <div className="profile-sub-header">
                    Profile picture
                </div>
                <form className="profile-pic-form">
                    <img src={profilePicURL ? profilePicURL : pic ? `http://localhost:3500/profile_pics/${pic}` : `images/avatar.jpg`} alt="" className="profile-pic"/>
                    <input type="file" id="profile-pic" name="profile-pic" accept="image/*" onChange={handleChange}/>
                    <label htmlFor="profile-pic">Upload picture</label>
                </form>
            </div>
        </>
    );
}