
import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Global/Header/Header';
import ForgotPassword from './components/Pages/Auth/ForgotPassword';
import Login from './components/Pages/Auth/Login';
import Register from './components/Pages/Auth/Register';
import Home from './components/Pages/Home/Home';
import RequireAuth from './components/Utilities/RequireAuth';



function App() {
  return (
    <div className="App">
      <Header></Header>

      <Routes>
        
        <Route path='/login' element={<Login></Login>} ></Route>
        <Route path='/register' element={<Register></Register>} ></Route>
        <Route path='/reset-password' element={<ForgotPassword></ForgotPassword>} ></Route>

        <Route path='/' element={ <RequireAuth> <Home></Home> </RequireAuth>  } ></Route>
        
      </Routes>

    </div>
  );
}

export default App;
