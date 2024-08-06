import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
// import User from './components/User';
import Hero from './components/Hero';
import NoteCreator from './components/NoteCreator';
import NoteList from './components/NoteList';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
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
            {/* <Routes>
                <Route path="/user" element={<User />} />
                Add other routes here 
            </Routes> */}
            <main>
                <Hero />
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