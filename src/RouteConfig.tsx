import { createBrowserRouter, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingpage/LandingPage";
import MainPage from "./pages/mainpage/MainPage";
import ProfilePage from "./pages/profile/ProfilePage";
// import ProtectedRoute from "./ProdectedRoute";

const RouterConfig = createBrowserRouter([

    {
        path: '/',
        element: <Navigate to="/login" replace />,
    },
    {
        path: 'login',
        element: <LandingPage />
    },
       {
        path: 'landing_page',
        element: <MainPage />
    },
    {
                path: 'brsr/profile',
                element:
                    //  <ProtectedRoute>
                    <ProfilePage />
                // </ProtectedRoute>
            },

]);

export default RouterConfig;
