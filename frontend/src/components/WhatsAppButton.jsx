import whatsapp from "../../public/whatsapp.svg";
const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/9099045241"  
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed z-40

        /* Mobile position */
        bottom-20 right-3

        /* Desktop position */
        sm:bottom-6 sm:left-6

        text-white
        w-14 h-14 sm:w-16 sm:h-16
        rounded-full

        flex items-center justify-center
        
        /* Animation effects */
        transition-all duration-300
        hover:scale-110
        active:scale-95
        
        /* Pulse animation */
        animate-pulse
        hover:animate-none
        
        /* Shadow for depth */
        shadow-lg hover:shadow-2xl
      "
    >
      <img
        src={whatsapp}
        alt="WhatsApp"
        className="w-12 h-12 sm:w-15 sm:h-15 transition-transform duration-300"
      />
    </a>
  );
};

export default WhatsAppButton;
