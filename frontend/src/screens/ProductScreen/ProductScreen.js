import { useEffect, useState } from "react";
import classes from "./ProductScreen.module.css";
import Container from "../../components/Container";

import ProductSection from "./ProductSection/ProductSection";
import ProductDescription from "./ProductDescription/ProductDescription";
import ProductReview from "./ProductReview/ProductReview";
import { useDispatch, useSelector } from "react-redux";
import {  listProductDetails } from '../../actions/productActions';
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
const ProductScreen = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const {id} = useParams();
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const [selection, setSelection] = useState("1");

  const changeSelection = (e) => {
    setSelection(e.target.getAttribute("data-selection"));
  };

  let selectionShow;
  if (selection === "1") {
    selectionShow = <ProductDescription content={product.description} />;
  } else if (selection === "2") {
    selectionShow = <ProductReview productId={id} />;
  }
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <ProductSection product={product}></ProductSection>
          <div className={classes["selection-container"]}>
            <ul className={classes.navSelection}>
              <li
                className={classes.navItem}
                data-selection="1"
                onClick={changeSelection}
              >
                Description
              </li>
              <li
                className={classes.navItem}
                data-selection="2"
                onClick={changeSelection}
              >
                Reviews
              </li>
            </ul>
            {selectionShow}
          </div>
        </>
      )}
     
    </Container>
  );
};

export default ProductScreen;