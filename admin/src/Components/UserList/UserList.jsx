import React, { useState, useEffect } from 'react';
import './UserList.css';

function UserList() {
    const [allusers, setAllusers] = useState([]);

    const fetchInfo = async () => {
        try {
            const res = await fetch('http://localhost:4000/allusers');
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            setAllusers(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div className='userlist-product'>
            <h1>All User List</h1>
            <div className="userlistproduct-format-main">
                <p>UserName</p>
                <p>EmailAddress</p>
                <p>Password</p>
                <p>Status</p>
            </div>
            <div className="userlistproduct-allproducts">
                <hr />
                {allusers.map((product) => (
                    <React.Fragment key={product.id}>
                        <div className="userlistproduct-format-main userlistproduct-format">
                            <p>{product.name}</p>
                            <p>{product.email}</p>
                            <p>{product.password}</p>
                            <p>active</p>
                        </div>
                        <hr />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default UserList;


