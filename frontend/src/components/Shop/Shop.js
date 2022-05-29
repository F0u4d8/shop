import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import {
  ShopContent,
  SideBar,
  SideBarCategories,
  CategoryHeading,
  CategoryList,
  CategoryListItem,
  SidebarFilters,
  SidebarFilterHeading,
  ProductFilter,
  FilterHeading,
  MainContent,
  FilterBar,
  ProductsContainer,
  PageNav,
  SearchAndFilters,
  MobileFilterBar,
  MobileProducts,
  MobileFilterButton,
  MobileFilterOverlay,
  CloseOverlay,
} from './shop.elements.js';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Link, useParams } from 'react-router-dom';
import {
  listProducts,
  getProductsByCategory,
} from '../../actions/productActions';
import Product from '../Product.js';

const Shop = () => {
  
  const params = useParams();
  const keyWord = params.keyWord;
  const id = params.category;

  const dispatch = useDispatch();

  let mobile = false;

  if (window.screen.width < 1000) {
    mobile = true;
  } else {
    mobile = false;
  }

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    if (!id) { dispatch(listProducts(keyWord));
      
    } else {
     dispatch(getProductsByCategory(id));
    }
  }, [dispatch, keyWord, id]);

  

  return (
    <>
      <>
        <ShopContent>
          <SideBar>
            <SideBarCategories>
              <CategoryHeading>Browse Categories</CategoryHeading>
              <CategoryList>
                <CategoryListItem>
                  <Link to={'/shop/category/plastique'}>Plastique</Link>
                </CategoryListItem>
                <CategoryListItem>
                  <Link to={'/shop/category/verre'}>Verre</Link>
                
                </CategoryListItem>
                <CategoryListItem>
                  <Link to={'/shop/category/bois'}>Bois</Link>
                </CategoryListItem>
                <CategoryListItem>
                  <Link to={'/shop/category/metal'}>Metal</Link>
                </CategoryListItem>
                <CategoryListItem>
                  <Link to={'/shop/category/batterie'}>Batterie</Link>
                </CategoryListItem>
              </CategoryList>
            </SideBarCategories>
            <SidebarFilters>
              <SidebarFilterHeading>Product Filters</SidebarFilterHeading>
              <ProductFilter>
                <FilterHeading>Brand</FilterHeading>
                <CategoryList>
                  <CategoryListItem></CategoryListItem>
                </CategoryList>
              </ProductFilter>
              <ProductFilter>
                <FilterHeading>Price</FilterHeading>
                <CategoryList>
                  <CategoryListItem></CategoryListItem>
                </CategoryList>
              </ProductFilter>
            </SidebarFilters>
          </SideBar>
          <MainContent>
            <FilterBar></FilterBar>
            <ProductsContainer>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message>{error}</Message>
              ) : (
                <>
                  <Row>
                    {products.map((product) => (
                      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                      </Col>
                    ))}
                  </Row>
                </>
              )}
              <PageNav>
                <Stack spacing={2}></Stack>
              </PageNav>
            </ProductsContainer>
          </MainContent>
        </ShopContent>
      </>
    </>
  );
};

export default Shop;
