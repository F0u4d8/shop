import mongoose from 'mongoose';
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const commentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);
const productSchema = mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    sellerName: {
      type: String,
      require: true,
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    prix: { type: Number, required: true, default: 0 },
    adress: { type: String, required: false },
    description: { type: String  },
 
    numTlf: { type: Number, required: true },
    quantity: {type: Number, required : false},
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },

    comment: [commentSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
