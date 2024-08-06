import React, { useEffect, useState } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './NoteList.css';

const NoteList = () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFiles = async (userId) => {
            try {
                const storage = getStorage();
                const listRef = ref(storage, `notes/${userId}`);
                const res = await listAll(listRef);
                const filePromises = res.items.map(async (itemRef) => {
                    const url = await getDownloadURL(itemRef);
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${itemRef.name}: ${response.statusText}`);
                    }
                    const text = await response.text();
                    return { name: itemRef.name, content: text, url };
                });
                const fileContents = await Promise.all(filePromises);
                setFiles(fileContents);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching files: ", error);
                if (error.serverResponse) {
                    console.error("Server response:", error.serverResponse);
                }
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchFiles(user.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="note-list">
            {error && <p className="error">{error}</p>}
            {files.map((file, index) => (
                <div key={index} className="note-item">
                    <h3>{file.name}</h3>
                    <p>{file.content}</p>
                    <a href={file.url} className="download-button" download>Download</a>
                </div>
            ))}
        </div>
    );
};

export default NoteList;