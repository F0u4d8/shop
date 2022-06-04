import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  
  ListGroup,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link,  useNavigate } from 'react-router-dom';
import { buySellUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import DropNotif from '../components/Modal';
import { USER_BUYSELL_RESET } from '../constants/userConstantes';
import classes from './RedeemScreen.module.css';

const BuySection = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [message, setMessage] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [item, setItem] = useState({ kindOfStand: '', another: 'another' });

  const { kindOfStand } = item;

  const buySell = useSelector((state) => state.buySell);
  const { loading , error, success } = buySell;

const dispatch = useDispatch()
const navigate = useNavigate()

  const handleChange = (e) => {
    e.persist();
    console.log(e.target.value);

    setItem((prevState) => ({
      ...prevState,
      kindOfStand: e.target.value,
    }));
  };

  const contHandler = () => {
if(kindOfStand === "site"){
console.log(userInfo.portFeulle)
console.log(cartItems[0].price)
console.log(cartItems[0].seller)

if(userInfo.portFeulle >= cartItems[0].price){

const sellerId = cartItems[0].seller;
const price = cartItems[0].price;

 dispatch(buySellUser(price , sellerId ))


}else{

  setMessage('not enough money ');


}
}





  };

  useEffect(()=>{
    if (!userInfo) {
      navigate('/login');
    }

if(success){

  dispatch({type: USER_BUYSELL_RESET})
  window.location.reload(false);
}


  },[dispatch,success,navigate , userInfo])

  return (
    <>
    {success && (
          <DropNotif
            heading="buy successfully"
            text=" status successfully"
            resetData={() => {
              dispatch({ type: USER_BUYSELL_RESET });
             
            }}
          ></DropNotif>
        )}
      <Row>
      {message && <Message variant="danger">{message}</Message>}
        <Col>
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}></Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.qty}</Col>
                  <Col md={2}>{item.price}</Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                {cartItems
                  .reduce((acc, item) => acc + item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
              {loading && <Loader/>}
        {error && <Message variant="danger">{error}</Message>}
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={contHandler}
                >
                  Continue
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Row>
          <Col></Col>{' '}
        </Row>
      </Row>

      <div className={classes.container}>
        <div className={classes.leftSide}>
          <div className={classes.Wrapper}>
            <div className={classes.Card}>
              {' '}
              <h3 className={classes.text}>you have</h3>
              <h2 className={classes.wallet}>{userInfo.portFeulle}</h2>
            </div>{' '}
            <Form.Group controlId="isAdmin" className="my-3">
              <Form.Check
                type="radio"
                label="acheter dans le site "
                value="site"
                required
                name="grouped"
                onChange={handleChange}
                checked={kindOfStand === 'site'}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="acheter en espéce "
                value="espece"
                required
                name="grouped"
                onChange={handleChange}
                checked={kindOfStand === 'espece'}
              ></Form.Check>
            </Form.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuySection;
