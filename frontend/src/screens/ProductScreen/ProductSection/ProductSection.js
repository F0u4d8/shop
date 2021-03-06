import { useState } from "react";
import classes from "./ProductSection.module.css";
import { addToCart } from "../../../actions/cartAction";
import { useDispatch } from "react-redux";
import CartModal from "../../../components/CartModal/CartModal";
const ProductSection = ({ product }) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  
  const cartHandler = () => {
    dispatch(addToCart(product._id));
    setShowModal(true);
  };
  return (
    <div className={classes.container}>
      <CartModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
      ></CartModal>
      <img className={classes.productImage} src={product.image} alt="Product" />
      <div className={classes.content}>
      <h2>vandeur: </h2>
        <h2 className={classes.productNumTlf}>{product.sellerName}</h2>
        <h3 className={classes.productName}>{product.name}</h3>
        <h2 className={classes.productPrice}>{product.prix}</h2>
        <h2>numero telephone : </h2>
        <h2 className={classes.productNumTlf}>{product.numTlf}</h2>

        <h2>adress: </h2>
        <h2 className={classes.productNumTlf}>{product.adress}</h2>
        <ul className={classes.list}>
          <li>
            <a class="active" href={`/shop/category/${product.category}`}>
              <span>Category</span> : {product.category}
            </a>
          </li>
          
        </ul>
        
        <button
        
          onClick={cartHandler}
          className={classes.addCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductSection;