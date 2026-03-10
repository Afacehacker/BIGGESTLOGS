import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Clock, HelpCircle, LogOut, LayoutDashboard, Download, Rocket, Send } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            {/* Top Navbar */}
            <nav className="bg-white sticky top-0 z-50 px-4 py-3 border-b border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/" className="text-2xl font-bold tracking-tight text-primary flex items-center gap-[2px]">
                        biggestlogs<span className="text-3xl leading-none text-primary mt-1">.</span> 
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {/* Admin Link for Desktop */}
                    {user?.isAdmin && (
                        <Link to="/admin" className="hidden md:flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-primary transition-colors">
                            <Rocket size={14} /> ADMIN
                        </Link>
                    )}
                    
                    {/* Wallet Balance Widget */}
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full shadow-inner border border-gray-100">
                        <div className="text-gray-400 bg-gray-200 p-1 rounded-sm"><Send size={12} className="rotate-45" /></div>
                        <span className="font-extrabold text-black tracking-tight">₦0.00</span>
                    </div>
                </div>
            </nav>

            {/* Desktop Navigation (if needed, otherwise hide) */}
            <div className="hidden md:flex bg-white border-b border-gray-100 py-3 px-6 justify-center gap-8">
               <Link to="/" className={`font-semibold ${location.pathname === '/' ? 'text-primary' : 'text-gray-500'}`}>Home</Link>
               <Link to="/shop" className={`font-semibold ${location.pathname === '/shop' ? 'text-primary' : 'text-gray-500'}`}>Marketplace</Link>
               <Link to="/dashboard" className={`font-semibold ${location.pathname === '/dashboard' ? 'text-primary' : 'text-gray-500'}`}>Orders</Link>
               <a href="https://t.me/everythinglogs1" className="font-semibold text-gray-500">Contact</a>
               {user ? (
                   <button onClick={handleLogout} className="font-semibold text-red-500">Log Out</button>
               ) : (
                   <Link to="/login" className="font-semibold text-primary">Login</Link>
               )}
            </div>

            {/* Bottom Navigation for Mobile */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe pb-4">
                <div className="flex justify-around items-end px-2 pt-3 pb-2">
                    <Link to="/" className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-gray-800' : 'text-gray-400'}`}>
                        <div className={`p-1 ${location.pathname === '/' ? 'text-gray-800' : 'text-gray-400'}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-radar"><path d="M19.07 4.93A10 10 0 0 0 6.99 3.34"/><path d="M4 6h.01"/><path d="M2.29 9.62A10 10 0 1 0 21.31 8.35"/><path d="M16.24 7.76A6 6 0 1 0 8.25 16.23"/><path d="M12 18h.01"/><path d="M17.65 11.5A6 6 0 0 0 11.66 5.5"/><circle cx="12" cy="12" r="2"/></svg>
                        </div>
                        <span className="text-[10px] whitespace-nowrap">Home</span>
                    </Link>

                    <Link to="/wallet" className={`flex flex-col items-center gap-1 ${location.pathname === '/wallet' ? 'text-gray-800' : 'text-gray-400'}`}>
                        <div className="p-1">
                            <Download strokeWidth={2} size={22} className="rotate-180" />
                        </div>
                        <span className="text-[10px] whitespace-nowrap">Fund Wallet</span>
                    </Link>

                    <Link to="/dashboard" className={`flex flex-col items-center gap-1 ${location.pathname === '/dashboard' ? 'text-gray-800' : 'text-gray-400'}`}>
                        <div className="p-1">
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-receipt-text"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M14 8H8"/><path d="M16 12H8"/><path d="M13 16H8"/></svg>
                        </div>
                        <span className="text-[10px] whitespace-nowrap">Orders</span>
                    </Link>

                    <a href="https://t.me/everythinglogs1" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 text-gray-400">
                        <div className="p-1">
                            <HelpCircle strokeWidth={2} size={22} />
                        </div>
                        <span className="text-[10px] whitespace-nowrap">Contact</span>
                    </a>

                    {user ? (
                        <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-gray-400">
                            <div className="p-1">
                                <LogOut strokeWidth={2} size={22} className="rotate-180" />
                            </div>
                            <span className="text-[10px] whitespace-nowrap">Log Out</span>
                        </button>
                    ) : (
                        <Link to="/login" className="flex flex-col items-center gap-1 text-gray-400">
                            <div className="p-1 text-primary">
                                <LogOut strokeWidth={2} size={22} className="rotate-180" />
                            </div>
                            <span className="text-[10px] whitespace-nowrap">Log In</span>
                        </Link>
                    )}
                </div>

                {/* Pill loggsplug.shop style */}
                <div className="mt-1 flex justify-center pb-2">
                    <div className="bg-white border border-gray-200 rounded-full px-6 py-1 text-[11px] font-bold text-black shadow-sm">
                        biggestlogs.shop
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
