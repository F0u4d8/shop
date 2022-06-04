import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import {
  PRODUCT_CREATE_RESET,

} from '../constants/productConstants';

const ProductListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loadingDelete, errorDelete, successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/admin/products/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('are you sure ?')) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            create Product <i className="fas fa-plus"></i>
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>Price</th>
              <th>Category</th>
              <th>quantity</th>
              <th>numTlf</th>
              <th>adress</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.prix}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>{product.numTlf}</td>
                <td>{product.adress}</td>

                <td>
                  <LinkContainer to={`/admin/products/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => {
                      deleteHandler(product._id);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
