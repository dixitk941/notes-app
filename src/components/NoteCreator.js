// src/components/NoteCreator.js
import React, { useState } from 'react';
import { firestore, auth, timestamp } from '../firebase';

const NoteCreator = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSave = async () => {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            await firestore.collection('notes').add({
                userId,
                title,
                content,
                createdAt: timestamp()
            });
            setTitle('');
            setContent('');
        }
    };

    return (
        <div id="create" className="note-creator">
            <h2>Create a Note</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
            ></textarea>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default NoteCreator;
