import React from 'react'
import './Login.css'
import "@fontsource/luckiest-guy";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({className}) {
    const [isLogin, setIsLogin] = useState(true);
    const [isError, setIsError] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        gender: '',
        name: '',
        phone: '',
        'confirm-password': ''
    });
    const navigate = useNavigate();

    function handleClick() {
        setIsLogin(!isLogin);
    }
    function handleSubmit(e) {
        e.preventDefault();
        const errors = validateForm(formData);
        if(Object.keys(errors).length > 0) {
            setIsError(errors);
            return;
        } else {
            setIsError({});
        }
        isLogin ? loginCustomer()
        .then((res) => res.json())
        .then((data) => {
            if(data.error && !data.isInternalError) {
                setIsError({unVerifiedUser: data.message});
            }
            else {
                navigate('/account');
            }
        }) :
        registerCustomer()
        .then((res) => res.json())
        .then((data) => {
            if(data.error && !data.isInternalError) {
                setIsError({alreadyExists: data.message});
            }
            else {
                navigate('/account');
            }
        });
    }
    function registerCustomer() {
       const response = fetch('http://localhost:3500/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });
        return response;
    }

    function loginCustomer() {
        const response = fetch('http://localhost:3500/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });
        return response;
    }
    function validateForm(formData) {
        const error ={};
        if(formData.email === '') {
            error.email = 'Email is required';
        }
        else if(!formData.email.includes('@')) {
            error.email = 'Invalid Email/Username';
        }
        if(formData.password === '') {
            error.password = 'Password is required';
        }
        else if(formData.password.length < 8) {
            error.password = 'Password must be at least 8 characters';
        }
        if(!isLogin && formData.gender === '') {
            error.gender = 'Please select a gender';
        }
        if(!isLogin && formData.name === '') {
            error.name = 'Name is required';
        }
        if(!isLogin && formData.phone === '') {
            error.phone = 'Phone number is required';
        }
        else if(!isLogin && formData.phone.length < 10) {
            error.phone = 'Invalid Phone number';
        }
        if(!isLogin && formData['confirm-password'] !== formData.password) {
            error['confirm-password'] = 'Passwords do not match';

        }
        return error;
    }
    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    return (
        <>
        <div className={`login ` + className}>
            <div className="login-form">
                { isLogin ? 
                    (<h1>Welcome Back</h1>) : 
                    (<h1>Come on, Join us</h1>)
                }
                <form onSubmit={handleSubmit}>
                    {isLogin ? '' : 
                    <>
                        <div className='input-name input-field'>
                            <input type="text" name='name' placeholder="Name" onChange={handleChange} value={formData.name} />
                            {isError.name ? <div className="select-name-error error">{isError.name}</div> : ''}
                        </div>
                        <div className='input-gender select-field'>
                            <select name='gender' onChange={handleChange} value={formData.gender}>
                                <option value=''>Select Gender</option>
                                <option value='M'>Male</option>
                                <option value='F'>Female</option>
                                <option value='O'>Other</option>
                                <option value='N'>Prefer not to say</option>
                            </select>
                            {isError.gender ? <div className="select-gender-error error">{isError.gender}</div> : ''}
                        </div>
                    </>
                    }
                    <div className='input-username input-field'>
                        <input type="text" name='email' placeholder="Email/Username" value={formData.email} onChange={handleChange} />
                        {isError.email ? <div className='input-username-error error'>{isError.email}</div> : ''}
                    </div>
                    {isLogin ? '' : (
                    <div className='input-phone input-field'>
                        <input type="tel" name='phone' placeholder="Phone no" value={formData.phone} onChange={handleChange}/>
                        {isError.phone ? <div className="select-phone-error error">{isError.phone}</div> : ''}
                    </div>
                    )}
                    <div className='input-password input-field'>
                        <input type="password" name='password' placeholder="Password" value={formData.password} onChange={handleChange} />
                        {isError.password ? <div className='input-password-error error'>{isError.password}</div> : ''}
                    </div>
                    {isLogin ? '' : (
                        <div className='input-confirm-password input-field'>
                            <input type="password" name='confirm-password' placeholder="Re-enter password" onChange={handleChange} value={formData['confirm-password']} />
                            {isError['confirm-password'] ? <div className="select-name-error error">{isError['confirm-password']}</div> : ''}
                        </div>
                    )}
                    { isLogin ?
                    (<div className='dont-have-account'>
                        Don't have an account? <span className='sign-up-text' onClick={handleClick}>Sign up</span>
                    </div>) : 
                    (<div className='have-account'>
                        Already have an account ? <span className='sign-in-text' onClick={handleClick}>Sign In</span>
                    </div>)
                    }
                    <div className='login-button'>
                        <button type="submit">{isLogin ? 'Login' : 'Create an Account'}</button>
                    </div>
                    {isError.alreadyExists ? <div className='input-password-error error'>{isError.alreadyExists}</div> : ''}
                    {isError.unVerifiedUser ? <div className='input-password-error error'>{isError.unVerifiedUser}</div> : ''}
                </form>
            </div>
        </div>
        </>
    );
}