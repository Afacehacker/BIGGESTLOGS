import { motion } from 'framer-motion';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ account }) => {
    const navigate = useNavigate();
    
    // Formatter for Currency
    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 2,
        }).format(val).replace('NGN', '₦');
    };

    // Pick an icon or logo based on platform
    const getPlatformIcon = (platform = '') => {
        const plat = platform.toLowerCase();
        if (plat.includes('proxy')) {
            return (
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md text-white font-black text-xl">
                    9
                </div>
            );
        }
        if (plat.includes('facebook')) {
            return (
                <div className="w-12 h-12 rounded-2xl bg-[#1877F2] flex items-center justify-center shadow-md text-white font-black text-xl">
                    f
                </div>
            );
        }
        if (plat.includes('twitter') || plat.includes('x')) {
            return (
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center shadow-md text-white font-black text-xl">
                    X
                </div>
            );
        }
        if (plat.includes('instagram')) {
            return (
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-md text-white font-black text-xl">
                    Ig
                </div>
            );
        }
        if (plat.includes('tiktok')) {
            return (
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-black via-gray-900 to-red-500 flex items-center justify-center shadow-md text-white font-black text-xl">
                    Tk
                </div>
            );
        }
        if (plat.includes('telegram')) {
            return (
                <div className="w-12 h-12 rounded-2xl bg-[#0088cc] flex items-center justify-center shadow-md text-white font-black text-xl">
                    Tg
                </div>
            );
        }
        // Default avatar/image
        return (
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm overflow-hidden border border-gray-100 shrink-0">
                <img src={account.image || 'https://via.placeholder.com/150'} alt="Icon" className="w-full h-full object-cover" />
            </div>
        );
    };

    const isAvailable = (account.stock || 0) > 0;

    return (
        <motion.div 
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/shop/${account._id}`)}
            className="bg-white rounded-[1.5rem] p-4 flex gap-4 items-center shadow-sm border border-gray-100 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer w-full mb-3.5 group relative overflow-hidden"
        >
            {/* Left Icon */}
            <div className="shrink-0 flex items-center justify-center relative">
                {getPlatformIcon(account.platform)}
                {account.quality && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-0.5 rounded-full border-2 border-white shadow-sm" title={`Quality: ${account.quality}%`}>
                        <CheckCircle2 size={12} strokeWidth={3} />
                    </div>
                )}
            </div>

            {/* Middle Content */}
            <div className="flex-grow flex flex-col justify-center min-w-0 pr-2">
                <h3 className="text-gray-900 font-semibold text-[14.5px] leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {account.title}
                </h3>
                
                <div className="flex items-center gap-2 mt-auto flex-wrap">
                    <span className="bg-[#1f2228] text-white text-[11px] font-bold px-3 py-1 rounded-[7px] tracking-wide whitespace-nowrap shadow-sm">
                        {formatCurrency(account.price)}
                    </span>
                    <span className="text-gray-200 font-light">|</span>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-[7px] tracking-wide whitespace-nowrap transition-colors ${
                        isAvailable 
                            ? 'bg-[#1f2228] text-white' 
                            : 'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                        {isAvailable ? `${account.stock} Pcs` : 'Sold Out'}
                    </span>
                </div>
            </div>

            {/* Right Action */}
            <div className="shrink-0 pl-1">
                <button className="bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white transition-all duration-200 p-2.5 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 active:scale-90">
                    <ShoppingBag size={20} strokeWidth={2.2} />
                </button>
            </div>
        </motion.div>
    );
};

export default ProductCard;

