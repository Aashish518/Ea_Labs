// components/Footer/ContactInfo.jsx

import Icon from "../../Icon";

const ContactInfo = () => (
    <div>
        <h3 className="font-bold mb-4">Contact</h3>
        <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center space-x-2">
                <Icon
                    path="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.211-.998-.582-1.35L18.75 15.75M2.25 6.75H4.5m16.5 0l-3.75-3.75a2.25 2.25 0 00-3.182 0L9 12.75"
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
