import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Card from "../../layout/Card";

const Piechart = ({ title, data, colors }) => {
    return (
        <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                {/* Custom Legend */}
                <div className="flex flex-wrap md:flex-col justify-center md:justify-start gap-3 md:gap-2 w-full md:w-auto">
                    {data.map((entry, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <span
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: colors[index % colors.length] }}
                            />
                            <span className="text-sm text-gray-700">{entry.name}</span>
                        </div>
                    ))}
                </div>

                {/* Pie Chart */}
                <div className="flex-1">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                labelLine={false}
                                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                    const RADIAN = Math.PI / 180;
                                    const radius = innerRadius + (outerRadius - innerRadius) / 2;
                                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                    return (
                                        <text
                                            x={x}
                                            y={y}
                                            fill="white"
                                            textAnchor="middle"
                                            dominantBaseline="central"
                                            fontSize={12}
                                            fontWeight="bold"
                                        >
                                            {`${(percent * 100).toFixed(0)}%`}
                                        </text>
                                    );
                                }}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card>
    );
};

export default Piechart;
