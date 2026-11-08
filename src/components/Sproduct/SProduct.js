import React from 'react'
import './SProduct.css'
import Header from '../Header/Header'

import ff1 from '../Shop1/products/ff1.jpg'
import ff2 from '../Shop1/products/ff2.jpg'
import ff3 from '../Shop1/products/ff3.jpg'
import ff4 from '../Shop1/products/ff4.jpg'

const SProduct = () => {
  return (
    <div>
        <Header/>

        <section id='prodetails' className='section-p1'>
            <div className='single-pro-image'>
                <img src={ff1} alt='' id="MainImg"></img>

                <div className='small-img-group'>
                    <div className='small-img-col'>
                        <img src={ff1} alt=''></img>
                    </div>

                    <div className='small-img-col'>
                        <img src={ff2} alt=''></img>
                    </div>

                    <div className='small-img-col'>
                        <img src={ff3} alt=''></img>
                    </div>

                    <div className='small-img-col'>
                        <img src={ff4} alt=''></img>
                    </div>
                </div>
            </div>

            <div className='single-pro-details'>
              <h6>Home / T-Shirts</h6>
              <h4>Men's Fashion T-Shirts</h4>
              <h2>$139.00</h2>
              <select>
                 <option>Select Size</option>
                 <option>Small</option>
                 <option>Medium</option>
                 <option>Large</option>
                 <option>XL</option>
                 <option>XXL</option>
              </select>
              <input type="number" value="1"></input>
              <button className="normal">Add To Cart</button>
              <h4>Product Details</h4>
              <span>The Gildan Ultra Cotton T-Shirt is made from a substantial 6.0 oz. per sq. yd. fabric constructed from 100% cotton, this classic fit preshrunk jersey knit provides unmatched confort with each wear. Featuring a taped nech and shoulder, and a seamless double-needle collar, and available in a range of colors, it offers it all in the ultimate head-turning package.</span>
            </div>
        </section>
    </div>
  )
}

export default SProduct