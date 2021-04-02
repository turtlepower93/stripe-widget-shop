const Order = require('../../models/order');

module.exports = {
    getCart,
    addToCart,
    changeWidgetQuantity,
    checkout,
    getConfirmation
}

async function getConfirmation(req, res) {
    try {
        const orders = await Order.getUserOrders(req.user._id);
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function getCart(req, res) {
    try {
        const cart = await Order.getCart(req.user._id);
        res.status(200).json(cart.lineWidgets);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function addToCart(req, res) {
    try {
        const cart = await Order.getCart(req.user._id);
        await cart.addWidgetToCart(req.params.id, req.body.quantity);
        res.status(200).json(cart.lineWidgets);
    } catch (error) {
        res.status(404).json({message: error.message });
    }
}

async function changeWidgetQuantity(req, res) {
    try {
        const cart = await Order.getCart(req.body.user._id);
        await cart.setWidgetQuantity(req.body.widgetId, req.body.newQuantity);
        res.status(200).json(cart);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function checkout(req, res) {
    try {
        const cart = await Order.getCart(req.user._id);
        cart.isPaid = true;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}