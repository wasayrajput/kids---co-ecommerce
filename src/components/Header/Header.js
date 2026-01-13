import React from 'react'
import './Header.css'
import logo from'./logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingBag, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../Signup-Form/userSlice';
import { FaSearch, FaShoppingCart} from "react-icons/fa";


const Header = () => {


  const user = useSelector(selectUser)
  
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();

    
    dispatch(logout());
  }
   
  return (
    <div>
        <section id='header'>
            <img src={logo} alt=''></img>
            {/* <div id='navbar'> */}
                <ul className='nav-links'>
                    <li><NavLink to='/' className={({isActive}) => isActive ? "active-link": ""}>Home</NavLink></li>
                    <li><NavLink to='/shop' className={({isActive}) => isActive ? "active-link": ""}>Shop</NavLink></li>
                    <li><NavLink to='/blog' className={({isActive}) => isActive ? "active-link": ""}>Blog</NavLink></li>
                    <li><NavLink to='/about' className={({isActive}) => isActive ? "active-link": ""}>About</NavLink></li>
                    <li><NavLink to='/contact' className={({isActive}) => isActive ? "active-link": ""}>Contact</NavLink></li>
                    <li><NavLink to='/cart' className={({isActive}) => isActive ? "active-link": ""}><FaShoppingBag /></NavLink></li>
                    </ul>

                    <div className='icons'>
                      <FaSearch className="icon" />
                      
                    { user ?
                      <div className='logout'><h3>Hi <span>{user.name}</span></h3>
                      <p className='logout-btn' onClick={(e) => handleLogout(e)}>Logout</p>
                      </div> :
                    <li><NavLink to="/login" className='icon'><FaUser /></NavLink></li>
                    }
                    </div>

                    

                
            {/* </div> */}

        </section>
    </div>
  )
}

export default Header