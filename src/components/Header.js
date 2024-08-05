// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>NotesApp</h1>
            </div>
            <nav className="nav">
                <a href="#create">Create a Note</a>
                <a href="#saved">Saved Notes</a>
                <a href="#login">Login</a>
            </nav>
        </header>
    );
};

export default Header;
