import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage, auth } from '../firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import './NoteCreator.css';

const categories = {
  'Computer Science': [
    { name: 'Python' },
    { name: 'Java' },
    { name: 'C' },
    { name: 'C++' },
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'JavaScript' },
    { name: 'Other' }
  ],
  'Class 1-8': [
    { name: 'Science' },
    { name: 'Social Science' },
    { name: 'Other' }
  ],
  'Class 9-12': [
    { name: 'Physics' },
    { name: 'Chemistry' },
    { name: 'Biology' },
    { name: 'Other' }
  ]
};

const NoteCreator = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      try {
        const storageRef = ref(storage, `notes/${user.uid}/${title}-${Date.now()}.txt`);
        await uploadString(storageRef, content);
        const downloadURL = await getDownloadURL(storageRef);

        await addDoc(collection(db, 'notes'), {
          title,
          content: downloadURL,
          category,
          subcategory,
          timestamp: serverTimestamp(),
          userId: user.uid
        });

        setTitle('');
        setContent('');
        setCategory('');
        setSubcategory('');
        setMessage('Note saved successfully!');
      } catch (error) {
        console.error('Error submitting note:', error);
        setMessage('Error submitting note.');
      }
    }
  };

  return (
    <div className="note-creator max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeIn">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:shadow-lg transition-shadow"
        />
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
        <button
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-primary to-primary-hover text-white rounded-lg shadow-lg transform transition-transform hover:translate-y-1 hover:shadow-xl"
        >
          Save Note
        </button>
      </form>
      {message && <p className="mt-4 text-primary">{message}</p>}
    </div>
  );
};

export default NoteCreator;