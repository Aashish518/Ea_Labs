import Button from "./ui/common/Button";

// Reusable Sidebar Item Component
const SidebarItem = ({ icon: Icon, label, active, onClick, badge }) => (
  <Button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${active
        ? 'bg-blue-600 text-white shadow-lg'
        : 'text-gray-700 hover:bg-gray-100'
      }`}
  >
    <div className="flex items-center space-x-3">
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </div>
    {badge && (
      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${active ? 'bg-white text-blue-600' : 'bg-red-500 text-white'
        }`}>
        {badge}
      </span>
    )}
  </Button>
);

export default SidebarItem;