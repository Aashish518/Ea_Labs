import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FlaskConical, Menu, X, Home, ClipboardList, FileText, Calendar, Images, Package } from "lucide-react";
import SidebarItem from "../SidebarItem";
import logoImg from "../../assets/img/EA-Lab_Logo_Web.png";
import Image from "../ui/common/Image";
import Button from "../ui/common/Button";

const sidebarItems = [
    { icon: Home, label: "Dashboard", id: "dashboard", path: "/" },
    { icon: FlaskConical, label: "Manage Tests", id: "tests", path: "/managetests" },
    { icon: Calendar, label: "Manage Contacts", id: "managecontacts", path: "/managecontacts" },
    { icon: Images, label: " Manage SliderImages", id: "sliderimages", path: "/sliderimages" },
    { icon: Package, label: "Manage Packagecategory", id: "managetestPackage", path: "/managetestpackage" },
];

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSidebarClick = (item) => {
        navigate(item.path);
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} 
                ${sidebarOpen ? "w-full" : "w-0 lg:w-64"}
                fixed lg:static inset-y-0 left-0 z-50
                bg-white border-r border-gray-200 transition-all duration-300 overflow-y-auto`}
            >
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Image
                                src={logoImg}
                                alt="EA Lab Logo"
                                className="h-10 w-auto"
                            />
                        </div>
                        <Button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <X className="w-6 h-6 text-gray-600" />
                        </Button>
                    </div>
                </div>
                <nav className="px-4 py-5 space-y-2">
                    {sidebarItems.map((item) => (
                        <SidebarItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            active={location.pathname === item.path}
                            badge={item.badge}
                            onClick={() => handleSidebarClick(item)}
                        />
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 lg:hidden hover:bg-gray-100 rounded-lg"
                            >
                                <Menu className="w-6 h-6" />
                            </Button>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <div className="text-gray-800 font-semibold text-lg">
                                Welcome Admin
                            </div>
                            <Button
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Main Content Body */}
                <main className="flex-1 overflow-y-auto sm:p-3 bg-gray-200">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;