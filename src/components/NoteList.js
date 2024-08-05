// src/components/NoteList.js
import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../firebase';

const NoteList = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            const unsubscribe = firestore.collection('notes')
                .where('userId', '==', userId)
                .orderBy('createdAt', 'desc')
                .onSnapshot(snapshot => {
                    const fetchedNotes = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setNotes(fetchedNotes);
                });

            return () => unsubscribe();
        }
    }, [auth.currentUser]);

    return (
        <div id="saved" className="note-list">
            <h2>Saved Notes</h2>
            {notes.map(note => (
                <div key={note.id} className="note">
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                </div>
            ))}
        </div>
    );
};

export default NoteList;
