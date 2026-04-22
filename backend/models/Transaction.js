const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true, enum: ['income', 'expense'] },
  note: { type: String }
}, { timestamps: true });

transactionSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
