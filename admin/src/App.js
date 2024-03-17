import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login'
import List from './pages/list/List'
import Single from './pages/single/Single'
import New from './pages/new/New'
import { productInputs, userInputs } from './formSource'
import './style/dark.scss'
import { useContext, useState } from 'react';
import { DarkModeContext } from './context/darkModeContext';
function App() {
  const { darkMode } = useContext(DarkModeContext)
  return (
    <>
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<List />} />
            <Route path="/users/:userId" element={<Single />} />
            <Route path="/users/new" element={<New inputs={userInputs} title="Add New User" />} />
            <Route path="/products" element={<List />} />
            <Route path="/products/:productId" element={<Single />} />
            <Route path="/products/new" element={<New inputs={productInputs} title="Add New Product" />} />
          </Routes>
        </BrowserRouter>
      </div>

    </>
  );
}

export default App;
