import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import AllergyDetail from './pages/allergyDetail';
import { Home } from './pages/home';
import { Login } from './pages/login';
import Register from './pages/register';
import { ProtectedRoute } from './utils/protectedRoute';

function App() {
  return (
    <div className='App'>
      {/* <Navbar /> */}
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route
          path='/allergy'
          element={
            <ProtectedRoute>
              <AllergyDetail />
            </ProtectedRoute>
          }
        ></Route>
        <Route path='/allergy/:id' element={<AllergyDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
