const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const widgetSchema = require('./widgetSchema');

const lineWidgetSchema = new Schema({
    quantity: {type: Number, default: 1},
    widget: widgetSchema
},{
    timestamps:true,
    toJSON: {virtuals: true}
});

lineWidgetSchema.virtual('extPrice').get(function() {
    return this.quantity * this.widget.price
});

const orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    lineWidgets: [lineWidgetSchema],
    isPaid: {type: Boolean, default:false},
}, {
    timestamps:true,
    toJSON: {virtuals: true},
});

orderSchema.virtual('orderDate').get(function() {
    return this.createdAt.toLocaleDateString();
});

orderSchema.virtual('totalQty').get(function() {
    return this.lineWidgets.reduce((total, widgets) => total + widget.quantity, 0);
});

orderSchema.virtual('totalPrice').get(function() {
    return this.lineWidgets.reduce((total, widgets) => total + widget.extPrice, 0);
});

orderSchema.virtual('orderId').get(function() {
    return this.id.slice(-6).toUpperCase();
});

orderSchema.statics.getUserOrders = async function(userId)  {
    return this.find({ user: userId, isPaid: true}).sort('-updatedAt').lean();
};

orderSchema.statics.getCart = async function(userId) {
    return this.findOneAndUpdate(
        { user: userId, isPaid: false },
        { user: userId },
        { upsert: true, new: true },
    );
}

orderSchema.methods.addWidgetToCart = async function(widgetId, widgetQuantity) {
    const cart = this;
    const lineWidget = cart.lineWidgets.find(lineWidget => lineWidget.widget._id.equals(widgetId));
    if(lineWidget) {
        lineWidget.quantity = widgetQuantity;
    } else {
        const widget = await mongoose.model('Widget').findById(widgetId);
        console.log(cart)
        cart.quantity = widgetQuantity;
        console.log('Second Time Widget ', widget)
        cart.lineWidgets.push({ widget });
        const newWidgets = cart.lineWidgets.find(lineWidget => lineWidget.widget._id.equals(widgetId));
        newWidgets.quantity = widgetQuantity;
    }
    return cart.save();
}

orderSchema.methods.setWidgetQuantity = async function(widgetId, newQuantity) {
    const cart = this;
    const lineWidget = cart.lineWidgets.find(lineWidget => lineWidget.widget._id.equals(widgetId));
    if(lineWidget && newQuantity <= 0) {
        lineWidget.remove();
    } else if (lineWidget) {
        lineWidget.quantity = newQuantity;
    }
    return cart.save();
}

module.exports = mongoose.model('Order', orderSchema);