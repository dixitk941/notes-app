// src/components/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            onLogin();
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
