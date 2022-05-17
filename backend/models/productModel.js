import mongoose from 'mongoose';
const commentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    prix: { type: Number, required: true, default: 0 },
    adress: { type: String, required: true },
    description: { type: String  },
    numTlf: { type: Number, required: true },
    quantity: {type: String, required : true},

    comment: [commentSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
