import mongoose from 'mongoose';
const commentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    orderItem: [
      {
      name:{type: String , required : true},
        image: { type: String, required: true },
        prix: {type:Number , required:true},
        product: {type: mongoose.Schema.Types.ObjectId, required: true , ref: 'Product'}
      },
    ],
    isPaid: { type: Boolean, required: true , default: false },
    isDelivred: { type: Boolean, required: true , default: false },
    paidAt: { type: Date },
    seller: { type: mongoose.Schema.Types.ObjectId, required: true , ref:'User'},
        buyer: { type: mongoose.Schema.Types.ObjectId, required: true , ref:'User'},
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
