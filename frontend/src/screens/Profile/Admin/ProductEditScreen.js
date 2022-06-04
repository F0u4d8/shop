import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { listProductDetails, updateProduct } from '../../../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../../../constants/productConstants'
import DropNotif from "../../../components/Modal"


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

 const  {id} = useParams();
  
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
    const navigate = useNavigate()

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: succesUpdate,
  } = productUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }


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
    
  }, [dispatch, id, product, succesUpdate , navigate , userInfo]);

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

  

 

  return (
    <>
      <Container className="mb-5">
        <Link to="/profile" className="btn btn-primary my-3">
          Go Back
        </Link>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
    {succesUpdate && (<DropNotif
            heading="Update Product"
            text="Update Product Successfully"
            resetData={() => {
              dispatch({ type: PRODUCT_UPDATE_RESET });
            }}
          ></DropNotif>)}
          
        
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
             <Form.Control
               type='file'
              
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader/>}
            </Form.Group>
            <Col xs={6} md={4}>
              <Image className="img-fluid" src={image} rounded />
            </Col>

            <Form.Group controlId="brand">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter brand"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>numTlf</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter "
                value={numTlf}
                onChange={(e) => setNumTlf(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="desc">
              <Form.Label>description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="selection">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                placeholder="Enter the category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="plastique">Plastique</option>
                <option value="verre">Verre</option>
                <option value="bois">Bois</option>
                <option value="metal">Metal</option>
                <option value="batterie">Batterie</option>
               
              </Form.Control>
            </Form.Group>

            

            <Button className="mt-3" type="submit" variant="primary">
              Update
            </Button>
            <Link
              to={`/product/${product._id}`}
              className="btn btn-primary mt-3 ms-3"
            >
              Go to product
            </Link>
          </Form>
        )}
      </Container>
    </>
  );
};

export default ProductEditScreen;