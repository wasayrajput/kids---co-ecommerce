import React from 'react'
import hero4 from './hero4..png'
import './Home.css'
import f1 from './features/f1.png'
import f2 from './features/f2.png'
import f3 from './features/f3.jpg'
import f4 from './features/f4.jpg'
import f5 from './features/f5.jpg'

import ff1 from './products/ff1.jpg'
import ff2 from './products/ff2.jpg'
import ff3 from './products/ff3.jpg'
import ff4 from './products/ff4.jpg'
import ff5 from './products/ff5.jpg'
import ff6 from './products/ff6.jpg'
import ff7 from './products/ff7.jpg'
import ff8 from './products/ff8.jpg'

import banner from './banner.jpg'

import n1 from './products/n1.jpg'
import n2 from './products/n2.jpg'
import n3 from './products/n3.jpg'
import n4 from './products/n4.jpg'
import n5 from './products/n5.jpg'
import n6 from './products/n6.jpg'
import n7 from './products/n7.jpg'
import n8 from './products/n8.jpg'

import b10 from './banners/b10.jpg'
import b11 from './banners/b11.jpg'

import b7 from './banners/b7.jpg'
import b4 from './banners/b4.jpg'
import b18 from './banners/b18.jpg'

import { FaStar } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from 'react-router-dom'

const Home = () => {
    const bannerStyle = {
        '--banner-image': `url(${banner})`
    };

    const b10Style = {
        '--b10-image': `url(${b10})`
    };

    const b11Style = {
        '--b11-image': `url(${b11})`
    };

    const b7Style = {
        '--b7-image': `url(${b7})`
    };

    const b4Style = {
        '--b4-image': `url(${b4})`
    };

    const b18Style = {
        '--b18-image': `url(${b18})`
    };

  return (
    <div>
      <section id="hero">
        
        <div className='content'>
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>One all products</h1>
        <p>Save more with coupons & upto 70% off!</p>
        <Link to='/shop'><button>Shop Now</button></Link>
        </div>
        <div>
          <img src={hero4} alt=''></img>
        </div>
      </section>

      <section id="feature" className="section-p1">
        <div className="fe-box">
            <img src={f1} alt=""></img>
            <h6>Free Shipping</h6>
        </div>
        <div className="fe-box">
            <img src={f2} alt=""></img>
            <h6>Online Order</h6>
        </div>
        <div className="fe-box">
            <img src={f3} alt=""></img>
            <h6>Save Money</h6>
        </div>
        <div className="fe-box">
            <img src={f4} alt=""></img>
            <h6>Promotions</h6>
        </div>
        <div className="fe-box">
            <img src={f5} alt=""></img>
            <h6>Happy Sell</h6>
        </div>
        {/* <div class="fe-box">
            <img src={f6} alt=""></img>
            <h6>F24/7 Support</h6>
        </div> */}
    </section>

    <section id="product1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Summer Collection New Modren Design</p>
        <div className="pro-container">
            <div class="pro">
                <img src={ff1} alt=""></img>
                <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <h4>$78</h4>
                </div>
                <FaShoppingBag className='bag' />
            </div>

            <div className="pro">
                <img src={ff2} alt=""></img>
                <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <h4>$78</h4>
                </div>
                <FaShoppingBag className='bag' />
            </div>

            <div className="pro">
                <img src={ff3} alt=""></img>
                <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <h4>$78</h4>
                </div>
                <FaShoppingBag className='bag' />
            </div>

            <div className="pro">
                <img src={ff4} alt=""></img>
                <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <h4>$78</h4>
                </div>
                <FaShoppingBag className='bag' />
            </div>

            <div className="pro">
                <img src={ff5} alt=""></img>
                <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <h4>$78</h4>
                </div>
                <FaShoppingBag className='bag' />
            </div>

            <div className="pro">
                <img src={ff6} alt=""></img>
                <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <h4>$78</h4>
                </div>
                <FaShoppingBag className='bag' />
            </div>

            <div className="pro">
                <img src={ff7} alt=""></img>
                <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <h4>$78</h4>
                </div>
                <FaShoppingBag className='bag' />
            </div>

            <div className="pro">
                <img src={ff8} alt=""></img>
                <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <h4>$78</h4>
                </div>
                <FaShoppingBag className='bag' />
            </div>
            
        </div>
    </section>


    <section id="banner" className="section-m1" style={bannerStyle}>
        <h4>Repair Services</h4>
        <h2>Up to <span><mark>70% Off</mark></span> - All T-Shirts & Accessories</h2>
        <button className="normal">Explore More</button>
    </section>

    <section id="product1" className="section-p1" >
        <h2>New Arrivals</h2>
        <p>Summer Collection New Modren Design</p>
        <div className="pro-container">
            <div className="pro">
                <img src={n1} alt=""></img>
                <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <h4>$78</h4>
                </div>
                <FaShoppingBag className='bag' />
            </div>

            <div className="pro">
                <img src={n2} alt=""></img>
                <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <h4>$78</h4>
                </div>
                <FaShoppingBag className='bag' />
            </div>

            <div className="pro">
                <img src={n3} alt=""></img>
                <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <h4>$78</h4>
                </div>
               <FaShoppingBag className='bag' />
            </div>

            <div className="pro">
                <img src={n4} alt=""></img>
                <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <h4>$78</h4>
                </div>
               <FaShoppingBag className='bag' />
            </div>

            <div className="pro">
                <img src={n5} alt=""></img>
                <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <h4>$78</h4>
                </div>
                <FaShoppingBag className='bag' />
            </div>

            <div className="pro">
                <img src={n6} alt=""></img>
                <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <h4>$78</h4>
                </div>
               <FaShoppingBag className='bag' />
            </div>

            <div className="pro">
                <img src={n7} alt=""></img>
                <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <h4>$78</h4>
                </div>
                <FaShoppingBag className='bag' />
            </div>

            <div className="pro">
                <img src={n8} alt=""></img>
                <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <h4>$78</h4>
                </div>
               <FaShoppingBag className='bag' />
            </div>
            
        </div>
    </section>

    <section id="sm-banner" className="section-p1" style={b11Style}>
        <div className="banner-box" style={b11Style}>
            <h4>Crazy Deals</h4>
            <h2>buy 1 get 1 free</h2>
            <span>The best classic dress is on sale at happy kids</span>
            <button className="white">Learn More</button>
        </div>

        <div className="banner-box banner-box2" style={b10Style}>
            <h4>Spring / Summer</h4>
            <h2>upcomming season</h2>
            <span>The best classic dress is on sale at happy kids</span>
            <button className="white">Collection</button>
        </div>
    </section>

    <section id="banner3" style={b7Style}>
        <div className="banner-box" style={b7Style}>
            <h2>SEASONAL SALE</h2>
            <h3>Winter Collection -50% OFF</h3>
        </div>

        <div class="banner-box banner-box2" style={b4Style}>
            <h2>NEW FOOTWEAR COLLECTION</h2>
            <h3>SPRING / SUMMER 2025</h3>
        </div>

        <div class="banner-box banner-box3" style={b18Style}>
            <h2>T-SHIRTS</h2>
            <h3>NEW TRENDY PRINTS</h3>
        </div>
    </section>

    </div>
  )
}

export default Home