
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFoundPage } from '../Errors/NotFoundPage';
import { LoginPage } from '../Auth/LoginPage';
import { HomePage } from '../home/HomePage';
import { WritingTest } from '../components';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />, //Application Component
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <WritingTest />
      },
      {
        path: "/login",
        element: <LoginPage />,  //Home Component
      },
    ]
  },

]);


export const Routes = () => {
  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}
