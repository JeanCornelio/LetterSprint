
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFoundPage } from '../Errors/NotFoundPage';
import { LoginAndRegistrationPage } from '../Auth/LoginAndRegistrationPage';
import { HomePage } from '../home/HomePage';
import { WritingTestPage } from '../lettesSprint/pages/WritingTestPage';
import { UserPage } from '../lettesSprint/pages/UserPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />, //Application Component
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <WritingTestPage />
      },
      {
        path: "/user",
        element: <UserPage /> // Rememnber put protection in this page
      },
      {
        path: "/login",
        element: <LoginAndRegistrationPage />,  //Home Component
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
