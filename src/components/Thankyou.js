import React, { useEffect } from 'react'
import {useLocation } from 'react-router-dom';
import {getCurrentBrowserFingerPrint} from "@rajesh896/broprint.js";

export default function Thankyou() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productJSON = searchParams.get('product');
    const product = JSON.parse(productJSON);

    const postBuy = async () => {
      const fingerprint = await getCurrentBrowserFingerPrint();
      const response = await fetch('https://ecombackend-cjkq.onrender.com/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "product": product, "fp": fingerprint }),
      });
      const data = await response.json();
      
    };

    useEffect(() => {
        postBuy();
      })

  return (
    <h1 className='text-center m-3 p-3'>Thank you for buying this book. Your payment form will be emailed to you shortly. Sadly we do not conduct transactions here. </h1>
  )
}
