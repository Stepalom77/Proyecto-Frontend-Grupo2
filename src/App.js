import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home'
import MascotasPerdidas from './components/MascotasPerdidas/MascotasPerdidas';
import MisMascotas from './components/Usuario/MisMascotas/MisMascotas';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Logout from './components/Logout/Logout'
import MyProvider from './context/MyProvider';
import MascotasRegister from './components/Usuario/MascotasRegisterEdit/MascotasRegisterEdit';

function App() {
  return (
    <div className="App">
      <MyProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/lost-pets' element={<MascotasPerdidas/>}/>
        <Route path='/pet' element={<MascotasRegister/>}/>
        <Route path='/my-pets' element={<MisMascotas/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <Footer/>
      </MyProvider>
    </div>
  );
}

export default App;
