// src/components/NoteEditor.js
import React, { useState } from 'react';

const NoteEditor = ({ note, onSave }) => {
    const [title, setTitle] = useState(note?.title || '');
    const [content, setContent] = useState(note?.content || '');

    const handleSave = () => {
        onSave({ ...note, title, content });
    };

    return (
        <div>
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

export default NoteEditor;
