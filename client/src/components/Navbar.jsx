import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, ShoppingBag, User, LogOut, LayoutDashboard, Sun, Moon, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="glass sticky top-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                    <span className="bg-primary px-2 py-1 rounded text-white shadow-lg shadow-primary/30">BIGGEST</span>
                    <span className="text-gray-900 dark:text-white">LOGS</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="hover:text-primary transition-colors font-medium">Home</Link>
                    <Link to="/shop" className="hover:text-primary transition-colors font-medium">Marketplace</Link>
                    <a href="https://t.me/everythinglogs1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#0088cc] hover:text-[#0077b5] transition-colors font-medium">
                        <Send size={18} /> Support
                    </a>
                    {user ? (
                        <div className="flex items-center gap-6 border-l border-gray-200 dark:border-white/10 pl-8 ml-2">
                            <Link to="/dashboard" className="flex items-center gap-2 hover:text-primary transition-colors font-medium">
                                <LayoutDashboard size={18} /> Dashboard
                            </Link>
                            {user.isAdmin && (
                                <Link to="/admin" className="text-accent-neon hover:text-white transition-colors font-bold">Admin Panel</Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors font-medium"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="hover:text-primary transition-colors font-medium">Login</Link>
                            <Link to="/register" className="btn-primary py-2 px-6">Get Started</Link>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-3 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-all shadow-sm border border-gray-200 dark:border-white/5"
                        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {isDarkMode ? <Sun size={20} className="animate-pulse" /> : <Moon size={20} />}
                    </button>

                    {/* Mobile Toggle */}
                    <button className="md:hidden p-2 text-gray-700 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass mt-4 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10"
                    >
                        <div className="flex flex-col p-6 gap-6">
                            <Link to="/" className="font-medium" onClick={() => setIsOpen(false)}>Home</Link>
                            <Link to="/shop" className="font-medium" onClick={() => setIsOpen(false)}>Marketplace</Link>
                            <a href="https://t.me/everythinglogs1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#0088cc] font-medium">
                                <Send size={18} /> Telegram Support
                            </a>
                            {user ? (
                                <>
                                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                                    {user.isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)}>Admin</Link>}
                                    <button onClick={handleLogout} className="text-left text-red-400">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                                    <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
