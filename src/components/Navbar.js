import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.jpg'

export default function Navbar(Category, page) {
    const [searchValue, setSearchValue] = React.useState("");

    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
    }

    const [name , setName] = React.useState("");
    

    useEffect(() => {
        setName(localStorage.getItem('username'));
    })


  return (
    <header className="p-3 bg-white border-bottom">
    <div className="p-3 text-center bg-white border-bottom">
          <div className="container">
            <div className="row gy-3">
              
              <div className="col-lg-1 col-sm-4 col-4">
                <a href='/' > <img
                    src={logo}
                    alt="Logo"
                    className="img-fluid"
                    style={{ borderRadius: "140px", width: "70px", height: "70px" }}
                /></a>
               
             
              </div>
              
      
              
              <div className="order-lg-last col-lg-5 col-sm-8 col-8">
                <div className="d-flex float-end"> 
                <Link to="/login" className="border rounded py-1 px-3 nav-link d-flex align-items-center"><i className="fa-solid fa-right-to-bracket m-1 me-md-2"></i><p className="d-none d-md-block mb-0">Sign in</p> </Link>                 
                  <Link to="/cart" className="border rounded py-1 px-3 nav-link d-flex align-items-center"><i className="fas fa-shopping-cart m-1 me-md-2"></i><p className="d-none d-md-block mb-0">My cart</p> </Link>
                </div>
              </div>
              
      
              
              <div className="col-lg-5 col-md-12 col-12 ">
                <div className="input-group float-center">
                  <div className="form-outline">
                    <input type="search" id="form1" className="form-control" onChange={handleSearchInputChanges}/>
                    <label className="form-label" for="form1" style={{marginLeft: "0px"}}>Search</label>
                  <div className="form-notch"><div className="form-notch-leading" style={{width: "9px"}}></div><div className="form-notch-middle" style={{width: "47.2px"}}></div><div className="form-notch-trailing"></div></div></div>
                  <Link to={`/search/${searchValue}/no`}>
                  <button type="button" className="btn btn-primary shadow-0">
                    <i className="fas fa-search"></i>
                  </button>
                  </Link>
                  
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <div className="bg-primary mb-4">
        <div className="container py-4">
          {name !== '' ? <h2 className="text-white">Hello {name}</h2> : null}
          <h3 className="text-white mt-2">Welcome to our bookstore</h3>
        </div>
      </div>
        </header>
  )
}
