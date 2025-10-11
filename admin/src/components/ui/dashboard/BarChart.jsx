import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Card from "../../layout/Card";

const Barchart = ({ title, data, dataKey, barColor = "#3B82F6" }) => {
    return (
        <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <ResponsiveContainer height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    />
                    <Bar dataKey={dataKey} fill={barColor} radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default Barchart;
