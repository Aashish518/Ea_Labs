import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import TestDetail from "../pages/TestDetail";
import MainLayout from "../components/layout/MainLayout";
import TestMenu from "../pages/TestMenu";
import ContactUs from "../pages/ContactUs";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/test-detail/:id", element: <TestDetail /> },
            { path: "/test-menu", element: <TestMenu /> },
            {path: "/contactus",element:<ContactUs/>}
        ],
    },
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;