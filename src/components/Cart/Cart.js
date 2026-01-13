import React from 'react'
import './Cart.css'
import b20 from './b20.jpg'

import { Link } from 'react-router-dom'

import { FaRegTimesCircle } from "react-icons/fa";

import productsff1 from '../Home/products/ff1.jpg'
import productsff2 from '../Home/products/ff2.jpg'
import productsff3 from '../Home/products/ff3.jpg'

const Cart = () => {

    const b20Style = {
        '--b20-image': `url(${b20})`
    }
  return (
    <div>

         <section className="about-header6" style={b20Style}>
        
        <h2>#let's_talk</h2>
        <p>LEAVE A MESSAGE, we love to hear from you!</p>
    </section>

    <section id="cart" className="section-p1">
            <table>
                <thead>
                    <tr>
                        <td>Remove</td>
                        <td>Image</td>
                        <td>Product</td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>Subtotal</td>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td><Link to="#"></Link><FaRegTimesCircle className='circle'/></td>
                        <td><img src={productsff1} alt=""></img></td>
                        <td>Cartoon Astronaut T-Shirts</td>
                        <td>$118.19</td>
                        <td><input type="number"></input></td>
                        <td>$118.19</td>
                    </tr>

                    <tr>
                        <td><Link to="#"><FaRegTimesCircle className='circle' /></Link></td>
                        <td><img src={productsff2} alt=""></img></td>
                        <td>Cartoon Astronaut T-Shirts</td>
                        <td>$125.12</td>
                        <td><input type="number"></input></td>
                        <td>$125.11</td>
                    </tr>

                    <tr>
                        <td><Link to="#"><FaRegTimesCircle className='circle'/></Link></td>
                        <td><img src={productsff3} alt=""></img></td>
                        <td>Cartoon Astronaut T-Shirts</td>
                        <td>$116.20</td>
                        <td><input type="number"></input></td>
                        <td>$116.20</td>
                    </tr>
                </tbody>
            </table>
    </section>

    <section id="cart-add" className="section-p1">
        <div id="coupon">
            <h3>Apply Coupon</h3>
            <div>
                <input type="text" placeholder="Enter Your Coupon"></input>
                <button className="normal">Apply</button>
            </div>
        </div>

        <div id="subtotal">
            <h3>Cart Totals</h3>
            <table>
                <tr>
                    <td>Cart Subtotal</td>
                    <td>$ 335</td>
                </tr>
                <tr>
                    <td>Shipping</td>
                    <td>Free</td>
                </tr>
                <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>$ 335</strong></td>
                </tr>
            </table>
            <button className="normal">Proceed to Checkout</button>
        </div>
    </section>

    </div>
  )
}

export default Cart