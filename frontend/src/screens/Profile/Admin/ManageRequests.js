import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { getAllRequest } from "../../../actions/requestActions";
import { useNavigate } from "react-router-dom";

const ManageRequestScreen = () => {
  const dispatch = useDispatch();
  const getRequests = useSelector((state) => state.getRequests);
  const { loading, error, request } = getRequests;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate()
  useEffect(() => {
   
      if (!userInfo) {
          navigate('/login');
        }
   
    dispatch(getAllRequest());
  }, [dispatch , navigate , userInfo]);

  console.log(request)
  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Request ID</th>
                
                <th>User Name</th>
                <th>Approved</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {request.map(request => (
                <tr key={request._id}>
                  <td>{request._id}</td>
                
                  <td>{request.sellerName}</td>
                  <td>
                    {request.approved ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/request/${request._id}`}>
                      <Button variant="light" className="btn-sm">
                        Show more
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              )) }
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ManageRequestScreen;