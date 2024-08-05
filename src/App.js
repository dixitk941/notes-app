// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NoteCreator from './components/NoteCreator';
import NoteList from './components/NoteList';
import ContactForm from './components/ContactForm';
import './App.css';

const App = () => {
    const [notes, setNotes] = useState([]);

    const handleSaveNote = (note) => {
        setNotes([...notes, note]);
    };

    return (
        <div className="App">
            <Header />
            <main>
                <NoteCreator onSave={handleSaveNote} />
                <NoteList notes={notes} />
                <ContactForm />
            </main>
            <Footer />
        </div>
    );
};

export default App;
