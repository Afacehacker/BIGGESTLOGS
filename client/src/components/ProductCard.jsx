import { motion } from 'framer-motion';
import { BadgeCheck, ShieldAlert, Zap, ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ account }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="glass-card flex flex-col h-full group relative overflow-hidden"
        >
            {/* Platform Badge */}
            <div className="absolute top-4 right-4 z-10">
                <span className="bg-primary/20 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-primary-light uppercase border border-primary/30">
                    {account.platform}
                </span>
            </div>

            {/* Image Container */}
            <div className="relative h-48 mb-6 overflow-hidden rounded-xl bg-dark-bg/50 border border-white/5">
                <img
                    src={account.image || 'https://via.placeholder.com/300x200'}
                    alt={account.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-60" />

                {/* Quality Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-[10px] font-bold border border-green-500/30">
                    <BadgeCheck size={12} /> {account.quality}% Quality
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary-light transition-colors line-clamp-1">
                    {account.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {account.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {account.badges?.map((badge, i) => (
                        <span key={i} className="text-[10px] bg-white/5 px-2 py-0.5 rounded uppercase font-bold text-gray-400 border border-white/5 tracking-wider">
                            {badge}
                        </span>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Starting At</p>
                    <p className="text-xl font-bold text-white">${account.price}</p>
                </div>

                <Link
                    to={`/shop/${account._id}`}
                    className="bg-primary/20 hover:bg-primary text-primary-light hover:text-white p-3 rounded-xl transition-all duration-300"
                >
                    <ArrowRight size={20} />
                </Link>
            </div>
        </motion.div>
    );
};

export default ProductCard;
