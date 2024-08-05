// src/components/Sidebar.js
import React from 'react';

const Sidebar = ({ categories, onSelectCategory }) => {
    return (
        <aside>
            <ul>
                {categories.map(category => (
                    <li key={category} onClick={() => onSelectCategory(category)}>
                        {category}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
