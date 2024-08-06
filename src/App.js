// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import NoteCreator from './components/NoteCreator';
import NoteList from './components/NoteList';
import ContactForm from './components/ContactForm';
import LoginModal from './components/LoginModal';

function App() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const handleLoginClick = () => {
        setIsLoginOpen(true);
    };

    const handleCloseLogin = () => {
        setIsLoginOpen(false);
    };

    return (
        <div className="App">
            <Header onLoginClick={handleLoginClick} />
            <main>
                <NoteCreator />
                <NoteList />
                <ContactForm />
            </main>
            <Footer />
            {isLoginOpen && <LoginModal onClose={handleCloseLogin} />}
        </div>
    );
}

export default App;