import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Admin from './components/Admin';
import Film from './components/Film';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Film />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
