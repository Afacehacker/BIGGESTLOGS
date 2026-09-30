import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Image as ImageIcon, Check, CheckCheck, Loader2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import API from '../services/api';
import { toast } from 'react-hot-toast';

const ChatWidget = () => {
    const { user } = useContext(AuthContext);
    const { messages, sendMessage, fetchMyChat, unreadCount, setUnreadCount, isTyping, markSeen, socket } = useChat();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [uploading, setUploading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (isOpen && user) {
            fetchMyChat();
            markSeen(user._id);
        }
    }, [isOpen, user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (!user || user.isAdmin) return null;

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Bot Logic
        const text = input.trim();
        setInput('');

        await sendMessage(text, null, 'admin');

        // Bot responses for options 1-4
        if (text === '1' || text.toLowerCase().includes('buy')) {
            setTimeout(() => {
                sendMessage("To buy an account, simply browse our shop, select a product, and click 'Purchase'. Ensure your wallet is funded before buying! 🛒\n\nType 'menu' to see all categories again.", null, user._id, 'bot');
            }, 800);
        } else if (text === '2' || text.toLowerCase().includes('deposit')) {
            setTimeout(() => {
                sendMessage("For deposit issues, please upload a screenshot of your payment receipt here. An admin will verify and fund your wallet shortly! 💸\n\nType 'menu' to see more options.", null, user._id, 'bot');
            }, 800);
        } else if (text === '3' || text.toLowerCase().includes('complaint')) {
            setTimeout(() => {
                sendMessage("We're sorry you're having issues. Please provide the Order ID and a detailed description of the problem. Our team will look into it immediately! ⚒️\n\nType 'menu' for more help.", null, user._id, 'bot');
            }, 800);
        } else if (text === '4' || text.toLowerCase().includes('admin')) {
            setTimeout(() => {
                sendMessage("Connecting you to a live admin... Please stay online. You can leave a message and we'll reply as soon as possible! 👨‍💻\n\nType 'menu' if you'd like to try automated support again.", null, user._id, 'bot');
            }, 800);
        } else if (text.toLowerCase() === 'menu' || text.toLowerCase() === 'help' || text === '0') {
            setTimeout(() => {
                sendMessage("Support Menu:\n\n1️⃣ Buy account\n2️⃣ Deposit issue\n3️⃣ Product complaint\n4️⃣ Talk to admin\n\nSimply reply with the number you need help with!", null, user._id, 'bot');
            }, 500);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const { data: imageUrl } = await API.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            await sendMessage("", imageUrl, 'admin');
            toast.success('Photo sent');
        } catch (error) {
            console.error('Upload failed', error);
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleTyping = (e) => {
        setInput(e.target.value);
        if (socket) {
            socket.emit('typing', { senderId: user._id, receiverId: 'admin', isTyping: e.target.value.length > 0, isAdmin: false });
        }
    };

    return (
        <div className="fixed bottom-20 md:bottom-8 right-3 md:right-8 z-[999]">
            {/* Floating Icon */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:p-4 rounded-full shadow-2xl relative shadow-emerald-600/30 flex items-center justify-center active:scale-95"
            >
                {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
                {!isOpen && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                        {unreadCount}
                    </span>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        className="absolute bottom-16 right-0 w-[calc(100vw-24px)] max-w-[380px] h-[500px] bg-white dark:bg-slate-900 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-gray-100 dark:border-slate-800 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-emerald-600 p-5 text-white flex justify-between items-center group">
                            <div>
                                <h3 className="font-bold text-base sm:text-lg">Support Center</h3>
                                <p className="text-xs text-emerald-100 flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
                                    Online • BIGGESTLOGS
                                </p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform p-1">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-slate-50/70 dark:bg-slate-950/60">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] rounded-2xl p-3.5 shadow-xs ${
                                        msg.sender === 'user' 
                                            ? 'bg-emerald-600 text-white rounded-tr-none' 
                                            : msg.sender === 'bot' 
                                                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 rounded-tl-none font-medium text-xs sm:text-sm'
                                                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-gray-100 dark:border-slate-700 rounded-tl-none'
                                    }`}>
                                        {msg.message && <p className="whitespace-pre-line text-xs sm:text-sm">{msg.message}</p>}
                                        {msg.image && (
                                            <img src={msg.image} alt="Upload" className="mt-2 rounded-lg max-w-full cursor-pointer hover:opacity-90" onClick={() => window.open(msg.image)} />
                                        )}
                                        <div className="flex items-center justify-end gap-1 mt-1">
                                            <span className="text-[10px] opacity-70">
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            {msg.sender === 'user' && (
                                                msg.status === 'seen' ? <CheckCheck size={12} /> : <Check size={12} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex items-center gap-2">
                            <label className="cursor-pointer text-slate-400 dark:text-slate-500 hover:text-emerald-600 transition-colors p-1">
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                                {uploading ? <Loader2 size={22} className="animate-spin" /> : <ImageIcon size={22} />}
                            </label>
                            <input
                                type="text"
                                value={input}
                                onChange={handleTyping}
                                placeholder="Type your message..."
                                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder-slate-400"
                            />
                            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition-colors shadow-md shadow-emerald-600/20">
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatWidget;

