import React, { useState, useEffect } from 'react';
import './UserList.css';

function UserList() {
    const [allUsers, setAllUsers] = useState([]);

    const fetchInfo = async () => {
        try {
            const res = await fetch('http://localhost:4000/allusers');
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            setAllUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const blockUser = async (email) => {
        try {
            const res = await fetch('http://localhost:4000/blockuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) throw new Error('Network response was not ok');
            fetchInfo();
        } catch (error) {
            console.error('Error blocking user:', error);
        }
    };

    const unblockUser = async (email) => {
        try {
            const res = await fetch('http://localhost:4000/unblockuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) throw new Error('Network response was not ok');
            fetchInfo();
        } catch (error) {
            console.error('Error unblocking user:', error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div className='userlist'>
            <h1>All User List</h1>
            <div className="userlist-format-main">
                <p>UserName</p>
                <p>EmailAddress</p>
                <p>password</p>
                <p>Status</p>
                <p>Actions</p>
            </div>
            <div className="userlist-allproducts">
                <hr />
                {allUsers.map((user) => (
                    <React.Fragment key={user._id}>
                        <div className="userlist-format-main userlist-format">
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>{user.password}</p>
                            <p>{user.blocked ? 'Blocked' : 'Active'}</p>
                            <div>
                                {user.blocked ? (
                                    <button onClick={() => unblockUser(user.email)}>Unblock</button>
                                ) : (
                                    <button onClick={() => blockUser(user.email)}>Block</button>
                                )}
                            </div>
                        </div>
                        <hr />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default UserList;
