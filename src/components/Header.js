import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import './Header.css';
import LoginModal from './LoginModal';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const toggleLogin = () => {
        setIsLoginModalOpen(!isLoginModalOpen);
    };

    const handleLoginSuccess = () => {
        setIsLoginModalOpen(false);
        setIsLoggedIn(true);
    };

    const handleLogout = async () => {
        setLoading(true);
        setError('');
        try {
            await signOut(auth);
            setIsLoggedIn(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <header className="header">
            <h1>GenZ-Notes</h1>
            <nav>
                {isLoggedIn ? (
                    <button onClick={handleLogout} disabled={loading}>
                        {loading ? 'Logging out...' : <><i className="fas fa-sign-out-alt"></i> Logout</>}
                    </button>
                ) : (
                    <button onClick={toggleLogin}>
                        <i className="fas fa-sign-in-alt"></i> Login
                    </button>
                )}
                {/* <button onClick={toggleSignUp}><i className="fas fa-user-plus"></i> Sign Up</button> */}
            </nav>
            {isLoginModalOpen && <LoginModal onClose={toggleLogin} onLoginSuccess={handleLoginSuccess} />}
            {error && <p className="error">{error}</p>}
        </header>
    );
};

export default Header;