import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

const getProducts = asyncHandler(async (req, res) => {
  const keyWord = req.query.keyWord
    ? { name: { $regex: req.query.keyWord, $options: 'i' } }
    : {};
  const products = await Product.find({ ...keyWord });
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('product not found');
  }
});

const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'product removed successfully' });
  } else {
    res.status(404);
    throw new Error('product not found');
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    
    name,
    prix,

    image,
    category,
    adress,
    description,
    numTlf,
    quantity,
  } = req.body;
  const product = new Product({
    sellerName:req.user.name,
    name,
    prix,
    seller: req.user._id,
    image,
    category,
    adress,
    numTlf,
    quantity,
    description,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    prix,

    image,
    category,
    adress,
    description,
    numTlf,
    quantity,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    (product.prix = prix),
      (product.category = category),
      (product.adress = adress),
      (product.description = description),
      (product.quantity = quantity),
      (product.numTlf = numTlf);
    product.image = image;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('product not found');
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('product already reviewed');
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'review added' });
  } else {
    res.status(404);
    throw new Error('product not found');
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});


const getProductsForSeller = asyncHandler(async (req, res) => {
  const user = req.user;
  const products = await Product.find({ seller: user.id });
  if (products) {
    res.json(products);
  } else {
    res.status(400);
    throw new Error("Cant get product lists");
  }
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({
    category: req.params.category,
  })

  res.json( products )
})


export {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,getProductsForSeller,getProductsByCategory
};


