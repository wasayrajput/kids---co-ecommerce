import React from 'react'
import './Shop.css'
import b1 from './b1.jpg'
import Shop1 from '../Shop1/Shop1.js'

import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import { useEffect } from 'react'

const Shop = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const b1Style = {
    '--b1-image': `url(${b1})`
  };

  return (
    <div>

      <section id="page-header" style={b1Style}>
        
        <h2>#stayhome</h2>
        <p>Save more with coupons & upto 70% off!</p>
      </section>

      <Shop1/>

      <section id="pagination" className="section-p1">
         <Link to="#">1</Link>
         <Link to="#">2</Link>
         <Link to="#"><FaArrowRight /></Link>
      </section>

      




    </div>
  )
}

export default Shop