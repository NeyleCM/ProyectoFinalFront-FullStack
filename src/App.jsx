import { Route, Routes, useLocation } from "react-router-dom";
import { UserProvider } from "./context/UserProvider";
import { WishlistProvider } from './context/WishlistContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct'
import Login from './pages/Login';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import CategoryPage from './pages/CategoryPage'
import WishlistPage from './pages/WishlistPage'
import './index.css'

const App = () => {

  const location = useLocation();

  const isHomePage = location.pathname === "/";
  return (
    <>
    <div className={isHomePage ? "" : "background-container"}>
    <WishlistProvider>
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
            path="/dashboard" 
            element={<PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>} 
        />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </UserProvider>
    </WishlistProvider>
    </div>
    </>
  );
}

export default App;
