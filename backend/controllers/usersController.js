import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,

      portFeulle: user.portFeulle,
      isAdmin: user.isAdmin,
      adress: user.adress,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('invalid email or password');
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, adress } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('user already exist');
  }

  const user = await User.create({ name, email, password, adress });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      portFeulle: user.portFeulle,
      isAdmin: user.isAdmin,
      adress: user.adress,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('invalid user data');
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      portFeulle: user.portFeulle,
      isAdmin: user.isAdmin,
      adress: user.adress,
    });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.adress = req.body.adress || user.adress;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,

      portFeulle: updatedUser.portFeulle,
      isAdmin: updatedUser.isAdmin,
      adress: updatedUser.adress,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});


const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
res.json(users)
  
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
if(user){
await user.remove()
res.json({message : 'user removed'})

}else{

  res.status(404)
  throw new Error('user does not exist')
}
  
});



const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('user not found')
  }

  
});



const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.adress = req.body.adress || user.adress;
   user.isAdmin = req.body.isAdmin 
   user.portFeulle = req.body.portFeulle || user.portFeulle
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,

      portFeulle: updatedUser.portFeulle,
      isAdmin: updatedUser.isAdmin,
      adress: updatedUser.adress,
     
    });
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});


export { authUser, getUserProfile, registerUser ,updateUserProfile , getUsers , deleteUser , getUserById , updateUser};
