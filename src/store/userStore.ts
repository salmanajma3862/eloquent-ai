import { create } from 'zustand';
import api from '../lib/api';

interface UserInfo {
    _id: string;
    name: string;
    email: string;
}

interface UserState {
    token: string | null;
    userInfo: UserInfo | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    googleLogin: (credential: string) => Promise<void>;
    logout: () => void;
}

// Helper function to get initial state from localStorage
const getInitialState = () => {
    try {
        const token = localStorage.getItem('token');
        const userInfo = localStorage.getItem('userInfo');
        
        if (token && userInfo) {
            return {
                token,
                userInfo: JSON.parse(userInfo),
                isLoggedIn: true,
            };
        }
    } catch (error) {
        console.error('Error loading user data from localStorage:', error);
    }
    
    return {
        token: null,
        userInfo: null,
        isLoggedIn: false,
    };
};

export const useUserStore = create<UserState>((set) => ({
    ...getInitialState(),
    
    login: async (email: string, password: string) => {
        try {
            const response = await api.post('/api/auth/login', { email, password });
            const { token, ...userInfo } = response.data;
            
            // Save to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            
            // Update state
            set({
                token,
                userInfo,
                isLoggedIn: true,
            });
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
    
    signup: async (name: string, email: string, password: string) => {
        try {
            const response = await api.post('/api/auth/register', { name, email, password });
            const { token, ...userInfo } = response.data;
            
            // Save to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            
            // Update state
            set({
                token,
                userInfo,
                isLoggedIn: true,
            });
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    },
    
    googleLogin: async (credential: string) => {
        try {
            const response = await api.post('/api/auth/google', { credential });
            const { token, ...userInfo } = response.data;
            
            // Save to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            
            // Update state
            set({
                token,
                userInfo,
                isLoggedIn: true,
            });
        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        }
    },
    
    logout: () => {
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        
        // Clear state
        set({
            token: null,
            userInfo: null,
            isLoggedIn: false,
        });
    },
}));
