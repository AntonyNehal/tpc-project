import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const containerStyle = {
    maxWidth: '1200px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const headingStyle = {
    textAlign: 'center',
    color: '#2c3e50',
};

const buttonStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'block',
    margin: '20px auto',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
};

const thStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#3498db',
    color: 'white',
};

const tdStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
};

const deleteButtonStyle = {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const Adminp = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [users, setUsers] = useState([]);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        if (currentUser?.isAdmin) {
            fetchUsers();
        }
    }, [currentUser]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/user/all', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data);
            setUserCount(data.length);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/delete/${userId}`, { // Corrected line
                method: 'DELETE',
            });

            if (response.ok) {
                alert('User deleted successfully!');
                setUsers(users.filter((user) => user._id !== userId));
                setUserCount((prevCount) => prevCount - 1); // Update user count
            } else {
                alert('Failed to delete user.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>
                {currentUser?.isAdmin ? "Admin Dashboard" : "Welcome to TPC Home"}
            </h1>
            <button style={buttonStyle}>Add Student</button>
            {currentUser?.isAdmin && (
                <>
                    <h2 style={headingStyle}>Total Users: {userCount}</h2>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Name</th>
                                <th style={thStyle}>Email</th>
                                <th style={thStyle}>Phone</th>
                                <th style={thStyle}>DOB</th>
                                <th style={thStyle}>Nationality</th>
                                <th style={thStyle}>Gender</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td style={tdStyle}>{user.name}</td>
                                    <td style={tdStyle}>{user.email}</td>
                                    <td style={tdStyle}>{user.phone}</td>
                                    <td style={tdStyle}>{new Date(user.dob).toLocaleDateString()}</td>
                                    <td style={tdStyle}>{user.nationality}</td>
                                    <td style={tdStyle}>{user.gender}</td>
                                    <td style={tdStyle}>
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            style={deleteButtonStyle}
                                        >
                                            Delete
                                        </button>
                                
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default Adminp;
