import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login'
import List from './pages/list/List'
import Single from './pages/single/Single'
import New from './pages/new/New'
import { userInputs } from './formSource'
import './style/dark.scss'
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/AuthContext';
import { hotelColumns, roomColumns, userColumns } from './dataTableSource';
import NewHotel from './pages/new hotel/NewHotel';
import NewRoom from './pages/new room/NewRoom';



function App() {
  const { darkMode } = useContext(DarkModeContext)


  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext)
    if (!user) {
      return <Navigate to='/login' />
    }
    return children;
  }
  return (
    <>
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute><List columns={userColumns} /></ProtectedRoute>} />
            <Route path="/users/:userId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
            <Route path="/users/new" element={<ProtectedRoute><New inputs={userInputs} title="Add New User" /></ProtectedRoute>} />
            <Route path="/hotels" element={<ProtectedRoute><List columns={hotelColumns}/></ProtectedRoute>} />
            <Route path="/hotels/:productId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
            <Route path="/hotels/new" element={<ProtectedRoute><NewHotel  /></ProtectedRoute>} />

            <Route path="/rooms" element={<ProtectedRoute><List columns={roomColumns}/></ProtectedRoute>} />
            <Route path="/rooms/:productId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
            <Route path="/rooms/new" element={<ProtectedRoute><NewRoom/></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </div>

    </>
  );
}

export default App;
