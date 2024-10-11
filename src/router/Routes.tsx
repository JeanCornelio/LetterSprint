
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFoundPage } from '../Errors/NotFoundPage';
import { LoginPage } from '../Auth/LoginPage';
import { HomePage } from '../home/HomePage';

const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>, //Application Component
      errorElement: <NotFoundPage />,
    },
    {
      path: "/login",
      element: <LoginPage/>,  //Home Component
    },
  ]);
  

export const Routes = () => {
  return (
    <RouterProvider router={router}  />
  )
}
