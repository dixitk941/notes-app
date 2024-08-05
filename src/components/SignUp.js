// src/components/SignUp.js
import React, { useState } from 'react';
import { auth } from '../firebase';

const SignUp = ({ onSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            onSignUp();
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="signup">
            <h2>Sign Up</h2>
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
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default SignUp;
