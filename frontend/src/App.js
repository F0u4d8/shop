import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductsListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
          <Route path="/admin/productlist" element={<ProductListScreen/>}/>
          <Route path="/admin/products/:id/edit" element={<ProductEditScreen/>}/>

          <Route path="/admin/users/:id/edit" element={<UserEditScreen/>}/>
          <Route path="/admin/userlist" element={<UserListScreen/>}/>
          <Route path='/profile' element={<ProfileScreen/>}/>
          <Route path='/register' element={<RegisterScreen/>}/>
          <Route path='/login' element={<LoginScreen/>}/>
            <Route path='/product/:id' element={<ProductScreen/>}/>
            <Route path='/cart' element={<CartScreen/>}/>
            <Route path='/cart/:id' element={<CartScreen/>}/>
             <Route path="/" element={<HomeScreen/>} exact/>
             <Route path="/search/:keyWord" element={<HomeScreen/>}/>
             </Routes>
             
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
