import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from './AuthContext';
import API from '../services/api';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const socket = useRef();
    const endpoint = import.meta.env.VITE_SOCKET_URL || 'https://biggestlogs-backend.onrender.com' || 'http://localhost:5000';

    useEffect(() => {
        if (user) {
            socket.current = io(endpoint);
            socket.current.emit('addUser', { userId: user._id, isAdmin: user.isAdmin });

            socket.current.on('getMessage', (data) => {
                setMessages((prev) => [...prev, {
                    sender: data.isAdmin ? 'admin' : 'user',
                    message: data.message,
                    image: data.image,
                    createdAt: data.createdAt
                }]);
                if (!user.isAdmin) {
                    setUnreadCount(prev => prev + 1);
                }
            });

            socket.current.on('getTyping', (data) => {
                setIsTyping(data.isTyping);
            });
        }

        return () => {
            if (socket.current) socket.current.disconnect();
        };
    }, [user, endpoint]);

    const fetchMyChat = async () => {
        try {
            const { data } = await API.get('/chats/me');
            setMessages(data.messages);
            setActiveChat(data);
            setUnreadCount(data.unreadCountUser);
        } catch (error) {
            console.error('Error fetching chat:', error);
        }
    };

    const sendMessage = async (message, image, receiverId) => {
        try {
            const msgData = {
                message,
                image,
                userId: receiverId,
                senderType: user.isAdmin ? 'admin' : 'user'
            };

            await API.post('/chats/message', msgData);

            socket.current.emit('sendMessage', {
                senderId: user._id,
                receiverId: receiverId || 'admin',
                message,
                image,
                isAdmin: user.isAdmin
            });

            if (!user.isAdmin || (user.isAdmin && receiverId === activeChat?.user?._id)) {
                setMessages(prev => [...prev, {
                    sender: user.isAdmin ? 'admin' : 'user',
                    message,
                    image,
                    createdAt: new Date()
                }]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const markSeen = async (userId) => {
        try {
            await API.put('/chats/seen', { userId });
            setUnreadCount(0);
        } catch (error) {
            console.error('Error marking as seen:', error);
        }
    };

    return (
        <ChatContext.Provider value={{
            messages,
            setMessages,
            activeChat,
            setActiveChat,
            sendMessage,
            fetchMyChat,
            unreadCount,
            setUnreadCount,
            isTyping,
            socket: socket.current,
            markSeen
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
