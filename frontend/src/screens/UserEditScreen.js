import React, { useState, useEffect } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstantes';


const UserEditScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [portFeulle, setPortFeulle] = useState(0);
  const [adress, setAdress] = useState('');


  const { id } = useParams();
const navigate=useNavigate()
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;


  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading :loadingUpdate, error:errorupdate, success:successUpdate } = userUpdate;

  useEffect(() => {

if(successUpdate){
dispatch({type:USER_UPDATE_RESET})
navigate('/admin/userlist')

}else{
 if(!user.name || user._id !== id){

dispatch(getUserDetails(id))

   }else{
setName(user.name)
setEmail(user.email)
setPortFeulle(user.portFeulle)
setAdress(user.adress)
setIsAdmin(user.isAdmin)

   }

}

  
  }, [dispatch, user, id , navigate , successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id:id , name,email , portFeulle,adress, isAdmin}))
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        go back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
{loadingUpdate && <Loader/>}
{errorupdate && <Message variant='danger'>{errorupdate}</Message>}
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
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="adress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="portFeuille">
              <Form.Label>user portFeuille</Form.Label>
              <Form.Control
                type="number"
                placeholder="enter amount"
                value={portFeulle}
                onChange={(e) => setPortFeulle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="is admin "
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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

export default UserEditScreen;
