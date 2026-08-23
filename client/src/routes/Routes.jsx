import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";

const router = createBrowserRouter(
    [
       {
         path: '/',
        element: <Main></Main>,
        children: [
           {
             index: true,
            element: <Home></Home>,
            loader: ()=> fetch(`${import.meta.env.VITE_API_URL}/jobs`)
           },
           {
             path:'/login',
            element: <Login></Login>
           },
           {
            path:'/register',
            element: <Register></Register>
           }

        ]
       }
    ]
)

export default router 