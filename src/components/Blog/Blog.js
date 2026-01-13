import React from 'react'
import './Blog.css'
import b19 from './b19.jpg'

import b1 from './blog/b1.jpg'
import b2 from './blog/b2.jpg'
import b3 from './blog/b3.jpg'
import b4 from './blog/b4.jpg'
import b5 from './blog/b5.jpg'

import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";


const Blog = () => {

  const b19Style = {
    '--b19-image': `url(${b19})`
  };

  return (
    <div>

      <section class="blog-header" style={b19Style}>
        
        <h2>#readmore</h2>
        <p>Read all case studies about our products!</p>
    </section>

    <section id="blog">
        <div className="blog-box">
            <div className="blog-img">
                <img src={b1} alt=""></img>
            </div>
            <div class="blog-details">
                <h4>The Cotton-Jersey Zip-Up Hoodie</h4>
                <p>Kickstarter man braid godard coloring book. Reclette waistcoat selfies yr wolf chartreuse hexagon irony, godard...</p>
                <Link to="#">CONTINUE READING</Link>
            </div>
            <h1>13/01</h1>
        </div>

        <div className="blog-box">
            <div className="blog-img">
                <img src={b2} alt=""></img>
            </div>
            <div className="blog-details">
                <h4>How to style a quiff</h4>
                <p>Kickstarter man braid godard coloring book. Reclette waistcoat selfies yr wolf chartreuse hexagon irony, godard...</p>
                <Link to="#">CONTINUE READING</Link>
            </div>
            <h1>13/04</h1>
        </div>

        <div className="blog-box">
            <div className="blog-img">
                <img src={b3} alt=""></img>
            </div>
            <div className="blog-details">
                <h4>Must-Have Skater Girl Items</h4>
                <p>Kickstarter man braid godard coloring book. Reclette waistcoat selfies yr wolf chartreuse hexagon irony, godard...</p>
                <Link to="#">CONTINUE READING</Link>
            </div>
            <h1>12/01</h1>
        </div>

        <div className="blog-box">
            <div class="blog-img">
                <img src={b4} alt=""></img>
            </div>
            <div class="blog-details">
                <h4>Runway-Inspired Trends</h4>
                <p>Kickstarter man braid godard coloring book. Reclette waistcoat selfies yr wolf chartreuse hexagon irony, godard...</p>
                <Link to="#">CONTINUE READING</Link>
            </div>
            <h1>16/01</h1>
        </div>

        <div className="blog-box">
            <div className="blog-img">
                <img src={b5} alt=""></img>
            </div>
            <div className="blog-details">
                <h4>AW20 Menswear Trends</h4>
                <p>Kickstarter man braid godard coloring book. Reclette waistcoat selfies yr wolf chartreuse hexagon irony, godard...</p>
                <Link to="#">CONTINUE READING</Link>
            </div>
            <h1>10/03</h1>
        </div>
    </section>

    <section id="pagination" className="section-p1">
    <Link to="#">1</Link>
    <Link to="#">2</Link>
    <Link to="#"><FaArrowRight /></Link>
    </section>
    
    </div>
  )
}

export default Blog