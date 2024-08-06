import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './NoteCreator.css';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal'; // Import the LoginModal component

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
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginRedirect = () => {
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setShowModal(true);
      return;
    }

    try {
      const storage = getStorage();
      let fileURL = '';

      if (file) {
        const storageRef = ref(storage, `uploads/${file.name}`);
        await uploadBytes(storageRef, file);
        fileURL = await getDownloadURL(storageRef);
      }

      // Save note data along with fileURL if available
      const noteData = {
        category,
        subcategory,
        content,
        fileURL,
      };

      // Save noteData to your database
      console.log('Note saved:', noteData);
      setMessage('Note saved successfully!');
    } catch (error) {
      console.error('Error saving note:', error);
      setMessage('Error saving note.');
    }
  };



  return (
    <div className="note-creator">
      <form onSubmit={handleSubmit} className="w-full p-6 bg-white rounded-lg shadow-md">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:shadow-lg transition-shadow"
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
          className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:shadow-lg transition-shadow"
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
          className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:shadow-lg transition-shadow"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:shadow-lg transition-shadow"
        />
        <button
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-primary to-primary-hover text-white rounded-lg shadow-lg transform transition-transform hover:translate-y-1 hover:shadow-xl"
        >
          Save Note
        </button>
      </form>
      {message && <p className="mt-4 text-primary">{message}</p>}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <p>You must be logged in to save a note.</p>
            <button onClick={handleLoginRedirect} className="login-button">Login</button>
            {isModalOpen && <LoginModal onClose={handleCloseModal} />}
          </div>
          
        </div>
        
      )}
    </div>
  );
};

export default NoteCreator;