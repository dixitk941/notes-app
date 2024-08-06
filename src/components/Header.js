import React, { useState } from 'react';
import LoginModal from './LoginModal';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './Header.css';

const Header = ({ toggleSignUp }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const toggleLogin = () => {
        if (isLoggedIn) {
            handleLogout();
        } else {
            setIsLoginModalOpen(!isLoginModalOpen);
        }
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setIsLoginModalOpen(false);
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
                    <button onClick={toggleLogin} disabled={loading}>
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