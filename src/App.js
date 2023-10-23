import './App.css'
import Navbar from './components/Navbar';
import Results from './components/Results';
import Cart from './components/Cart';
import Login from './components/Login';
import Details from './components/Details';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Thankyou from './components/Thankyou';
import Example from './components/Example';

function App() {
  return (
    <div className='App'>
      
      <BrowserRouter >
      <Navbar />
      <div>
        <Routes>
          <Route path="/search/:key/:type" key={Math.random() * 99999 + 1}  element={<Results key={Math.random() * 99999 + 1}/>} />
        </Routes>
        <Routes>
        <Route path="/" key={Math.random() * 99999 + 1}  element={<Results key={Math.random() * 99999 + 1}/>} />
        </Routes>
        <Routes>
        <Route path="/cart" key={Math.random() * 99999 + 1}  element={<Cart key={Math.random() * 99999 + 1}/>} />
        </Routes>
        <Routes>
        <Route path="/login" key={Math.random() * 99999 + 1}  element={<Login key={Math.random() * 99999 + 1}/>} />
        </Routes>
        <Routes>
        <Route path="/details" key={Math.random() * 99999 + 1}  element={<Details key={Math.random() * 99999 + 1}/>} />
        </Routes>
        <Routes>
        <Route path="/thanks" key={Math.random() * 99999 + 1}  element={<Thankyou key={Math.random() * 99999 + 1}/>} />
        </Routes>
        <Routes>
        <Route path="/hp" key={Math.random() * 99999 + 1}  element={<Example key={Math.random() * 99999 + 1}/>} />
        </Routes>

    </div>
        
    </BrowserRouter>
             
    </div>
  );
}

export default App;
