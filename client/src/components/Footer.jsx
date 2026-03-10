import { Link } from 'react-router-dom';
import { ShieldCheck, Send, Twitter, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-50 dark:bg-dark-bg/80 border-t border-gray-200 dark:border-white/5 pt-24 pb-12 px-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 text-center md:text-left">
                <div className="col-span-1 md:col-span-2">
                    <Link to="/" className="text-3xl font-black mb-8 block tracking-tighter">
                        <span className="bg-primary px-3 py-1 rounded-xl text-white shadow-xl shadow-primary/30">BIGGEST</span>
                        <span className="text-gray-900 dark:text-white ml-2">LOGS</span>
                    </Link>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed text-lg mx-auto md:mx-0">
                        The world's most trusted marketplace for verified social media accounts and digital assets.
                        High-quality logs with automated delivery and <span className="text-primary font-bold italic">escrow protection</span>.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-8 text-gray-900 dark:text-white uppercase tracking-widest text-xs">Marketplace</h4>
                    <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                        <li><Link to="/shop" className="hover:text-primary transition-colors">All Accounts</Link></li>
                        <li><Link to="/shop?platform=instagram" className="hover:text-primary transition-colors">Instagram Logs</Link></li>
                        <li><Link to="/shop?platform=twitter" className="hover:text-primary transition-colors">Twitter (X) Hub</Link></li>
                        <li><Link to="/shop?platform=facebook" className="hover:text-primary transition-colors">Facebook Assets</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-8 text-gray-900 dark:text-white uppercase tracking-widest text-xs">Community & Support</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-[200px]">For all inquiries and complaints, join our Telegram:</p>
                    <div className="flex justify-center md:justify-start gap-4">
                        <SocialIcon icon={<Send size={20} className="text-[#0088cc]" />} href="https://t.me/everythinglogs1" />
                        <SocialIcon icon={<Twitter size={20} />} href="#" />
                        <SocialIcon icon={<Github size={20} />} href="#" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-gray-200 dark:border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 dark:text-gray-400 text-sm font-medium">
                <div className="flex items-center gap-6">
                    <p>© 2026 BIGGESTLOGS®.</p>
                    <div className="hidden md:flex gap-6">
                        <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                        <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                        <ShieldCheck size={18} /> <span className="font-bold uppercase tracking-tighter">SSL SECURED</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon, href }) => (
    <a
        href={href}
        className="w-12 h-12 glass rounded-2xl flex items-center justify-center bg-[#faf9f6] dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white hover:bg-primary hover:text-white transition-all transform hover:scale-110"
    >
        {icon}
    </a>
);

export default Footer;
