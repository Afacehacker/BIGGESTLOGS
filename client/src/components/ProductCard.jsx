import { ShoppingBag, Eye, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ account, onPreview }) => {
    const navigate = useNavigate();
    
    // Formatter for Currency
    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 2,
        }).format(val || 0).replace('NGN', '₦');
    };

    // Render Product Picture / Platform Brand Image in exact w-12 h-12 rounded-2xl shape
    const getProductPicture = () => {
        // Priority 1: User uploaded account image or media picture
        const mediaUrl = account.image || (account.media && account.media.length > 0 ? account.media[0] : null);
        
        if (mediaUrl) {
            return (
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 overflow-hidden shrink-0 shadow-sm">
                    <img 
                        src={mediaUrl} 
                        alt={account.title || 'Product'} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=150&q=80';
                        }}
                    />
                </div>
            );
        }

        // Priority 2: High-Quality Platform Brand Images in exact w-12 h-12 rounded-2xl container
        const plat = (account.platform || '').toLowerCase();
        
        if (plat.includes('tiktok')) {
            return (
                <div className="w-12 h-12 rounded-2xl bg-black overflow-hidden shrink-0 shadow-md border border-slate-700 flex items-center justify-center p-0.5">
                    <img 
                        src="https://images.unsplash.com/photo-1598128558393-70ff21433be0?auto=format&fit=crop&w=150&q=80" 
                        alt="TikTok" 
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>
            );
        }

        if (plat.includes('facebook')) {
            return (
                <div className="w-12 h-12 rounded-2xl bg-[#1877F2] overflow-hidden shrink-0 shadow-md flex items-center justify-center p-0.5">
                    <img 
                        src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=150&q=80" 
                        alt="Facebook" 
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>
            );
        }

        if (plat.includes('instagram')) {
            return (
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 overflow-hidden shrink-0 shadow-md p-0.5">
                    <img 
                        src="https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=150&q=80" 
                        alt="Instagram" 
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>
            );
        }

        if (plat.includes('twitter') || plat.includes('x')) {
            return (
                <div className="w-12 h-12 rounded-2xl bg-black overflow-hidden shrink-0 shadow-md border border-slate-700 p-0.5">
                    <img 
                        src="https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=150&q=80" 
                        alt="Twitter X" 
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>
            );
        }

        if (plat.includes('telegram')) {
            return (
                <div className="w-12 h-12 rounded-2xl bg-[#0088cc] overflow-hidden shrink-0 shadow-md p-0.5">
                    <img 
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80" 
                        alt="Telegram" 
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>
            );
        }

        // Default Product Image container
        return (
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-slate-800 flex items-center justify-center shadow-sm overflow-hidden border border-emerald-100 dark:border-slate-700 shrink-0">
                <img 
                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=150&q=80" 
                    alt="Digital Product" 
                    className="w-full h-full object-cover" 
                />
            </div>
        );
    };

    const isAvailable = (account.stock || 0) > 0;

    return (
        <div 
            className="bg-white dark:bg-slate-900 rounded-[1.5rem] p-3.5 sm:p-4 flex gap-3 sm:gap-3.5 items-center shadow-sm border border-gray-100 dark:border-slate-800 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 w-full mb-3 group relative overflow-hidden"
        >
            {/* Left Picture Icon Frame */}
            <div 
                onClick={() => navigate(`/shop/${account._id}`)}
                className="shrink-0 flex items-center justify-center transform group-hover:scale-105 transition-transform cursor-pointer relative"
            >
                {getProductPicture()}
                {account.quality && (
                    <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-0.5 rounded-full border-2 border-white dark:border-slate-900 shadow-xs" title={`Quality: ${account.quality}%`}>
                        <CheckCircle2 size={11} strokeWidth={3} />
                    </div>
                )}
            </div>

            {/* Middle Content */}
            <div 
                onClick={() => navigate(`/shop/${account._id}`)}
                className="flex-grow flex flex-col justify-center min-w-0 pr-1 cursor-pointer"
            >
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-slate-900 dark:text-white font-extrabold text-[13px] sm:text-[15px] leading-snug line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {account.title}
                    </h3>
                </div>
                
                <div className="flex items-center gap-1.5 sm:gap-2 mt-auto flex-wrap">
                    <span className="bg-emerald-600 text-white text-[11px] sm:text-xs font-extrabold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-[8px] tracking-wide whitespace-nowrap shadow-xs">
                        {formatCurrency(account.price)}
                    </span>
                    <span className="text-gray-300 dark:text-slate-700 font-bold hidden sm:inline">|</span>
                    <span className={`text-[11px] sm:text-xs font-extrabold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-[8px] tracking-wide whitespace-nowrap ${
                        isAvailable 
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                            : 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border border-red-100 dark:border-red-900'
                    }`}>
                        {isAvailable ? `${account.stock} Available` : 'Sold Out'}
                    </span>
                </div>
            </div>

            {/* Right Actions */}
            <div className="shrink-0 flex items-center gap-1.5 sm:gap-2 pl-1">
                {onPreview && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onPreview(account);
                        }}
                        title="Quick Preview"
                        className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors border border-emerald-100 dark:border-slate-700 active:scale-95"
                    >
                        <Eye size={17} />
                    </button>
                )}

                <button
                    onClick={() => navigate(`/shop/${account._id}`)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform active:scale-95"
                    title="Buy Now"
                >
                    <ShoppingBag size={18} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

