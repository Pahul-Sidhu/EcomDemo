import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import {getCurrentBrowserFingerPrint} from "@rajesh896/broprint.js";

export default function Cart() {
    const [cart, setCart] = useState([]);

    const removeCart = async (product) => {
        const newCart = cart.filter((item) => item.id !== product.id);
        setCart(newCart);
        localStorage.setItem('items', JSON.stringify(newCart));

        const fingerprint = await getCurrentBrowserFingerPrint();
        const response = await fetch('http://localhost:8000/removecart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "product": product, "fp": fingerprint }),
        });
        const data = await response.json();
        console.log(data);
    }

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('items')) || [];
        setCart(storedItems);
        console.log(storedItems)
    }, [])
  return (
    <div className='container'>
        
        {cart.length > 0 ? cart.map((product) => {
            if(product.price === undefined || product.price === null) product.price = (Math.random() * (99) + 1).toFixed(2);;
            if(product.isVisible === undefined || product.isVisible === null) product.isVisible = true;
            return (
                product.isVisible && 
                <div className="row justify-content-center mb-3" key={cart.indexOf(product)}>
            <div className="col-md-12">
              <div className="card shadow-0 border rounded-3">
                <div className="card-body">
                  <div className="row g-0">
                    <div className="col-xl-3 col-md-4 d-flex justify-content-center">
                      <div className="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                        <img src={product.volumeInfo.imageLinks ? product.volumeInfo.imageLinks.thumbnail : "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fb%2Fb6%2FGutenberg_Bible%252C_Lenox_Copy%252C_New_York_Public_Library%252C_2009._Pic_01.jpg%2F640px-Gutenberg_Bible%252C_Lenox_Copy%252C_New_York_Public_Library%252C_2009._Pic_01.jpg&tbnid=v5TcVtKSDGi8OM&vet=12ahUKEwjMkcOJwMmBAxVBIDQIHdD8DZoQMygAegQIARB0..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FBook&docid=9dPTCh_caY1RiM&w=640&h=400&itg=1&q=book&client=safari&ved=2ahUKEwjMkcOJwMmBAxVBIDQIHdD8DZoQMygAegQIARB0"} alt='No image' className="w-100" />
                        <a href="#!">
                          <div className="hover-overlay">
                            <div className="mask" style={{backgroundColor: "rgba(253, 253, 253, 0.15)"}}></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-xl-6 col-md-5 col-sm-7">
                      <h5>{product.volumeInfo.title}</h5>
                      <div className="d-flex flex-row">
                        <div className="text-warning mb-1 me-2">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <span className="ms-1">
                            4.5
                          </span>
                        </div>
                      </div>
  
                      <p className="text mb-4 mb-md-0">
                      {product.volumeInfo.description}
                      </p>
                    </div>
                    <div className="col-xl-3 col-md-3 col-sm-5">
                      <div className="d-flex flex-row align-items-center mb-1">
                        <h4 className="mb-1 me-1">${product.price}</h4>
                      </div>
                      <h6 className="text-success">Free shipping</h6>
                      <div className="mt-4">
                      {localStorage.getItem('username') && <Link to={`/thanks?product=${encodeURIComponent(JSON.stringify(product))}`}><button className="btn btn-primary shadow-0 m-2 p-2" type="button">Buy this</button></Link>}

                        <button className="btn btn-primary shadow-0 m-2 p-2" type="button" onClick={() => removeCart(product)}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
            )
          }) : <h1 className="text-center m-3 p-3">No items in cart</h1>}
    </div>
  )
}
