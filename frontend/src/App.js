import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen/HomeScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import ProfileScreen from './screens/Profile/User/UserProfile';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/Profile/Admin/UserEditScreen';
import ProductListScreen from './screens/ProductsListScreen';
import ProductEditScreen from './screens/Profile/Admin/ProductEditScreen';
import ScrollToTop from './components/ScrolToTop';
import Navigation from './components/Navigation/Navigation';
import Shop from './components/Shop/Shop';
import ProductCreateScreen from './screens/Profile/Admin/ProductCreateScreen';
import RedeemScreen from './screens/RedeemScreen';
import BuySection from './screens/BuySection';
import RequestScreen from './screens/requestScreen/RequestScreen';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navigation />

      <main className="py-3">
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/admin/productlist" element={<ProductListScreen />} />
          <Route
            path="/admin/product/:id/edit"
            element={<ProductEditScreen />}
          />
          <Route
            path="/admin/product/create"
            element={<ProductCreateScreen />}
          />

          <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
          <Route path="/admin/userlist" element={<UserListScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/cart/:id" element={<CartScreen />} />
          <Route path="/" element={<HomeScreen />} exact />
          <Route path="/shop/search/:keyWord" element={<Shop />} />
          <Route path="/shop/category/:category" element={<Shop />} />
          <Route path="/redeem" element={<RedeemScreen/>}/>
          <Route path='/buySection' element={<BuySection/>}/>
          <Route path='/request/:id' element={<RequestScreen/>}/>
          
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
