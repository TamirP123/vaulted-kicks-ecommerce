import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Pss2CC5VCV0wby5OZ2mDA4Y7UXCzQZxp50KhC6wxYYcovcPV76x1eABHWwHU2DBr8BeFNoV5dVbLfA8d7418Pl400ncMpKkjH');


import App from './App.jsx';
import Homepage from './pages/Homepage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import SneakersPage from './pages/SneakersPage.jsx';
import SingleSneakerPage from './pages/SingleSneakerPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: 'sneakers',
        element: <SneakersPage />
      },
      {
        path: 'sneaker/:id',
        element: <SingleSneakerPage />
      },
      {
        path: 'checkout',
        element: <CheckoutPage />
      },
      // {
      //   path: 'login',
      //   element: <LoginPage />
      // },
      // {
      //   path: 'signup',
      //   element: <SignupPage />
      // },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Elements stripe={stripePromise}>
    <RouterProvider router={router} />
  </Elements>
);
