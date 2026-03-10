import { useState } from 'react';
import { X } from 'lucide-react';
import API from '../services/api';
import { toast } from 'react-hot-toast';

const AddListingModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        platform: 'instagram',
        type: 'Aged',
        description: '',
        price: '',
        stock: '1',
        credentials: '',
        image: ''
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    if (!isOpen) return null;

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const uploadData = new FormData();
        uploadData.append('image', file);
        setUploading(true);

        try {
            const { data } = await API.post('/upload', uploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setFormData({ ...formData, image: data });
            toast.success('Image Uploaded');
            setUploading(false);
        } catch (error) {
            toast.error('Image upload failed');
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await API.post('/accounts', formData);
            toast.success('Listing added successfully!');
            onSuccess();
            onClose();
            // Reset form
            setFormData({
                title: '', platform: 'instagram', type: 'Aged',
                description: '', price: '', stock: '1', credentials: '', image: ''
            });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add listing');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#faf9f6] dark:bg-[#1e293b] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-fade-in relative border border-gray-200 dark:border-white/10">
                <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Listing</h2>
                    <button onClick={onClose} className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-500/10 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Title</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                                placeholder="E.g., 2018 Verified Instagram"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Platform</label>
                            <select
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors cursor-pointer"
                                value={formData.platform}
                                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                            >
                                <option value="instagram">Instagram</option>
                                <option value="twitter">Twitter (X)</option>
                                <option value="facebook">Facebook</option>
                                <option value="tiktok">TikTok</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Account Type</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                                placeholder="E.g., Aged, High Follower"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Price (₦)</label>
                            <input
                                required
                                type="number"
                                min="1"
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                                placeholder="E.g., 150"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Stock Amount</label>
                            <input
                                required
                                type="number"
                                min="1"
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Image Upload</label>
                            <input
                                required={!formData.image}
                                type="file"
                                id="image-file"
                                accept="image/*"
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white cursor-pointer"
                                onChange={uploadFileHandler}
                            />
                            {uploading && <p className="text-xs text-primary mt-1">Uploading image...</p>}
                            {formData.image && <p className="text-xs text-green-500 mt-1">Image ready</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Credentials (For Buyer Only)</label>
                        <textarea
                            required
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors h-24 resize-none"
                            placeholder="username:password / Email details (Only visible after purchase)"
                            value={formData.credentials}
                            onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Public Description</label>
                        <textarea
                            required
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors h-24 resize-none"
                            placeholder="What makes this account special?"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                            Cancel
                        </button>
                        <button disabled={loading || uploading} type="submit" className="btn-primary py-3 px-8 text-sm">
                            {(loading || uploading) ? 'Please wait...' : 'Add to Market'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddListingModal;
