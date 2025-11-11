import logoImg from '../../../assets/img/EA-Lab_Logo_Web.png';
import Image from '../common/Image';

const Logo = () => (
        <Image
            src={logoImg}
            alt="EA Lab Logo"
            className="h-8 sm:h-15 w-auto"
        />
);

export default Logo;