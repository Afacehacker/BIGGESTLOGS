import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success('Login Successful!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 sm:px-6 py-12 pb-24 md:pb-12 transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[24px] p-6 sm:p-8 shadow-xl border border-slate-100 dark:border-slate-800">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/50 rounded-[18px] flex items-center justify-center mx-auto mb-4 border border-emerald-100 dark:border-emerald-900/50 shadow-sm">
                        <LogIn className="text-emerald-600 dark:text-emerald-400" size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Welcome Back</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Access your digital vault and orders.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                            <input
                                type="email"
                                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-[14px] pl-12 pr-4 py-3.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-400"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="yours@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                            <input
                                type="password"
                                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-[14px] pl-12 pr-4 py-3.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-[14px] shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-2 active:scale-[0.99]">
                        LOGIN TO PORTAL <ArrowRight size={18} />
                    </button>
                </form>

                <p className="text-center mt-8 text-slate-500 dark:text-slate-400 font-medium text-sm">
                    Don't have an account? <Link to="/register" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">Register now</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
