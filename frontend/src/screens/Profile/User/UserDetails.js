import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { getUserDetails, updateUserProfile } from "../../../actions/userActions"
import { useEffect, useState } from "react";
import classes from "./UserDetails.module.css";
import DropNotif from "../../../components/Modal";
import { USER_UPDATE_PROFILE_RESET } from "../../../constants/userConstantes";
import { useNavigate } from "react-router-dom";

const Details = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adress, setAdress] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className={classes.wrapper}>
      <h2>User Profile</h2>
      {success && (
        <DropNotif
          heading="Update Profile"
          text="Update Profile Successfully"
          resetData={() => {
            dispatch(getUserDetails("profile"));
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
          }}
        ></DropNotif>
      )}
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {loading && <Loader />}
  
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
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

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter confirm password"
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

        <button className={classes.update} type="submit" variant="primary">
          Update
        </button>
      </Form>
    </div>
  );
};

export default Details;