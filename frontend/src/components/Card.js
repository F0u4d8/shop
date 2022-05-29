import classes from "./Card.module.css";

const Card = ({ showcase }) => {
  return (
    <div className={classes.card}>
      <img src={showcase.image} alt="Test"></img>
      <a className={classes.slideOver} href={showcase.url}>
        <h3>{showcase.category}</h3>
      
      </a>
    </div>
  );
};

export default Card;