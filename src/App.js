import './App.css';
import Home from './components/Home/Home'
import Shop from './components/Shop/Shop';
import Blog from './components/Blog/Blog';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Signup-Form/Login';
import SProduct from './components/Sproduct/SProduct';
import { selectUser } from './components/Signup-Form/userSlice';
import { BrowserRouter, createBrowserRouter, RouterProvider, } from 'react-router-dom';
import { useSelector } from 'react-redux';


function App() {


  const user = useSelector(selectUser)

  const router = createBrowserRouter(
  [
    {path:'/', element:<div><Header/><Home/><Footer/></div>},
    {path:'/shop', element:<div><Header/><Shop/><Footer/></div>},
    {path:'/blog', element:<div><Header/><Blog/><Footer/></div>},
    {path:'/about', element:<div><Header/><About/><Footer/></div>},
    {path:'/contact', element:<div><Header/><Contact/><Footer/></div>},
    {path:'/cart', element:<div><Header/><Cart/><Footer hideNewsletter={true}/></div>},
    {path:'/login', element:<div><Login/></div>},
    {path:'/shop/product', element:<div><SProduct/></div>},

  ]
);
  

  return (
    <div>
      <RouterProvider router={router}/>

    </div>  
  );
}

export default App;
