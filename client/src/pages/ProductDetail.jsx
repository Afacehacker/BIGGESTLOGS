import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ChevronLeft, UploadCloud, Info, Check, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);

    // Payment State
    const [paymentMethod, setPaymentMethod] = useState('Crypto (USDT/BTC)');
    const [paymentProof, setPaymentProof] = useState('');
    const [uploadingReceipt, setUploadingReceipt] = useState(false);
    const [placingOrder, setPlacingOrder] = useState(false);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const { data } = await API.get(`/accounts/${id}`);
                setAccount(data);
            } catch (error) {
                toast.error('Account not found or removed');
                navigate('/shop');
            }
            setLoading(false);
        };
        fetchAccount();
    }, [id, navigate]);

    const handleReceiptUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('image', file);
        setUploadingReceipt(true);

        try {
            const { data } = await API.post('/upload', uploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setPaymentProof(data);
            toast.success('Receipt Uploaded successfully');
        } catch (error) {
            toast.error('Failed to upload receipt');
        } finally {
            setUploadingReceipt(false);
        }
    };

    const handlePurchase = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('Please login to continue');
            navigate('/login');
            return;
        }

        if (!paymentProof) {
            toast.error('Please upload your payment receipt');
            return;
        }

        setPlacingOrder(true);
        try {
            await API.post('/orders', {
                accountId: account._id,
                paymentMethod,
                paymentProof,
            });
            toast.success('Order placed successfully! Awaiting verification.');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setPlacingOrder(false);
        }
    };

    if (loading) {
        return (
            <div className="pt-32 pb-20 flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!account) return null;

    return (
        <div className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
            <Link to="/shop" className="inline-flex items-center text-gray-500 hover:text-white transition-colors mb-8 group">
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Marketplace</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left side: Image and details */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div className="bg-gray-100 dark:bg-dark-bg/50 rounded-3xl p-4 border border-gray-200 dark:border-white/10 flex items-center justify-center min-h-[400px]">
                        {/* object-contain ensures the image is ALWAYS shown fully without cropping */}
                        <img
                            src={account.image || 'https://via.placeholder.com/600'}
                            alt={account.title}
                            className="max-w-full max-h-[500px] object-contain rounded-xl shadow-2xl"
                        />
                    </div>

                    <div className="glass-card">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Info className="text-primary" size={20} />
                            Account Details
                        </h2>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex justify-between items-center py-2 border-b border-white/5">
                                <span>Platform</span>
                                <span className="font-bold text-white uppercase">{account.platform}</span>
                            </li>
                            <li className="flex justify-between items-center py-2 border-b border-white/5">
                                <span>Type</span>
                                <span className="font-bold text-white">{account.type}</span>
                            </li>
                            <li className="flex justify-between items-center py-2 border-b border-white/5">
                                <span>Quality Score</span>
                                <span className="font-bold text-green-400">{account.quality}%</span>
                            </li>
                            <li className="flex justify-between items-center py-2">
                                <span>Status</span>
                                <span className={`font-bold ${account.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {account.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Right side: Purchase Flow */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {account.badges?.map((badge, i) => (
                                <span key={i} className="text-[10px] bg-primary/20 text-primary-light px-3 py-1 rounded-full uppercase font-bold tracking-wider border border-primary/30">
                                    {badge}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">{account.title}</h1>
                        <p className="text-gray-500 text-lg leading-relaxed mb-6">{account.description}</p>

                        <div className="text-4xl font-bold text-white mb-8 border-b border-white/10 pb-8">
                            ₦{account.price}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/10 to-transparent p-6 rounded-3xl border border-primary/20">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <ShieldCheck className="text-primary" /> Purchase This Account
                        </h3>

                        {account.stock <= 0 ? (
                            <div className="bg-red-500/10 text-red-500 p-4 rounded-xl text-center font-bold">
                                Temporarily out of stock! Check back later.
                            </div>
                        ) : !user ? (
                            <div className="text-center bg-white/5 p-6 rounded-2xl">
                                <p className="mb-4 text-gray-400">Create an account or login to complete your purchase securely.</p>
                                <Link to="/login" className="btn-primary w-full py-3 inline-block">Login to Purchase</Link>
                            </div>
                        ) : (
                            <form onSubmit={handlePurchase} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <h4 className="font-bold text-sm mb-2 text-white/80">Step 1: Make Payment</h4>
                                        <p className="text-xs text-gray-400 mb-4 whitespace-pre-line leading-relaxed">
                                            Transfer exactly <strong>₦{account.price}</strong> to the account provided below on our Telegram channel or Admin line directly.
                                        </p>
                                        <div className="bg-dark-bg/50 p-3 rounded-lg border border-white/5 mb-4">
                                            <p className="text-gray-300 text-sm flex justify-between border-b border-white/5 pb-2 mb-2">
                                                <span>Account Name:</span>
                                                <span className="font-bold text-white">Boluwatife Ogunmuyiwa</span>
                                            </p>
                                            <p className="text-gray-300 text-sm flex justify-between border-b border-white/5 pb-2 mb-2">
                                                <span>Account Number:</span>
                                                <span className="font-bold text-primary-light text-lg">7025860259</span>
                                            </p>
                                            <p className="text-gray-300 text-sm flex justify-between">
                                                <span>Bank Name:</span>
                                                <span className="font-bold text-white">MOMO PSB</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 mb-2">Payment Method</label>
                                        <select
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary transition-colors outline-none cursor-pointer"
                                        >
                                            <option value="Bank Transfer">Bank Transfer (Naira)</option>
                                            <option value="Crypto (USDT/BTC)">Crypto (USDT / BTC)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 mb-2">Step 2: Upload Payment Proof</label>
                                        <div className="relative border-2 border-dashed border-white/20 rounded-2xl p-6 hover:border-primary/50 transition-colors text-center bg-white/5">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                required={!paymentProof}
                                                onChange={handleReceiptUpload}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            {uploadingReceipt ? (
                                                <div className="text-primary text-sm font-bold animate-pulse">Uploading receipt...</div>
                                            ) : paymentProof ? (
                                                <div className="text-green-500 tracking-wider flex items-center justify-center gap-2 font-bold text-sm">
                                                    <Check size={18} /> Receipt successfully attached
                                                </div>
                                            ) : (
                                                <div className="text-gray-400 flex flex-col items-center">
                                                    <UploadCloud size={32} className="mb-2 text-gray-500" />
                                                    <span className="text-sm">Click or drag a screenshot of your transfer</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={placingOrder || uploadingReceipt || !paymentProof}
                                    className="btn-primary w-full py-4 text-base tracking-wider disabled:opacity-50"
                                >
                                    {placingOrder ? 'Processing...' : 'Submit Order For Verification'}
                                </button>
                                <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest mt-4 flex justify-center items-center gap-1">
                                    <ShieldCheck size={12} /> Protected by Escrow Security
                                </p>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;
