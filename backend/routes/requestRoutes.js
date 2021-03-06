import express from "express";
const router = express.Router();
import {  approveProductRequest, createRequest , getAllRequest , getRequestById} from '../controllers/requestController.js'
import {protect , admin} from '../middleware/authMiddleware.js'

router.route('/approve/:id').put(protect, admin, approveProductRequest)
router.route('/').post(protect, createRequest)
router.route('/all').get(protect, admin, getAllRequest)
router.route('/:id').get(protect,admin,getRequestById)


export default router