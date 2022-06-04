import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Request from '../models/requestModel.js';
import Product from '../models/productModel.js';

// @desc    Request for becoming a new seller
// @route   POST /api/request/newSeller
// @access  Public
const createRequest = asyncHandler(async (req, res) => {
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
  const user = req.user;

  const isRequestExists = await Request.find({ seller: user._id });

  if (isRequestExists.length > 0) {
    res.status(400);
    if (isRequestExists[0].approved) {
      throw new Error('Already request, and hase been approved');
    } else {
      throw new Error('Aleady requested, waiting for approval');
    }
  } else {
    const newRequest = {
      sellerName: user.name,
      name,
      prix,
      seller: user,
      image,
      category,
      adress,
      numTlf,
      quantity,
      description,
    };

    const result = await Request.create(newRequest);

    if (result) {
      res.json(result);
    } else {
      res.status(404);
      throw new Error("Couldn't create new request");
    }
  }
});

// @desc    Get all the requests
// @route   POST /api/request/all
// @access  admin
const getAllRequest = asyncHandler(async (req, res) => {
  const result = await Request.find({});

  if (result) {
    res.json(result);
  } else {
    res.status(404);
    throw new Error("Couldn't get any requests");
  }
});

// @desc    Get request by id
// @route   GET /api/request/:id
// @access  admin
const getRequestById = asyncHandler(async (req, res) => {
  const re = await Request.findById(req.params.id)

  if (re) {
    res.json(re);
  } else {
    res.status(404);
    throw new Error("Couldn't find the request");
  }
});

// @desc    Approve seller request
// @route   PUT /api/request/approve/:id
// @access  admin
const approveProductRequest = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);
  if (request) {
    const product = new Product({
        sellerName:request.sellerName,
        name:request.name,
        prix:request.prix,
        seller: request.seller,
        image:request.image,
        category:request.category,
        adress:request.adress,
        numTlf:request.numTlf,
        quantity:request.quantity,
        description:request.description,
      });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);

    await request.remove();
  } else {
    res.status(404);
    throw new Error('Request not found');
  }
});

export { createRequest, getAllRequest, getRequestById, approveProductRequest };
