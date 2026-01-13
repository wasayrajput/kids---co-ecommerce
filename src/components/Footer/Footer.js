import React from 'react'
import './Footer.css'

import { Link } from 'react-router-dom'

import { FaFacebook } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

import logo from './logo.png'
import aap from './pay/aap.png'
import pay from './pay/pay.png'
import play from './pay/play.png'

const Footer = ({hideNewsletter}) => {

  const logoStyle = {
        '--logo-image': `url(${logo})`
    };

  const aapStyle = {
        '--aap-image': `url(${aap})`
    };

  const payStyle = {
        '--pay-image': `url(${pay})`
    };

  const playStyle = {
        '--aap-image': `url(${play})`
    };

  return (
    <div>
    
    {!hideNewsletter ? ( <section id="newsletter" className="section-p1 section-m1">
        <div className="newstext">
            <h4>Signs up for Newsletters</h4>
            <p>Get E-mail updates about our latest shop and <span>special offers.</span></p>
        </div>

        <div className="form">
            <input type="text" placeholder="Your email address"></input>
            <button className="normal">Sign Up</button>
        </div>
    </section>) : ""}

    

      <footer className="section-p1">
        <div className="col">
            <img className="logo" src={logo} alt=""></img>
            <h4>Contact</h4>
            <p><strong>Address:</strong> Hayat plaza basement, main bazar yateem khana</p>
            <p><strong>Phone:</strong> +92 301 4907544 / +92 302 4068891</p>
            <p><strong>Hours:</strong> 11:00 AM - 10:00 PM, 7 days a weak</p>
            <div className="follow">
                <h4>Follow Us</h4>
                <div className="icon">
                    <FaFacebook className='icons'/>
                    <FaTwitterSquare className='icons'/>
                    <FaInstagram className='icons'/>
                    <FaPinterest className='icons'/>
                    <FaYoutube className='icons'/>
                </div>
            </div>
        </div>

        <div className="col">
            <h4>About</h4>
            <Link to="#">About us</Link>
            <Link to="#">Delivery Information</Link>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Term & Conditions</Link>
            <Link to="#">Contact us</Link>
        </div>

        <div className="col">
            <h4>My Accounts</h4>
            <Link to="#">Sign In</Link>
            <Link to="#">View Cart</Link>
            <Link to="#">My Wishlist</Link>
            <Link to="#">Track My Order</Link>
            <Link to="#">Help</Link>
        </div>

        <div className="col install">
            <h4>Install App</h4>
            <p>From App Store or Google Play</p>
            <div className="row">
                <img src={aap} alt=""></img>
                <img src={play} alt=""></img>
            </div>
            <p>Secured Payment Gateways</p>
            <img src={pay} alt=""></img>
        </div>

        <div className="copyright">
            <p>© 2025, All rights are reserved by Kids&Co</p>
        </div>
    </footer>

    </div>
  )
}

export default Footer