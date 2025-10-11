import BottomBar from "./ui/footer/BottomBar ";
import ContactInfo from "./ui/footer/ContactInfo ";
import LogoBlock from "./ui/footer/LogoBlock";
import QuickLinks from "./ui/footer/QuickLinks ";

// components/Footer/Footer.jsx
const Footer = () => (
    <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-3 gap-8">
                <LogoBlock />
                <QuickLinks />
                <ContactInfo />
            </div>
            <BottomBar />
        </div>
    </footer>
);

export default Footer;
