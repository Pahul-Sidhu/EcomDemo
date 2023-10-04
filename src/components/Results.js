import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import {getCurrentBrowserFingerPrint} from "@rajesh896/broprint.js";

export default function Results() {
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [cg, setCategory] = useState("general");

    const {key} = useParams();

    const addCart = (product) => {
      postCart(product);
        const storedItems = JSON.parse(localStorage.getItem('items')) || [];
        storedItems.push(product);
        localStorage.setItem('items', JSON.stringify(storedItems));
        console.log(JSON.parse(localStorage.getItem('items')));
        alert("Added to cart");
        
    }

    const sort = () => {
        let val1 = document.getElementById('typeNumber1').value;
        let val2 = document.getElementById('typeNumber2').value;
        const updatedProducts = products.map(product => ({
            ...product,
            isVisible: product.price > val1 && product.price < val2,
          }));
        
          // Update the state with the updated products
          setProducts(updatedProducts);
          setCount(products.length);
          pricePost(val2, val1);

    }

    const addCategory = async (key) => {
      const fingerprint = await getCurrentBrowserFingerPrint();
      const response = await fetch('http://localhost:8000/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "category": key, "fp": fingerprint }),
      });
      const data = await response.json();
      console.log(data);
    }

    const postCart = async (product) => {
      const fingerprint = await getCurrentBrowserFingerPrint();
      const response = await fetch('http://localhost:8000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "product": product, "fp": fingerprint }),
      });
      const data = await response.json();
      console.log(data);
    };

    const pricePost = async (high, low) => {
      const fingerprint = await getCurrentBrowserFingerPrint();
      const response = await fetch('http://localhost:8000/price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "high": high, "low" : low, "fp": fingerprint }),
      });
      const data = await response.json();
      console.log(data);

    };


    const category = async (key) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${key}&key=AIzaSyAqRzhEsUQB3C2SRSrqIr_C7T6qWsglLYY`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            // Handle the data here
            setCount(data.totalItems);
            setProducts(data.items);
            setCategory(key.toUpperCase());
            addCategory(key);

          } catch (error) {
            console.error(error);
          }
    };

    const postSearch = async (searchValue) => {
      const fingerprint = await getCurrentBrowserFingerPrint();
        const response = await fetch('http://localhost:8000/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "query": searchValue, "fp" : fingerprint }),
        });
        const data = await response.json();
        console.log(data);      }

    
    useEffect(() => {     
      //Identifying the user
      getCurrentBrowserFingerPrint().then(async (fingerprint) => {
        var res = await fetch('http://localhost:8000/identify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"fp" : fingerprint}),
        });
        res = await res.json();

      })

      // Fetch the data from the books API
        const fetchData = async () => {
            setProducts([]);
          try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${key === undefined ? cg : key}&key=AIzaSyAqRzhEsUQB3C2SRSrqIr_C7T6qWsglLYY`);
            
            const data = await response.json();
            // Handle the data here
            setCount(data.totalItems);
            setProducts(data.items);

          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();

        if(key !== undefined) {
          postSearch(key);
        }
      }, [key]);
      


  return (
    <section className="">
    <div className="container">
      <div className="row">
        
        <div className="col-lg-3">
          
          <button className="btn btn-outline-secondary mb-3 w-100 d-lg-none collapsed" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span>Show filter</span>
          </button>
          
          <div className="collapse card d-lg-block mb-5" id="navbarSupportedContent">
            <div className="accordion" id="accordionPanelsStayOpenExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button text-dark bg-light" type="button" data-mdb-toggle="collapse" data-mdb-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                    Categories
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne">
                  <div className="accordion-body">
                    <ul className="list-unstyled">
                    <li><a href="#" className="text-dark p-2" onMouseEnter={(e) => {
                    e.target.style.color = 'red';           // Change text color on hover
                    e.target.style.textDecoration = 'underline'; // Add underline on hover
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = 'black';       // Restore initial text color
                    e.target.style.textDecoration = 'none'; // Remove underline on hover out
                }} onClick={() => category("fiction")}>Fiction </a></li>
                                    <li><a href="#" className="text-dark p-2" onMouseEnter={(e) => {
                    e.target.style.color = 'red';           // Change text color on hover
                    e.target.style.textDecoration = 'underline'; // Add underline on hover
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = 'black';       // Restore initial text color
                    e.target.style.textDecoration = 'none'; // Remove underline on hover out
                }}onClick={() => category("horror")}>Horror </a></li>
                                    <li><a href="#" className="text-dark p-2" onMouseEnter={(e) => {
                    e.target.style.color = 'red';           // Change text color on hover
                    e.target.style.textDecoration = 'underline'; // Add underline on hover
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = 'black';       // Restore initial text color
                    e.target.style.textDecoration = 'none'; // Remove underline on hover out
                }}onClick={() => category("literature")}>Literature</a></li>
                                    <li><a href="#" className="text-dark p-2" onMouseEnter={(e) => {
                    e.target.style.color = 'red';           // Change text color on hover
                    e.target.style.textDecoration = 'underline'; // Add underline on hover
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = 'black';       // Restore initial text color
                    e.target.style.textDecoration = 'none'; // Remove underline on hover out
                }}onClick={() => category("poetry")}>Poetry </a></li>
                                    <li><a href="#" className="text-dark p-2" onMouseEnter={(e) => {
                    e.target.style.color = 'red';           // Change text color on hover
                    e.target.style.textDecoration = 'underline'; // Add underline on hover
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = 'black';       // Restore initial text color
                    e.target.style.textDecoration = 'none'; // Remove underline on hover out
                }}onClick={() => category("drama")}>Drama </a></li>
                                    <li><a href="#" className="text-dark p-2" onMouseEnter={(e) => {
                    e.target.style.color = 'red';           // Change text color on hover
                    e.target.style.textDecoration = 'underline'; // Add underline on hover
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = 'black';       // Restore initial text color
                    e.target.style.textDecoration = 'none'; // Remove underline on hover out
                }}onClick={() => category("humour")}>Humour </a></li>
                                    <li><a href="#" className="text-dark p-2" onMouseEnter={(e) => {
                    e.target.style.color = 'red';           // Change text color on hover
                    e.target.style.textDecoration = 'underline'; // Add underline on hover
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = 'black';       // Restore initial text color
                    e.target.style.textDecoration = 'none'; // Remove underline on hover out
                }}onClick={() => category("spirituality")}>Spirituality </a></li>
                                    <li><a href="#" className="text-dark p-2" onMouseEnter={(e) => {
                    e.target.style.color = 'red';           // Change text color on hover
                    e.target.style.textDecoration = 'underline'; // Add underline on hover
                }}
                onMouseLeave={(e) => {
                    e.target.style.color = 'black';       // Restore initial text color
                    e.target.style.textDecoration = 'none'; // Remove underline on hover out
                    }}onClick={() => category("thriller")}>Thriller </a></li>

                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button className="accordion-button text-dark bg-light" type="button" data-mdb-toggle="collapse" data-mdb-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
                    Price
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingThree">
                  <div className="accordion-body">
                    <div className="range">
                      <input type="range" className="form-range" id="customRange1" />
                    <span className="thumb" style={{left: "calc(50% + 0.5px)"}}><span className="thumb-value">50</span></span></div>
                    <div className="row mb-3">
                      <div className="col-6">
                        <p className="mb-0">
                          Min
                        </p>
                        <div className="form-outline">
                          <input type="number" id="typeNumber1" className="form-control" />
                        <div className="form-notch"><div className="form-notch-leading" style={{width: "9px"}}></div><div className="form-notch-middle" style={{width: "22.4px"}}></div><div className="form-notch-trailing"></div></div></div>
                      </div>
                      <div className="col-6">
                        <p className="mb-0">
                          Max
                        </p>
                        <div className="form-outline">
                          <input type="number" id="typeNumber2" className="form-control" />
                        <div className="form-notch"><div className="form-notch-leading" style={{width: "9px"}}></div><div className="form-notch-middle" style={{width: "22.4px"}}></div><div className="form-notch-trailing"></div></div></div>
                      </div>
                    </div>
                    <button type="button" className="btn btn-white w-100 border border-secondary" onClick={sort}>apply</button>
                  </div>
                </div>
              </div>
              
          </div>
        </div>
        </div>
        
        
        <div className="col-lg-9">
          <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
            <strong className="d-block py-2">{count} Items found </strong>
          </header>  
          
          {products.map((product) => {
            if(product.price === undefined || product.price === null) product.price = (Math.random() * (99) + 1).toFixed(2);;
            if(product.isVisible === undefined || product.isVisible === null) product.isVisible = true;
            return (
                product.isVisible && 
                <div className="row justify-content-center mb-3" key={products.indexOf(product)}>
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
                        <Link to={`/details?product=${encodeURIComponent(JSON.stringify(product))}`}> <button className="btn btn-primary shadow-0 m-2 p-2" type="button">Details</button></Link>
                     
                     {localStorage.getItem('username') && <Link to={`/thanks?product=${encodeURIComponent(JSON.stringify(product))}`}><button className="btn btn-primary shadow-0 m-2 p-2" type="button">Buy this</button></Link>}
                        <button className="btn btn-primary shadow-0 m-2 p-2" type="button" onClick={() => addCart(product)}>Add to cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
            )
          })}
  
          <hr/>
          
        </div>
      </div>
    </div>
  </section>
  )
}
