import React from 'react'
import './Contact.css'
import b21 from './b21.jpg'

import p1 from './people/p1.jpg'
import p2 from './people/p2.jpg'
import p3 from './people/p3.jpg'

import { FaMapMarkedAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { useEffect } from 'react'

const Contact = () => {

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const b21Style = {
    '--b21-image': `url(${b21})`
  };

  return (
    <div>

    <section  className="about-header5" style={b21Style}>
        
        <h2>#let's_talk</h2>
        <p>LEAVE A MESSAGE, we love to hear from you!</p>
    </section>

    <section id="contact-details" className="section-p1">
        <div className="details">
            <span>GET  IN TOUCH</span>
            <h2>Visit one of our  agency locations or contact us today</h2>
            <h3>Head Office</h3>
            <div>
                <li>
                    <FaMapMarkedAlt className='icons2' />
                    <p>Shop #8 Ali plaza, Main bazar yateem khana</p>
                </li>
                <li>
                    <FaEnvelope className='icons2' />
                    <p>kids&co@example.com</p>
                </li>
                <li>
                    <FaPhone className='icons2' />
                    <p>+92 301 4907544 / +92 309 6308146</p> 
                </li>
                <li>
                    <FaClock className='icons2'/>
                    <p>11:00 AM - 10:00 PM, 7 days a weak</p>
                </li>
            </div>
        </div>

        <div className="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13602.115619733504!2d74.26227364299841!3d31.53709637583881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903238bfe5f75%3A0xd27a97124e594e81!2sYateem%20Khana%20Shera%20Kot%2C%20Lahore%2C%2054000%2C%20Pakistan!5e0!3m2!1sen!2s!4v1753792737679!5m2!1sen!2s"></iframe>
        </div>

    </section>

    <section id="form-details">
        <form action="">
            <span>LEAVE A MESSAGE</span>
            <h2>we love to hear from you</h2>
            <input type="text" placeholder="Your Name"></input>
            <input type="text" placeholder="E-mail"></input>
            <input type="text" placeholder="Subject"></input>
            <textarea name="" id="" cols="30" rows="10" placeholder="Your Message"></textarea>
            <button className="normal">Submit</button>
        </form>

        <div className="people">
          <div>
            <img src={p1} alt=""></img>
            <p><span>Abdul Rafay </span>Senior Marketing Manager <br/> +92 304 3508301 <br/> rafay@happykids.com</p>
          </div>

          <div>
            <img src={p2} alt=""></img>
            <p><span>Abdul Razzaq </span>Senior Marketing Manager <br/> +92 301 4907544 <br/> abdul@happykids.com</p>
          </div> 

          <div>
            <img src={p3} alt=""></img>
            <p><span>Abdul Wasay </span>Senior Marketing Manager <br/> +92 309 6308146 <br/> wasay@happykids.com</p>
          </div>  
        </div>
    </section>

    </div>
  )
}

export default Contact