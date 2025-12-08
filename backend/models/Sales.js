const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    
    customer: {
      customerId: { type: String },
      name: { type: String },
      phone: { type: String },
      gender: { type: String },
      age: { type: Number },
      region: { type: String },
      type: { type: String }
    },

    product: {
      sku: { type: String },
      name: { type: String },
      brand: { type: String },
      category: { type: String },
      price: { type: Number }
    },

    quantity: { type: Number, required: true },
    tags: [{ type: String }],

    pricing: {
      discount: { type: Number },
      totalAmount: { type: Number },
      finalAmount: { type: Number }
    },

    paymentMethod: { type: String },

    operational: {
      orderId: { type: String },
      status: { type: String },
      deliveryType: { type: String }
    },

    store: {
      storeId: { type: String },
      location: { type: String }
    },

    salesperson: {
      id: { type: String },
      name: { type: String }
    }
  },
  { timestamps: true }
)
module.exports = mongoose.model('Sale', SaleSchema);
