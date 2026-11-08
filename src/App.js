import './App.css';
import Home from './components/Home/Home'
import Shop from './components/Shop/Shop';
import Blog from './components/Blog/Blog';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SProduct from './components/Sproduct/SProduct';

import SignUp from './components/Signup-Form/SignUp';
import Profile from './components/Signup-Form/Profile';
import Settings from './components/Signup-Form/Settings';
import Reset from './components/Signup-Form/Reset';
import Forgot from './components/Signup-Form/Forgot';
import Login from './components/Signup-Form/Login';
import TaskTable from './components/Tasks/TaskTable';
import Admin from './components/Admin/Admin';

import { selectUser } from './components/Signup-Form/userSlice';
import { BrowserRouter, createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PublicRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const PrivateRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// const AdminRoute = ({ user, children }) => {
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
//   if (user.type !== 'admin') {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };


function App() {
  console.log("AdminRoute Check:", typeof AdminRoute);

  const user = useSelector(selectUser)
  const router = createBrowserRouter(
  [
    {path:'/', element:<div><Header/><Home/><Footer/></div>},
    {path:'/shop', element:<div><Header/><Shop/><Footer/></div>},
    {path:'/blog', element:<div><Header/><Blog/><Footer/></div>},
    {path:'/about', element:<div><Header/><About/><Footer/></div>},
    {path:'/contact', element:<div><Header/><Contact/><Footer/></div>},
    {path:'/cart', element:<div><Header/><Cart/><Footer hideNewsletter={true}/></div>},
    {path:'/shop/product', element:<div><SProduct/></div>},
    {path:'/tasktable', element:<PrivateRoute user={user}>
        <div>
          <Header /> 
          <TaskTable />
          <Footer />
        </div>
      </PrivateRoute>},
    
    
    {path:'/signup', element:<PublicRoute user={user}><SignUp /></PublicRoute>},
    {path:'/login', element:<PublicRoute user={user}><Login /></PublicRoute>},
    {path:'/forgot-password', element: <PublicRoute user={user}><Forgot /></PublicRoute>},

    {path:'/profile', element:<PrivateRoute user={user}><Profile /></PrivateRoute>},
    {path:'/settings', element:<PrivateRoute user={user}><Settings /></PrivateRoute>},
    {path:'/reset-password', element:<PrivateRoute user={user}><Reset /></PrivateRoute>},
  //   {
  //    path:'/admin/users',
  //    element: (
  //      <AdminRoute user={user}>
  //        <div>
  //          <Header />
  //          <Admin /> 
  //          <Footer />
  //        </div>
  //      </AdminRoute>
  //    )
  //  },
    {
     path:'/admin/users',
     element: 
         <div>
           <Header />
           <Admin /> 
           <Footer />
         </div>
   },
   

  ]
);
  

  return (
    <div>
      <RouterProvider router={router}/>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>  
  );
}

export default App;
