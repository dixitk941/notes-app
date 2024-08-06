import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './NoteList.css';

const NoteList = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFiles = async (userId) => {
      try {
        const q = query(collection(db, 'notes'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const filesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFiles(filesData);
      } catch (err) {
        console.error('Error fetching files:', err);
        setError('Error fetching files');
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
          <h3>{file.category} - {file.subcategory}</h3>
          <p>{file.content}</p>
          <a href={file.fileURL} className="download-button" download>Download</a>
        </div>
      ))}
    </div>
  );
};

export default NoteList;