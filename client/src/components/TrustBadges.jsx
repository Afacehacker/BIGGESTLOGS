import { motion } from 'framer-motion';
import { Users, Truck, CheckCircle, ShieldCheck } from 'lucide-react';

const TrustBadges = () => {
    const stats = [
        { icon: <Users className="text-emerald-600 dark:text-emerald-400" />, value: '15k+', label: 'Active Users' },
        { icon: <CheckCircle className="text-emerald-500" />, value: '100%', label: 'Success Rate' },
        { icon: <Truck className="text-teal-500" />, value: '50k+', label: 'Deliveries' },
        { icon: <ShieldCheck className="text-emerald-600 dark:text-emerald-400" />, value: '24/7', label: 'Support' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-8 sm:py-12">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card flex flex-col items-center text-center group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800"
                >
                    <div className="mb-3 sm:mb-4 bg-emerald-50 dark:bg-slate-800 p-3.5 sm:p-4 rounded-2xl group-hover:bg-emerald-100 dark:group-hover:bg-slate-700 transition-all duration-300 border border-emerald-100 dark:border-slate-700">
                        {stat.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black mb-1 text-slate-900 dark:text-white">{stat.value}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium">{stat.label}</p>
                </motion.div>
            ))}
        </div>
    );
};

export default TrustBadges;

