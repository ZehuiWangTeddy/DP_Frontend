import React, { useState, useEffect } from 'react';
import './ManageUsers.css';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser, editUser } from './api/users';

const itemsPerPage = 15;

function ManageUsers() {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterText, setFilterText] = useState('');
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUserData, setEditUserData] = useState(null);
    const [originalUserData, setOriginalUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async (page = 1) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const data = await getUsers(token, filterText, page, itemsPerPage);
                if (data.success && Array.isArray(data.users)) {
                    setUsers(data.users);
                    setTotalPages(Math.ceil(data.meta.pagination.total / itemsPerPage));
                } else {
                    console.error('Error fetching users:', data.message);
                }
            } else {
                console.error('No access token found');
            }
        };

        fetchUsers(currentPage);
    }, [currentPage, filterText]);

    const handleSearch = (event) => {
        const query = event.target.value;
        setFilterText(query);
        setCurrentPage(1);
    };

    const handleEditUser = (user) => {
        setEditUserData({ ...user });
        setOriginalUserData({ ...user });
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUserData((prev) => ({ ...prev, [name]: value }));
    };

    const isUserChangeUpdateForm = () => {
        return JSON.stringify(editUserData) === JSON.stringify(originalUserData);
    }

    const handleSaveUser = async (e) => {
        e.preventDefault();
        if (isUserChangeUpdateForm()) {
            alert("No changes made.");
            return;
        }
        const token = localStorage.getItem("accessToken");
        if (token && editUserData) {
            const result = await editUser(token, editUserData.user_id, editUserData.name, editUserData.address);
            if (result.success) {
                const updatedUsers = users.map((user) =>
                    user.user_id === editUserData.user_id ? { ...user, ...editUserData } : user
                );
                setUsers(updatedUsers);
                setIsModalOpen(false);
            } else {
                console.error("Error updating user:", result.message);
            }
        } else {
            console.error("No access token found or user data is missing");
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditUserData(null);
        setOriginalUserData(null);
    };

    const handleDeleteUser = async (userToDelete) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete user ${userToDelete.name}?`);
        if (confirmDelete) {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const result = await deleteUser(token, userToDelete.user_id);
                if (result.success) {
                    const updatedUsers = users.filter(user => user.user_id !== userToDelete.user_id);
                    setUsers(updatedUsers);
                } else {
                    console.error('Error deleting user:', result.message);
                }
            } else {
                console.error('No access token found');
            }
        }
    };

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
                    placeholder="Search by username"
                    value={filterText}
                    onChange={handleSearch}
                    className="search-input"
                />
                <ul className="userList">
                    {users.map((user) => (
                        <li key={user.user_id} className="userItem">
                            <div className="userInfo">
                                <strong>Username:</strong> {user.name} <br/>
                                <strong>Email:</strong> {user.email} <br/>
                                <strong>Address:</strong> {user.address} <br/>
                                <strong>Discount:</strong> {user.has_discount ? 'applied' : 'not applied'} <br/>
                                <strong>Status:</strong> {user.active ? 'active' : 'inactive'}
                            </div>
                            <div className="action">
                                <button
                                    type="button"
                                    onClick={() => handleEditUser(user)}
                                    style={{ marginLeft: '10px', color: 'red' }}
                                >
                                    Edit User
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDeleteUser(user)}
                                    style={{ marginLeft: '10px', color: 'red' }}
                                >
                                    Delete User
                                </button>
                            </div>
                        </li>
                    ))}
                    {users.length === 0 && <p>No users found</p>}
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

            {isModalOpen && editUserData && (
                <div>
                    <div className="editBox">
                        <h3>Edit User</h3>
                        <form onSubmit={handleSaveUser}>
                            <div className="form-item">
                                <label>
                                    Username:
                                </label>
                                <input
                                    className="form-input"
                                    type="text"
                                    name="name"
                                    value={editUserData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-item">
                                <label>
                                    Address:
                                </label>
                                <input
                                    className="form-input"
                                    type="text"
                                    name="address"
                                    value={editUserData.address}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <button type="submit">Save</button>
                            <button type="button" onClick={handleCloseModal}>
                                Cancel
                            </button>
                        </form>
                    </div>
                    <div className="modal-overlay" onClick={handleCloseModal} />
                </div>
            )}
        </div>
    );
}

export default ManageUsers;