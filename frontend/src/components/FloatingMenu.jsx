import { Home, FileText, LogIn, HeadphonesIcon } from "lucide-react";

const FloatingMenu = () => {
  const menuItems = [
    {
      label: "Book Home Collection",
      icon: <Home size={22} />,
      link: "mailto:endoallergy@gmail.com",
    },
    {
      label: "Online Test Report",
      icon: <FileText size={22} />,
      link: "http://103.79.8.58:8192/eaweb/",
    },
    {
      label: "Login",
      icon: <LogIn size={22} />,
      link: "http://103.79.8.58:8192/eaweb/",
    },
    {
      label: "Enquiry",
      icon: <HeadphonesIcon size={22} />,
      link: "tel:9099045241",
    },
  ];

  return (
    <div
      className="
        fixed 
        bottom-0 left-0 w-full
        z-40
        flex items-end justify-center 
        sm:flex-col
      "
    >
      {menuItems.map((item, idx) => (
        <a
          key={idx}
          href={item.link}
          className="
            bg-[#AA1626]
            text-white
            flex flex-col items-center justify-center
            text-center

            flex-1 h-16 sm:w-20 sm:h-24
            hover:bg-[#8c1020] 
            transition-all duration-200
            shadow-md
            p-2
          "
        >
          {item.icon}
          <span className="text-[9px] sm:text-[10px] mt-1 leading-tight font-medium">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default FloatingMenu;
