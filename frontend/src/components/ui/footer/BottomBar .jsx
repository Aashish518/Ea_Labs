const BottomBar = () => (
  <div
    className="
      mt-8 pt-8 border-t border-gray-700 
      flex flex-col md:flex-row 
      justify-between items-center 
      text-sm text-gray-400 gap-4
    "
  >

    {/* Links – show first on mobile, right side on desktop */}
    <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:order-2">
      <a href="/privacypolicy" className="hover:text-white transition">Privacy Policy</a>
      <a href="/userpolicy" className="hover:text-white transition">User Policy</a>
      <a href="/termsandconditions" className="hover:text-white transition">Terms &amp; Condition</a>
    </div>

    {/* Copyright – second on mobile, left on desktop */}
    <p className="text-center md:text-left md:order-1 leading-tight">
      © 2025 EA Labs. All rights reserved.
      <br />
      Developed by Antinoob Solutions
    </p>

  </div>
);

export default BottomBar;
