import { createBrowserRouter, Navigate } from "react-router-dom";
import MainPage from "./pages/mainpage/MainPage";
// import ProtectedRoute from "./ProdectedRoute";

const RouterConfig = createBrowserRouter([

    {
        path: '/',
        element: <Navigate to="/landing_page" replace />,
    },
       {
        path: 'landing_page',
        element: <MainPage />
    },
 

]);

export default RouterConfig;
