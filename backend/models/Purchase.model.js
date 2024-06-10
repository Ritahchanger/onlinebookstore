const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

const purchasedItemSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    purchaseDate: {
      type: String,
      default: () => formatDate(new Date())
    }
  }]
});

const PurchasedItem = mongoose.model('PurchasedItem', purchasedItemSchema);

module.exports = PurchasedItem;
