import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProductById,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
  getProductsForSeller,
  getProductsByCategory,
} from '../controllers/productController.js';
import {  protect, sellerAndAdminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();
  router.route('/category/:category').get(getProductsByCategory)
router.get('/top', getTopProducts);
router.route('/').get(getProducts).post(protect, sellerAndAdminProtect, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('seller').get(protect , getProductsForSeller)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, sellerAndAdminProtect, deleteProductById)
  .put(protect, sellerAndAdminProtect, updateProduct);

export default router;
