import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './NoteCreator.css';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';

const NoteCreator = () => {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState({
    Work: [{ name: 'Meeting' }, { name: 'Project' }],
    Personal: [{ name: 'Diary' }, { name: 'Goals' }],
  });
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setIsModalOpen(true);
      return;
    }

    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `uploads/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const fileURL = await getDownloadURL(storageRef);

      // Save note details to your database here
      // Example: saveNoteToDatabase({ category, subcategory, content, fileURL });

      setMessage('Note created successfully!');
      navigate('/notes'); // Redirect to notes page
    } catch (error) {
      setMessage(`Error creating note: ${error.message}`);
    }
  };

  return (
    <div className="note-creator">
      <form onSubmit={handleSubmit}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          required
        >
          <option value="">Select Subcategory</option>
          {category && categories[category].map((sub) => (
            <option key={sub.name} value={sub.name}>{sub.name}</option>
          ))}
        </select>
        <textarea
          placeholder="Write your note here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">
          Submit
        </button>
      </form>
      {message && <p className="message">{message}</p>}
      {isModalOpen && <LoginModal onClose={handleCloseModal} onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default NoteCreator;
