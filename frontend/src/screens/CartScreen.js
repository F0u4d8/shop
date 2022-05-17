import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';

import { addToCart ,removeFromCart} from '../actions/cartAction';

const CartScreen = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id));
    }
  }, [dispatch, id]);

  const removeFromCartHandler = (id)=>{
dispatch(removeFromCart(id))



  }

  const checkOutHandler = () =>{

    navigate('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3}><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                  <Col md= {2}>{item.qty}</Col>
                  <Col md={2}>T{item.price}</Col>
                  <Col md={2}><Button type='button' variant='light' onClick={()=>{removeFromCartHandler(item.product)}}><i className='fas fa-trash'></i></Button></Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}><Card><ListGroup variant='flush'><ListGroup.Item><h2>subtotal ({cartItems.reduce((acc,item)=> acc+item.qty , 0)}) items</h2>
      T{cartItems.reduce((acc, item)=> acc + item.price , 0).toFixed(2)}</ListGroup.Item>
      <ListGroup.Item><Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkOutHandler}>Proceed To checkout</Button></ListGroup.Item></ListGroup></Card></Col>
     
    </Row>
  );
};

export default CartScreen;
