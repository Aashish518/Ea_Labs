// components/Footer/BottomBar.jsx
const BottomBar = () => (
    <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
        <p>&copy; 2024 EA Labs. All rights reserved. Developed by Antinoob Solutions</p>
        <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">User Policy</a>
            <a href="#" className="hover:text-white">Terms & Condition</a>
        </div>
    </div>
);

export default BottomBar;
