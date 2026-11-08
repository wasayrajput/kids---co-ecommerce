import React from 'react'
import './About.css'
import banner from './about/banner.jpg'
import a6 from './about/a6.jpg'
import vvideo from './about/vvideo.mp4'

import featuresf1 from '../Home/features/f1.png'
import featuresf2 from '../Home/features/f2.png'
import featuresf3 from '../Home/features/f3.jpg'
import featuresf4 from '../Home/features/f4.jpg'
import featuresf5 from '../Home/features/f5.jpg'

import { Link } from 'react-router-dom'
import { useEffect } from 'react'




const About = () => {

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

  const bannerStyle = {
    '--banner-image': `url(${banner})`
  }

  return (
    <div>

    <section  className="about-header" style={bannerStyle}>
        
        <h2>#knowus</h2>
        <p>Lorem ipsum dolar sit amet, consectetur</p>
    </section>

    <section id="about-head" className="section-p1">
        <img src={a6} alt=" "></img>
        <div>
            <h2>Who We Are?</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores deleniti est nobis quisquam aliquid fugiat repellendus? Voluptates odio molestias laudantium, esse debitis reiciendis ab sint a, sunt doloremque tenetur ipsam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit dolor tempora vitae? Eos distinctio molestiae pariatur, animi sequi quas enim consectetur maxime perspiciatis aperiam, nemo ipsa numquam rerum similique magni!</p>

            <abbr title=''>create stunning images with as much or a litte control as youn like to a choice of Basic and creative modes.</abbr>

            <br/><br/>

            <marquee>create stunning images with as much or a litte control as youn like to a choice of Basic and creative modes.</marquee>
        </div>

    </section>

    <section id="about-app" className="section-p1">
        <h1>Download Our <Link to="#">App</Link></h1>
        <div className="video">
            <video src={vvideo}></video>
        </div>
    </section>

    <section id="feature" className="section-p1">
        <div className="fe-box">
            <img src={featuresf1} alt=""></img>
            <h6>Free Shipping</h6>
        </div>
        <div className="fe-box">
            <img src={featuresf2} alt=""></img>
            <h6>Online Order</h6>
        </div>
        <div className="fe-box">
            <img src={featuresf3} alt=""></img>
            <h6>Save Money</h6>
        </div>
        <div className="fe-box">
            <img src={featuresf4} alt=""></img>
            <h6>Promotions</h6>
        </div>
        <div className="fe-box">
            <img src={featuresf5} alt=""></img>
            <h6>Happy Sell</h6>
        </div>
        {/* <div className="fe-box">
            <img src={f6} alt=""></img>
            <h6>F24/7 Support</h6>
        </div> */}
    </section>

    

    </div>
  )
}

export default About