import { Route, Routes } from "react-router-dom";
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
import ProductDetails from './pages/ProductDetails';
import WishlistPage from './pages/WishlistPage';

const App = () => {

  return (
    <>
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
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </UserProvider>
    </WishlistProvider>
    </>
  );
}

export default App;

/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/
