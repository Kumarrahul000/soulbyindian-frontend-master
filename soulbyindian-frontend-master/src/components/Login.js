
import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import axios from 'axios';










const clientId = "800480683042-qdqo4a9hi5dboglr97e4tvmvab0er1lu.apps.googleusercontent.com";

function Login() {

    const responseSuccessGoogle = (response) => {
        console.log(response);
        axios({
            method: "POST",
            url: "http://localhost:7000/api/googlelogin",
            data: {tokenId: response.tokenId}
        }).then(response => {
            console.log("Google login success" ,response);

        
        })
    }

    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        axios({
            method: "POST",
            url: "http://localhost:7000/api/googlelogin",
            data: {tokenId: res.tokenId}
        }).then(res => {
            console.log("Google login success" ,res);

        
        setShowloginButton(false);
        setShowlogoutButton(true);
       })
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
    };

    return (
        <div>
                    <GoogleLogin
                clientId= "800480683042-qdqo4a9hi5dboglr97e4tvmvab0er1lu.apps.googleusercontent.com"
                buttonText="Log in with Google"
                onSuccess={ onLoginSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}
export default Login;

