import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/DashBoard";
import MainLayout from "../components/layout/MainLayout";
import SliderImages from "../pages/SliderImages";
import TestsManagement from "../pages/ManageTests";
import ManageContacts from "../pages/ManageContacts";
import ManageTestPackages from "../pages/ManageTestPackages";
import TestMenu from "../pages/TestMenu";
import AboutUs from "../pages/AboutUs";
import ResourceAdmin from "../pages/Resource";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "/sliderimages",
                element:<SliderImages/>,
            },
            {
                path: "/managetests",
                element: <TestsManagement />,
            },
            {
                path: "/managecontacts",
                element:<ManageContacts/>
            },
            {
                path: "managetestpackage",
                element: <ManageTestPackages />
            },
            {
                path: "testmenu",
                element: <TestMenu />
            },
            {
                path: "aboutus",
                element: <AboutUs />
            },
            {
                path: "resource",
                element: <ResourceAdmin />
            }
        ],
    },
]);

function Routes() {
    return <RouterProvider router={router} />;
}

export default Routes;
