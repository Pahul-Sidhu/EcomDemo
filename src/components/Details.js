import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import {getCurrentBrowserFingerPrint} from "@rajesh896/broprint.js";


export default function Details() {
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productJSON = searchParams.get('product');
  const product = JSON.parse(productJSON);

  const postDetails = async () => {
    const fingerprint = await getCurrentBrowserFingerPrint();
    const response = await fetch('https://ecombackend-cjkq.onrender.com/details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "product": product, "fp": fingerprint }),
    });
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    postDetails();
  }, []);

  return (
    <div className="row justify-content-center mb-3">
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
            </div>
            <div className="d-flex flex-row m-5 p-3">
                <h5 className='m-2 p-2'>Publisher : {product.volumeInfo.publisher }</h5>
                <h5 className='m-2 p-2'>Authors : {product.volumeInfo.authors.map((e) => product.volumeInfo.authors.indexOf(e) !== product.volumeInfo.authors.length - 1 ? e + ", " : e)}</h5>
                <h5 className='m-2 p-2'>Categories : {product.volumeInfo.categories && product.volumeInfo.categories.map((e) => product.volumeInfo.categories.indexOf(e) !== product.volumeInfo.categories.length - 1 ? e + ", " : e)}</h5>
                <h5 className='m-2 p-2'>Published Date : {product.volumeInfo.publishedDate}</h5>
                <h5 className='m-2 p-2'>Page count : {product.volumeInfo.pageCount}</h5>

                </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
