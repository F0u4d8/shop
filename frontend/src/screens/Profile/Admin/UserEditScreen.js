import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { getUserDetails, updateUser } from '../../../actions/userActions';
import { USER_UPDATE_RESET } from "../../../constants/userConstantes";
import DropNotif from "../../../components/Modal";

const UserEditScreen = () => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [adress, setAdress] = useState('');


    const { id } = useParams();
    const navigate=useNavigate()
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;


  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading :loadingUpdate, error:errorupdate, success:successUpdate } = userUpdate;

  useEffect(() => {
    if(!user.name || user._id !== id){

        dispatch(getUserDetails(id))
        
           }else{
        setName(user.name)
        setEmail(user.email)
        setAdress(user.adress)
        setIsAdmin(user.isAdmin)
        
           }
        
  }, [dispatch, user, id, ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id:id , name,email ,adress, isAdmin}))
  };

  return (
    <>
      <Container>
        <Link to="/profile" className="btn btn-primary my-3">
          Go Back
        </Link>
        <h1>Edit User</h1>
        {successUpdate && (
          <DropNotif
            heading="Change User status"
            text="Change User status successfully"
            resetData={() => {
              dispatch({ type: USER_UPDATE_RESET });
              navigate("/profile");
            }}
          ></DropNotif>
        )}
        {loadingUpdate && <Loader />}
        {errorupdate && <Message variant="danger">{errorupdate}</Message>}
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin" className="my-3">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId="adress" className="my-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </Container>
    </>
  );
};
export default UserEditScreen;