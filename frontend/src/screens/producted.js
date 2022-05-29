import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import axios from 'axios';

const ProductEditScreen = () => {
  const [name, setName] = useState('');
  const [prix, setPrix] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [adress, setAdress] = useState('');
  const [description, setDescription] = useState('');
  const [numTlf, setNumTlf] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [uploading, setUploading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: succesUpdate,
  } = productUpdate;

  useEffect(() => {
    if (succesUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/productlist');
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrix(product.prix);
        setImage(product.image);
        setAdress(product.adress);
        setCategory(product.category);
        setDescription(product.description);
        setNumTlf(product.numTlf);
        setQuantity(product.quantity);
      }
    }
  }, [dispatch, id, navigate, product, succesUpdate]);



  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        prix,
        image,
        adress,
        category,
        description,
        numTlf,
        quantity,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        go back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="prix">
              <Form.Label>prix</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter prix"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>image</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
               type='file'
              id='image-file'
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader/>}
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>product address</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter adress"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>product category</Form.Label>
              <Form.Control
                type="text"
                label="category "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>product description</Form.Label>
              <Form.Control
                type="text"
                label="description "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="numTlf">
              <Form.Label>product numTlf</Form.Label>
              <Form.Control
                type="number"
                label="numTlf "
                value={numTlf}
                onChange={(e) => setNumTlf(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="quantity">
              <Form.Label>product quantity</Form.Label>
              <Form.Control
                type="number"
                label="quantity "
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button className="my-3" variant="primary" type="submit">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
