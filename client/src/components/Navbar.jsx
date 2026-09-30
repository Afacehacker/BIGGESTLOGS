import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { SettingsContext } from '../context/SettingsContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, LayoutDashboard, Download, Rocket, Send, Store, Compass, Sun, Moon } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { settings } = useContext(SettingsContext);
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            {/* Top Navbar */}
            <nav className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-50 px-3 sm:px-6 py-3 border-b border-gray-100 dark:border-slate-800 shadow-sm flex items-center justify-between transition-colors">
                <div className="flex items-center gap-2">
                    <Link to="/" className="text-xl sm:text-2xl font-black tracking-tighter flex items-center gap-2 group">
                        <div className="bg-gradient-to-tr from-emerald-600 to-teal-400 text-white p-1.5 rounded-xl shadow-md group-hover:scale-105 transition-transform">
                            <Rocket size={18} fill="currentColor" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-emerald-500 dark:from-emerald-400 dark:to-teal-300 font-black">
                            BIGGEST<span className="text-slate-900 dark:text-white">LOGS</span>
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme mode"
                        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-emerald-500/20 transition-all active:scale-95 flex items-center justify-center"
                    >
                        {isDarkMode ? <Sun size={18} className="text-amber-400 animate-pulse" /> : <Moon size={18} className="text-emerald-700" />}
                    </button>

                    {(user?.isAdmin || user?.name?.toLowerCase().includes('admin')) && (
                        <Link to="/admin" className="flex items-center gap-1.5 text-[11px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors">
                            <Rocket size={14} /> <span>ADMIN</span>
                        </Link>
                    )}
                    
                    {/* Wallet Balance Widget */}
                    <Link to="/wallet" className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-full shadow-md shadow-emerald-600/20 transition-all duration-200 active:scale-95">
                        <div className="text-emerald-100 p-0.5"><Send size={11} className="rotate-45" fill="currentColor" /></div>
                        <span className="font-extrabold text-xs tracking-tight">₦{(user?.balance || 0).toLocaleString()}</span>
                    </Link>
                </div>
            </nav>

            {/* Desktop Navigation */}
            <div className="hidden md:flex bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 py-3 px-6 justify-center gap-8 shadow-sm text-sm transition-colors">
               <Link to="/" className={`font-bold transition-colors ${location.pathname === '/' ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400 pb-1' : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400'}`}>Home</Link>
               <Link to="/shop" className={`font-bold transition-colors ${location.pathname === '/shop' ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400 pb-1' : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400'}`}>Marketplace</Link>
               <Link to="/dashboard" className={`font-bold transition-colors ${location.pathname === '/dashboard' ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400 pb-1' : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400'}`}>Orders</Link>
               <a href={settings?.telegramLink || "https://t.me/boostnaija1"} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact Support</a>
               {user ? (
                   <button onClick={handleLogout} className="font-bold text-red-500 hover:text-red-700 transition-colors">Log Out</button>
               ) : (
                   <Link to="/login" className="font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors">Login</Link>
               )}
            </div>

            {/* Bottom Navigation for Mobile */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-gray-200/80 dark:border-slate-800 pb-safe pb-2 shadow-lg transition-colors">
                <div className="flex justify-around items-end px-2 pt-2 pb-1">
                    <Link to="/" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/' ? 'text-emerald-600 dark:text-emerald-400 font-extrabold scale-105' : 'text-slate-400 dark:text-slate-500 font-medium hover:text-slate-600'}`}>
                        <div className="p-1">
                            <Compass size={22} strokeWidth={location.pathname === '/' ? 2.5 : 2} />
                        </div>
                        <span className="text-[10px] whitespace-nowrap">Home</span>
                    </Link>

                    <Link to="/shop" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/shop' ? 'text-emerald-600 dark:text-emerald-400 font-extrabold scale-105' : 'text-slate-400 dark:text-slate-500 font-medium hover:text-slate-600'}`}>
                        <div className="p-1">
                            <Store size={22} strokeWidth={location.pathname === '/shop' ? 2.5 : 2} />
                        </div>
                        <span className="text-[10px] whitespace-nowrap">Shop</span>
                    </Link>

                    <Link to="/wallet" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/wallet' ? 'text-emerald-600 dark:text-emerald-400 font-extrabold scale-105' : 'text-slate-400 dark:text-slate-500 font-medium hover:text-slate-600'}`}>
                        <div className="p-1">
                            <Download strokeWidth={location.pathname === '/wallet' ? 2.5 : 2} size={22} className="rotate-180" />
                        </div>
                        <span className="text-[10px] whitespace-nowrap">Wallet</span>
                    </Link>

                    <Link to="/dashboard" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/dashboard' ? 'text-emerald-600 dark:text-emerald-400 font-extrabold scale-105' : 'text-slate-400 dark:text-slate-500 font-medium hover:text-slate-600'}`}>
                        <div className="p-1">
                           <LayoutDashboard strokeWidth={location.pathname === '/dashboard' ? 2.5 : 2} size={22} />
                        </div>
                        <span className="text-[10px] whitespace-nowrap">Orders</span>
                    </Link>

                    {(user?.isAdmin || user?.name?.toLowerCase().includes('admin')) && (
                        <Link to="/admin" className={`flex flex-col items-center gap-1 transition-all ${location.pathname.startsWith('/admin') ? 'text-emerald-600 dark:text-emerald-400 font-extrabold scale-105' : 'text-slate-400 dark:text-slate-500 font-medium hover:text-slate-600'}`}>
                            <div className="p-1">
                                <Rocket strokeWidth={location.pathname.startsWith('/admin') ? 2.5 : 2} size={22} />
                            </div>
                            <span className="text-[10px] whitespace-nowrap">Admin</span>
                        </Link>
                    )}

                    {user ? (
                        <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 font-medium hover:text-red-500 transition-colors">
                             <div className="p-1">
                                 <LogOut strokeWidth={2} size={22} className="rotate-180" />
                             </div>
                             <span className="text-[10px] whitespace-nowrap">Log Out</span>
                        </button>
                    ) : (
                        <Link to="/login" className="flex flex-col items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                            <div className="p-1">
                                <LogOut strokeWidth={2} size={22} className="rotate-180" />
                            </div>
                            <span className="text-[10px] whitespace-nowrap">Log In</span>
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;

