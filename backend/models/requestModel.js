import mongoose from 'mongoose';
const requestSchema = mongoose.Schema(
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
   
    approved: {
      type: Boolean,
      default: false,
      require: true,
    }

  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema)

export default Request