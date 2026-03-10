const Order = require('../models/Order');
const Account = require('../models/Account');

// @desc    Create new order
// @route   POST /api/orders
const addOrderItems = async (req, res) => {
    const { accountId, paymentMethod, paymentProof } = req.body;

    const account = await Account.findById(accountId);
    if (!account || account.stock <= 0) {
        res.status(400).json({ message: 'Account out of stock or not found' });
        return;
    }

    const order = new Order({
        user: req.user._id,
        account: accountId,
        orderId: 'LOG-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        paymentMethod,
        paymentProof,
        status: 'pending'
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('account');

    if (order) {
        // Only allow owner or admin to see
        if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate('account');
    res.json(orders);
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
const getOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name').populate('account');
    res.json(orders);
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = req.body.status || order.status;
        if (order.status === 'completed') {
            order.deliveredAt = Date.now();
            // Deduct stock if finished
            const account = await Account.findById(order.account);
            if (account) {
                account.stock = Math.max(0, account.stock - 1);
                await account.save();
            }
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

module.exports = { addOrderItems, getOrderById, getMyOrders, getOrders, updateOrderStatus };
