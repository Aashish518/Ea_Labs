// components/Header/SocialIcons.jsx
import instagram from "../../../assets/img/instagram.png";
import facebook from "../../../assets/img/facebook.png";
import Image from "../common/Image";

const SocialIcons = () => (
  <div className="flex space-x-2">
    <Image
      src={instagram}
      alt="Facebook"
      className="w-6 h-6 rounded-full object-cover"
    />
    <Image
      src={facebook}
      alt="Instagram"
      className="w-6 h-6 rounded-full object-cover"
    />
  </div>
);

export default SocialIcons;
