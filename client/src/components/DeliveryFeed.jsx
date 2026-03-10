import { motion } from 'framer-motion';
import { Package, MapPin, ExternalLink } from 'lucide-react';

const deliveries = [
    { id: 1, user: 'U***91', platform: 'Instagram', price: '₦45,000', time: '2 mins ago' },
    { id: 2, user: 'D***k2', platform: 'Twitter (X)', price: '₦120,000', time: '5 mins ago' },
    { id: 3, user: 'K***s1', platform: 'Facebook', price: '₦85,000', time: '8 mins ago' },
];

const DeliveryFeed = () => {
    return (
        <div className="glass-card h-full flex flex-col">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Package className="text-primary" /> Recent Deliveries
            </h3>
            <div className="space-y-4 flex-grow">
                {deliveries.map((delivery, index) => (
                    <motion.div
                        key={delivery.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary-light">
                                {delivery.platform[0]}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white uppercase">{delivery.user}</p>
                                <p className="text-xs text-gray-400">{delivery.platform} • {delivery.price}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-green-400 font-bold uppercase">{delivery.time}</p>
                            <ExternalLink size={12} className="ml-auto mt-1 text-gray-600 group-hover:text-primary transition-colors" />
                        </div>
                    </motion.div>
                ))}
            </div>
            <button className="mt-6 w-full py-2 text-xs font-bold text-primary-light hover:text-white transition-colors border-t border-white/5 pt-4">
                VIEW DELIVERY PROOFS →
            </button>
        </div>
    );
};

export default DeliveryFeed;
