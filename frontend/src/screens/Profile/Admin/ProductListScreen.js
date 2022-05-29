import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";

import {  deleteProduct, listProducts } from '../../../actions/productActions';

import DropNotif from "../../../components/Modal";
import { PRODUCT_DELETE_RESET } from "../../../constants/productConstants";

const ProductListScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
  
    const productDelete = useSelector((state) => state.productDelete);
    const { loadingDelete, errorDelete, successDelete } = productDelete;
  


  useEffect(() => {
    if (userInfo.isAdmin) {
        dispatch(listProducts());
    }else {

navigate('/login')

    }
  }, [dispatch,navigate,  userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };
 
  let productsFinal;
  if (userInfo.isAdmin) {
    if (products) {
      productsFinal = products;
    }
  }
 
  return (
    <Container className="mb-5">
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Link
            className="my-3 btn btn-primary"
            to="/admin/product/create"
            style={{ marginLeft: "auto" }}
          >
            <i className="fas fa-plus"></i> Create Product
          </Link>
        </Col>
      </Row>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {successDelete && (
            <DropNotif
              heading="Delete Product"
              text="Delete product successfully"
              resetData={() => {
                if (userInfo.isAdmin) {
                    dispatch(listProducts());
                } 
                dispatch({ type: PRODUCT_DELETE_RESET });
              }}
            />
          )}
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>RATING</th>
                <th>IN STOCK</th>
              </tr>
            </thead>
            <tbody>
              {productsFinal &&
                productsFinal.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.prix}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>{product.rating}</td>
                    <td>{product.countInStock}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
         
        </>
      )}
    </Container>
  );
};

export default ProductListScreen;