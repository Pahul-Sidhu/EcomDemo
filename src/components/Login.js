import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {getCurrentBrowserFingerPrint} from "@rajesh896/broprint.js";

export default function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  

  const handleUsername = (e) => {
    setUsername(e.target.value);
    setIsLogin(e.target.value !== '' && email !== '');
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setIsLogin(username !== '' && e.target.value !== '');
  };

  const login = async () => {
    if (username === '' || email === '') {
      alert('Please fill in all fields');
      return;
    }
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    // Redirect the user to a different page after successful login
    // You can use react-router for this.
  };

  const clear = (e) => {
    e.preventDefault();
    setUsername('');
    setEmail('');
    setIsLogin(false);
  };
  
  return (
    <div className="container">
      <h1 className="text-center m-3 p-3">Login</h1>

      <form className="d-flex flex-column m-3 p-3">
        <input
          type="text"
          placeholder="Username"
          onChange={handleUsername}
          value={username}
          className="m-2 p-2"
        />
        <input
          type="email"
          placeholder="Email"
          onChange={handleEmail}
          value={email}
          className="m-2 p-2"
        />

        <div className="d-flex flex-row align-items-center mb-1">
            <Link to='/search/nokey/yes'>
            <button type="submit" className="btn btn-dark m-2 p-2" onClick={login}>
            Login
          </button>
            </Link>
          
          <button className="btn btn-dark m-2 p-2" onClick={clear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
