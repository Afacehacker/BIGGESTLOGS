import { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const { data } = await API.get('/users/profile');
            setUser(prev => {
                if (!prev) return data;
                const updatedUser = { ...prev, ...data };
                localStorage.setItem('userInfo', JSON.stringify(updatedUser));
                return updatedUser;
            });
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    };

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
            fetchUser(); // Sync with DB
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await API.post('/users/login', { email, password });
        localStorage.setItem('userInfo', JSON.stringify(data));
        setUser(data);
        return data;
    };

    const register = async (name, email, password) => {
        const { data } = await API.post('/users', { name, email, password });
        localStorage.setItem('userInfo', JSON.stringify(data));
        setUser(data);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};
