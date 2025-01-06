import { API_HOST } from '../config'; // 引入配置文件

export const getUsers = async (token, search = "", page = 1, perPage = 15) => {
    try {
        const response = await fetch(`${API_HOST}/api/v1/users?search=${search}&page=${page}&per_page=${perPage}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (response.ok && data.meta.code === 200) {
            return { success: true, users: data.data, meta: data.meta };
        } else {
            return { success: false, message: data.meta.message || "Failed to fetch users." };
        }
    } catch (error) {
        return { success: false, message: "Error: " + error.message };
    }
};

export const deleteUser = async (token, userId) => {
    try {
        const response = await fetch(`${API_HOST}/api/v1/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return { success: true };
        } else {
            const data = await response.json();
            return { success: false, message: data.message || "Failed to delete user." };
        }
    } catch (error) {
        return { success: false, message: "Error: " + error.message };
    }
};

export const editUser = async (token, userId, newName, newAddress) => {
    try {
        const response = await fetch(`${API_HOST}/api/v1/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName, address: newAddress})
        });

        if (response.ok) {
            return { success: true };
        } else {
            const data = await response.json();
            return { success: false, message: data.message || "Failed to update user." };
        }
    } catch (error) {
        return { success: false, message: "Error: " + error.message };
    }
};
