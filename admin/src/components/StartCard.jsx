import Card from "./layout/Card";

const StatCard = ({ title, value, icon: Icon, iconcolor }) => (
  <Card className="p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className={`font-medium text-gray-600`}>{title}</p>
        <h3 className={`text-2xl font-bold ${iconcolor} mt-2`}>{value}</h3>
      </div>
      <Icon className={`w-12 h-12 ${iconcolor} opacity-20`} />
    </div>
  </Card>
);

export default StatCard;