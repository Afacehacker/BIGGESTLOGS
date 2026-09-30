import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { SettingsContext } from '../context/SettingsContext';
import { LogOut, LayoutDashboard, Download, Rocket, Send, Store, Compass } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { settings } = useContext(SettingsContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            {/* Top Navbar */}
            <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 px-4 py-3 border-b border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 group">
                        <div className="bg-gradient-to-tr from-blue-600 to-cyan-400 text-white p-1.5 rounded-xl shadow-md group-hover:scale-105 transition-transform">
                            <Rocket size={18} fill="currentColor" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 font-black">
                            BIGGEST<span className="text-[#1f2231]">LOGS</span>
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    {(user?.isAdmin || user?.name?.toLowerCase().includes('admin')) && (
                        <Link to="/admin" className="flex items-center gap-1.5 text-[11px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors">
                            <Rocket size={14} /> <span>ADMIN</span>
                        </Link>
                    )}
                    
                    {/* Wallet Balance Widget */}
                    <Link to="/wallet" className="flex items-center gap-2 bg-[#1b2331] hover:bg-black text-white px-3.5 py-1.5 rounded-full shadow-sm transition-all duration-200 active:scale-95">
                        <div className="text-blue-400 p-0.5"><Send size={11} className="rotate-45" fill="currentColor" /></div>
                        <span className="font-extrabold text-xs tracking-tight">₦{(user?.balance || 0).toLocaleString()}</span>
                    </Link>
                </div>
            </nav>

            {/* Desktop Navigation */}
            <div className="hidden md:flex bg-white border-b border-gray-100 py-3 px-6 justify-center gap-8 shadow-sm text-sm">
               <Link to="/" className={`font-bold transition-colors ${location.pathname === '/' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-500 hover:text-gray-900'}`}>Home</Link>
               <Link to="/shop" className={`font-bold transition-colors ${location.pathname === '/shop' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-500 hover:text-gray-900'}`}>Marketplace</Link>
               <Link to="/dashboard" className={`font-bold transition-colors ${location.pathname === '/dashboard' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-500 hover:text-gray-900'}`}>Orders</Link>
               <a href={settings?.telegramLink || "https://t.me/boostnaija1"} target="_blank" rel="noopener noreferrer" className="font-bold text-gray-500 hover:text-blue-600 transition-colors">Contact Support</a>
               {user ? (
                   <button onClick={handleLogout} className="font-bold text-red-500 hover:text-red-700 transition-colors">Log Out</button>
               ) : (
                   <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">Login</Link>
               )}
            </div>

            {/* Bottom Navigation for Mobile */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200/80 pb-safe pb-3 shadow-lg">
                <div className="flex justify-around items-end px-2 pt-2.5 pb-1">
                    <Link to="/" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/' ? 'text-blue-600 font-extrabold scale-105' : 'text-gray-400 font-medium hover:text-gray-600'}`}>
                        <div className="p-1">
                            <Compass size={22} strokeWidth={location.pathname === '/' ? 2.5 : 2} />
                        </div>
                        <span className="text-[10px] whitespace-nowrap">Home</span>
                    </Link>

                    <Link to="/shop" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/shop' ? 'text-blue-600 font-extrabold scale-105' : 'text-gray-400 font-medium hover:text-gray-600'}`}>
                        <div className="p-1">
                            <Store size={22} strokeWidth={location.pathname === '/shop' ? 2.5 : 2} />
                        </div>
                        <span className="text-[10px] whitespace-nowrap">Shop</span>
                    </Link>

                    <Link to="/wallet" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/wallet' ? 'text-blue-600 font-extrabold scale-105' : 'text-gray-400 font-medium hover:text-gray-600'}`}>
                        <div className="p-1">
                            <Download strokeWidth={location.pathname === '/wallet' ? 2.5 : 2} size={22} className="rotate-180" />
                        </div>
                        <span className="text-[10px] whitespace-nowrap">Wallet</span>
                    </Link>

                    <Link to="/dashboard" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/dashboard' ? 'text-blue-600 font-extrabold scale-105' : 'text-gray-400 font-medium hover:text-gray-600'}`}>
                        <div className="p-1">
                           <LayoutDashboard strokeWidth={location.pathname === '/dashboard' ? 2.5 : 2} size={22} />
                        </div>
                        <span className="text-[10px] whitespace-nowrap">Orders</span>
                    </Link>

                    {(user?.isAdmin || user?.name?.toLowerCase().includes('admin')) && (
                        <Link to="/admin" className={`flex flex-col items-center gap-1 transition-all ${location.pathname.startsWith('/admin') ? 'text-blue-600 font-extrabold scale-105' : 'text-gray-400 font-medium hover:text-gray-600'}`}>
                            <div className="p-1">
                                <Rocket strokeWidth={location.pathname.startsWith('/admin') ? 2.5 : 2} size={22} />
                            </div>
                            <span className="text-[10px] whitespace-nowrap">Admin</span>
                        </Link>
                    )}

                    {user ? (
                        <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-gray-400 font-medium hover:text-red-500 transition-colors">
                             <div className="p-1">
                                 <LogOut strokeWidth={2} size={22} className="rotate-180" />
                             </div>
                             <span className="text-[10px] whitespace-nowrap">Log Out</span>
                        </button>
                    ) : (
                        <Link to="/login" className="flex flex-col items-center gap-1 text-blue-600 font-bold">
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
