// components/Header/SocialIcons.jsx
import instagram from "../../../assets/img/instagram.png";
import facebook from "../../../assets/img/facebook.png";
import Image from "../common/Image";

const SocialIcons = () => (
  <div className="flex space-x-2">
    
    {/* Instagram */}
    <a 
      href="https://www.instagram.com/YOUR_PAGE_HERE"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={instagram}
        alt="Instagram"
        className="w-6 h-6 rounded-full object-cover cursor-pointer"
      />
    </a>

    {/* Facebook */}
    <a 
      href="https://www.facebook.com/YOUR_PAGE_HERE"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={facebook}
        alt="Facebook"
        className="w-6 h-6 rounded-full object-cover cursor-pointer"
      />
    </a>

  </div>
);

export default SocialIcons;
