import React, { useState, useEffect } from 'react';
import {   useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

const ProfileScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adress, setAdress] = useState('');
  const [message, setMessage] = useState(null);

  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;




  const userLogin = useSelector((state) => state.userLogin);
  const {  userInfo } = userLogin;


  
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {  success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }else{
if(!user.name){
dispatch(getUserDetails("profile"))

}else{
    
setName(user.name)
setEmail(user.email)
setAdress(user.adress)


}


    }
  }, [dispatch,navigate, userInfo , user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('password do not match');
    } else {
     dispatch(updateUserProfile({id:user._id , name , email, password , adress}))
    }
  };

  return (
    <Row>
<Col md={3}>
<h2>User profile</h2>
      {message && <Message variant="danger">{message}</Message>}
      {loading && <Loader></Loader>}
      {error && <Message variant="danger">{error}</Message>}
      {success && <Message variant="success">"profile Updated successfully"</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="adress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="optional"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="my-3" variant="primary" type="submit">
          Update
        </Button>
      </Form>
</Col>
<Col md={9}><h2>My orders</h2></Col>
    </Row>
  );
};

export default ProfileScreen;
