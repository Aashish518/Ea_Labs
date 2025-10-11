import Icon from "../../Icon";

// Features Component
const Features = () => (
  <section className="bg-white mb-10">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
      <div className="bg-red-600 text-white rounded-lg shadow-lg flex flex-col md:flex-row justify-around items-center py-6">
        <div className="flex items-center space-x-4 p-4">
          <Icon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" className="w-10 h-10" />
          <span className="font-semibold text-2xl">Multi-level QC</span>
        </div>
        <div className="hidden md:block w-px h-10 bg-red-400"></div>
        <div className="flex items-center space-x-4 p-4">
          <Icon path="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" className="w-10 h-10" />
          <span className="font-semibold text-2xl">Same-day Reports</span>
        </div>
        <div className="hidden md:block w-px h-10 bg-red-400"></div>
        <div className="flex items-center space-x-4 p-4">
          <Icon path="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" className="w-10 h-10" />
          <span className="font-semibold text-2xl">Home Collection</span>
        </div>
      </div>
    </div>
  </section>
);

export default Features;