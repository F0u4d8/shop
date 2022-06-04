import { Container, Button } from "react-bootstrap";
import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { getRequestById, approveRequest } from "../../actions/requestActions";
import { APPROVE_SELLER_RESET } from "../../constants/requestConstants";
import DropNotif from "../../components/Modal";
import { Link, useNavigate, useParams } from "react-router-dom";


const RequestScreen = () => {
  const requestDetail = useSelector((state) => state.requestDetail);
  const { loading, error, request } = requestDetail;

  const approveDetail = useSelector((state) => state.approveDetail);
  const {
    loading: loadingApproval,
    error: errorApproval,
    success,
  } = approveDetail;

  const dispatch = useDispatch();

  const {id} = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
const navigate = useNavigate()

 
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    dispatch(getRequestById(id));
  }, [id, dispatch , navigate , userInfo]);

  const buttonHandler = (e) => {
    e.preventDefault();
    dispatch(approveRequest(id));
  };

 
  return (
    <Container className="mt-5 mb-5">
      <Link to="/userProfile" className="btn btn-primary my-3">
        Go Back
      </Link>
      {success && (
        <DropNotif
          heading="Request Approval"
          text="Approve request successfully"
          resetData={() => {
            dispatch({ type: APPROVE_SELLER_RESET });
          }}
        ></DropNotif>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
         
          {!request.approved && (
            <>
              {loadingApproval && <Loader />}
              {errorApproval && (
                <Message variant="danger">{errorApproval}</Message>
              )}
              <Button className="mt-3 mb-3" onClick={buttonHandler}>
                {" "}
                Approve Request
              </Button>
            </>
          )}
        </>
      )}
    </Container>
  );
}
  

export default RequestScreen;