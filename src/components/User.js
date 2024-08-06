import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const User = () => {
    useEffect(() => {
        const fetchUser = async () => {
            const user = firebase.auth().currentUser;
            if (!user) {
                console.error("No user is currently logged in.");
                return;
            }

            try {
                const token = await user.getIdToken();
                // Fetch user data using the token
                const response = await fetch('/api/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const userData = await response.json();
                console.log(userData);
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            {/* User component content */}
        </div>
    );
};

export default User;