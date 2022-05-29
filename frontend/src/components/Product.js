import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import Rating from './Rating'
import {
  addToWishList,
  deleteFromWishlist,
  
} from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const Product = ({ product }) => {





  return (
    <>
      <Card className="my-1 p-3 rounded mb-3 Product-main-card">
        <div>
      

          <Link to={`/product/${product._id}`}>
            <img
              src={product.image}
              alt={product.name}
              className=" ProductL-img"
            />
          </Link>
        </div>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>

  
            <Card.Text className="price-row" as="h5">
            {product.prix}
            </Card.Text>
          
        </Card.Body>
      </Card>
    </>
  )
}

export default Product