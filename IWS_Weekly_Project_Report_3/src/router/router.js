
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Signup from '../pages/signup.js';
import FormInput from '../compoment/FormInput';
function router() {
  const route = createBrowserRouter([{ path: "/", element: <div>HEllo</div> }, 
     {
    path: "/signup",
    element: <Signup />
  }])
  return (
    <RouterProvider router={route} />
  );
}
export default router;