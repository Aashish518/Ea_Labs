import logoImg from '../../../assets/img/EA-Lab_Logo_Web2.png';

const LogoBlock = () => (
    <div>
        <div className="flex items-center space-x-2 mb-4">
            <img
                        src={logoImg}
                        alt="EA Lab Logo"
                        className="h-10 w-auto"
                    />
        </div>
        <p className="text-gray-400 text-sm">
            108, Westface, Hebatpur Rd, <br />
            near Baghban Party Plot, Thaltej, <br />
            Ahmedabad, Gujarat 380059
        </p>
    </div>
);

export default LogoBlock;
