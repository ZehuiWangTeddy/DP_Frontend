import { API_HOST } from '../config';

export const login = async (email, password) => {
    try {
        // Corrected URL to avoid duplicate /api/v1
        const response = await fetch(`${API_HOST}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        // Safely handle non-JSON responses
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error('Invalid JSON response');
        }

        // Handle successful response
        if (response.ok && data.meta?.code === 200) {
            const userInfo = data.data.user;
            const accessToken = data.data.access_token.token;
            const expiresIn = data.data.access_token.expires_in;
            const expiryTime = new Date().getTime() + expiresIn * 1000;

            localStorage.setItem('user', JSON.stringify(userInfo));
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('expiryTime', expiryTime);

            return { success: true, data: userInfo };
        } else {
            return { success: false, message: data.meta?.message || "Login failed." };
        }
    } catch (error) {
        return { success: false, message: "Error: " + error.message };
    }
};
