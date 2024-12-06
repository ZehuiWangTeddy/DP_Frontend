import React, { useState } from 'react';
import './ManageUsers.css';
import { useNavigate } from 'react-router-dom';

const users = [
    { id: 1, username: 'xXIncepti-coreXx', subscriptionType: 'SD', discount: 'applied', active: 'yes' },
    { id: 2, username: 'Jonnah1948', subscriptionType: 'HD', discount: 'not applied', active: 'suspended' },
    { id: 3, username: 'lordMarcel', subscriptionType: 'SD', discount: 'not applied', active: 'yes' },
    { id: 4, username: 'KarnivorousKlown', subscriptionType: 'UHD', discount: 'applied', active: 'yes' },
    { id: 5, username: 'joe', subscriptionType: 'SD', discount: 'not applied', active: 'suspended' },
    { id: 6, username: 'KimballCho', subscriptionType: 'SD', discount: 'not applied', active: 'yes' },
    { id: 7, username: 'GojoXOXO', subscriptionType: 'UHD', discount: 'not applied', active: 'yes' },
    { id: 8, username: 'Ashleigh<3', subscriptionType: 'SD', discount: 'applied', active: 'yes' },
    { id: 9, username: 'Connor&You', subscriptionType: 'HD', discount: 'not applied', active: 'yes' },
    { id: 10, username: 'YoMama', subscriptionType: 'UHD', discount: 'applied', active: 'suspended' },
    { id: 11, username: 'me', subscriptionType: 'HD', discount: 'applied', active: 'yes' },
];

const itemsPerPage = 5;

function ManageUsers() {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterText, setFilterText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);
    const navigate = useNavigate(); 

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setFilterText(query);
        const updatedUsers = users.filter(
        (user) =>
                user.username.toLowerCase().includes(query) || user.active.toLowerCase().includes(query)
        );
        setFilteredUsers(updatedUsers);
        setCurrentPage(1); 
    };

    const handleDeleteUser = (userToDelete) => {
        const updatedUsers = filteredUsers.filter(user => user.id !== userToDelete.id);
        setFilteredUsers(updatedUsers);
    };

    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="usersBody">
            <div className="navButtonUsers" onClick={() => navigate("/actionSelect")}>
                &lt; Go to Management Page
            </div>
            <h1>Manage Users</h1>
            <div className="manageUsersContainer">
                <input
                    type="text"
                    placeholder="Search by username or status"
                    value={filterText}
                    onChange={handleSearch}
                    className="search-input"
                />
                <ul className="userList">
                    {currentUsers.map((user) => (
                        <li key={user.id} className="userItem">
                            <strong>Username:</strong> {user.username} <br />
                            <strong>Subscription:</strong> {user.subscriptionType} <br />
                            <strong>Discount:</strong> {user.discount} <br />
                            <strong>Status:</strong> {user.active}
                            <button
                                type="button"
                                onClick={() => handleDeleteUser(user)}
                                style={{ marginLeft: '10px', color: 'red' }}
                            >
                                Delete User
                            </button>
                        </li>
                    ))}
                    {currentUsers.length === 0 && <p>No users found</p>}
                </ul>
                <div className="pagination">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            className={currentPage === index + 1 ? 'active' : ''}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ManageUsers;
