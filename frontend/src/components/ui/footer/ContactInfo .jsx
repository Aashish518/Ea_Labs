// components/Footer/ContactInfo.jsx

import Icon from "../../Icon";

const ContactInfo = () => (
    <div>
        <h3 className="font-bold mb-4">Contact</h3>
        <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center space-x-2">
                <Icon
                    path="M2.25 4.5c0 9.113 7.137 16.25 16.25 16.25h1a1.25 1.25 0 001.25-1.25v-3.18a1.25 1.25 0 00-.91-1.2l-3.02-.76a1.25 1.25 0 00-1.4.53l-.9 1.42a13.088 13.088 0 01-5.6-5.6l1.42-.9a1.25 1.25 0 00.53-1.4l-.76-3.02A1.25 1.25 0 0010.68 2h-3.18A1.25 1.25 0 006.25 3.25v1z"
                    className="w-5 h-5"
                />

                <span>+91 90990 45241</span>
            </li>
            <li className="flex items-center space-x-2">
                <Icon
                    path="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    className="w-5 h-5"
                />
                <span>endoallergy@yahoo.com</span>
            </li>
        </ul>
    </div>
);

export default ContactInfo;
