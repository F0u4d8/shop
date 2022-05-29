import Container from "../../components/Container";
import showcase1 from "./images/plastic.jpg"
import showcase2 from "./images/glass.png"
import showcase3 from "./images/metal.jpg"
import showcase4 from "./images/wood.png"
import showcase5 from "./images/bat.jpg"
import classes from "./MainSection.module.css"
import trolly from "./images/trr.jpg"

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css";
import Card from "../../components/Card";

const showcases = [
  {
    image: showcase1,
    url:'/shop/category/plastique',
    category: "Plastique",
  },
  {
    image: showcase2,
    url:'/shop/category/verre',
    category: "Verre",
  },
  {
    image: showcase3,
    url:'/shop/category/metal',
    category: "Métal",
  },
  {
    image: showcase4,
    url:'/shop/category/bois',
    category: "Bois",
  },
  {
    image: showcase5,
    url:'/shop/category/batterie',
    category: "Batterie",
  },
];
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
  },
};
const MainSection = () => {
  return (
    <>
      <div className={classes.heroBanner}>
        <Container>
          <div className={classes.content}>
            <img className={classes.imageFluid} src={trolly} alt="Trolly" />
            <div className={classes.intro}>
              <h4>Protéger l'environnement</h4>
              <h1>Parcourir les matériaux</h1>
              <p>
              Contribuez à la protection de l'environnement en organisant le processus d'achat et de vente de divers matériaux recyclables
              </p>
              <a href="/shop">Feuilleter</a>
            </div>
          </div>
        </Container>
      </div>
      <div className={classes.showcases}>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {showcases.map((showcase) => (
            <Card key={showcase.category} showcase={showcase} />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default MainSection;