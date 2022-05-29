import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProductReview, listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
   
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  useEffect(() => {
    if(successReviewCreate){
alert('review submitted')
setRating(0)
setComment('')
dispatch({type:PRODUCT_CREATE_REVIEW_RESET})


    }
    dispatch(listProductDetails(id));
  }, [dispatch, id , successReviewCreate]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id , {rating , comment}))
  };

  return (
    <>
      <Link className="btn btn-light my-3 " to="/">
        go back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image className="large" src={product.image} alt={product.name} />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>category: {product.category}</ListGroup.Item>
                <ListGroup.Item>quantity: {product.quantity}</ListGroup.Item>
                <ListGroup.Item>
                  description: {product.description}
                </ListGroup.Item>
                <ListGroup.Item>adresse:{product.adress}</ListGroup.Item>
                <ListGroup.Item>
                  prix: <strong>{product.prix}</strong>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>numTlf: </Col>
                      <Col>{product.numTlf}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>prix:</Col>
                      <Col>
                        <strong>{product.prix}t</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>write a review</h2>
                  {errorReviewCreate && <Message variant='danger'>{errorReviewCreate}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select ....</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 Fair</option>
                          <option value="3">3 Good</option>
                          <option value="4">4 Very GOOD</option>
                          <option value="5">5 Excellent</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>Submit</Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">Sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <h2>{product.creatorName}</h2>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
