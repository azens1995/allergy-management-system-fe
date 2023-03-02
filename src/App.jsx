import './App.css';
import { Home } from './pages/home';
import { Login } from './pages/login';
import Register from './pages/register';
import { Route, Routes } from 'react-router-dom';
import AllergyDetail from './pages/allergyDetail';
import { ProtectedRoute } from './utils/protectedRoute';

function App() {
  return (
    <div className='App'>
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
          path='/allergy/:actionType/:id?'
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
