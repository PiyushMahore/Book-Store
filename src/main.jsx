import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FirebaseProvider } from './Context/FirebaseContext.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './Pages/SignUp.jsx'
import Login from './Pages/Login.jsx'
import { ThemeProvider } from "@material-tailwind/react";
import Addbook from './Pages/Addbook.jsx'
import Home from './Pages/Home.jsx'
import Details from './Pages/Details.jsx'
import Orders from './Pages/Orders.jsx'
import OrderDetails from './Pages/OrderDetails.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/addbooks',
        element: <Addbook />
      },
      {
        path: `/book/view/:id`,
        element: <Details />
      },
      {
        path: `/book/orders`,
        element: <Orders />
      },
      {
        path: `/book/orders/:id`,
        element: <OrderDetails />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <FirebaseProvider>
        <RouterProvider router={router} />
      </FirebaseProvider>
    </ThemeProvider>
  </React.StrictMode>
)
