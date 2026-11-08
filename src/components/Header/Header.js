import React, { useState } from 'react'
import './Header.css'
import logo from'./logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingBag, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../Signup-Form/userSlice';
import { FaSearch, FaShoppingCart} from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { SiGoogletasks } from "react-icons/si";
import { IoSettingsSharp } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { HiUsers } from "react-icons/hi2";
import { GiHamburgerMenu } from "react-icons/gi";


const Header = () => {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  console.log('123', user);
  
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    localStorage.removeItem('token');
    setShowDropdown(false);
    navigate('/');
  };

  //  console.log("REDUX USER:", user);
   
  return (
    <div>
        <section id='header'>
            <img src={logo} alt=" "></img>
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
                      
                    {user ? (
                      <div className="user-menu-container">

                        <span className='user-display-name'>
                          Hi, <b>{user.username}</b>
                        </span>

                        <div 
                          className={`hamburger-trigger ${showDropdown ? 'active' : ''}`} 
                          onClick={() => setShowDropdown(!showDropdown)}
                        >
                          <GiHamburgerMenu className='menu-icon' />
                        </div>

              {showDropdown && (
                <div className="dropdown-menu">
                  
                  <Link to="/profile" onClick={() => setShowDropdown(false)}><CgProfile />My Profile</Link>
                  <Link to='/tasktable' onClick={() => setShowDropdown(false)}><SiGoogletasks />My Tasks</Link>

                  {user?.type?.toLowerCase() === 'admin' && (
                        <Link to="/admin/users" onClick={() => setShowDropdown(false)}>
                              <HiUsers /> Manage Users
                        </Link>
                          )}

                  <Link to="/settings" onClick={() => setShowDropdown(false)}><IoSettingsSharp />Settings</Link>
                  <hr/>
                  <p className='logout-btn' onClick={handleLogout}><RiLogoutCircleRLine />Logout</p>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/signup" className='icon'><FaUser /></NavLink>
          )}
        </div>
      </section>
    </div>
  );
};

export default Header