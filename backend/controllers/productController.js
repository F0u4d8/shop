import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

const getProducts = asyncHandler(async (req, res) => {
  const keyWord = req.query.keyWord ? {name: {$regex: req.query.keyWord , $options:'i'}} : {}
  const products = await Product.find({...keyWord});
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
  const product = new Product({
    name: 'sample name',
    prix: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'sample category',
    adress: 'dfsgdfg',
    description: 'gfdsgsd',
    numTlf: 1232564,
    quantity: 200,
  });
  const createdProduct = await product.save();

  res.status(201).json(product);
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
    (product.name = name),
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
  const products = await Product.find({}).sort({rating: -1}).limit(3)

res.json(products)

});
export {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createProductReview,getTopProducts
};
