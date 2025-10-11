import { Users, Activity, FlaskConical, ClipboardList } from 'lucide-react';
import StatCard from '../components/StartCard';
import { useQuery } from "@tanstack/react-query";
import { trackVisitor } from "../api/apis/visiter";
import Visiter from '../components/ui/dashboard/Visiter';
import Barchart from '../components/ui/dashboard/BarChart';
import Piechart from '../components/ui/dashboard/Piechart';
import { getContacts } from '../api/apis/contactUs';
import { getTests } from '../api/apis/testsapi';

const Dashboard = () => {


    //Tan Stack
    const { data, isLoading, isError } = useQuery({
        queryKey: ["visitorCount"],
        queryFn: trackVisitor,
    });

    const { data: contactdata, isLoading:contactLoding, isError:contacterror } = useQuery({
        queryKey: ["contacts"],
        queryFn: getContacts,
    });

    const { data: testsResponse = [] } = useQuery({
        queryKey: ["tests"],
        queryFn: getTests,
    });


    if (isLoading || contactLoding) {
        return <p className="text-gray-500">Loading visitors...</p>;
    }

    if (isError || contacterror) {
        return <p className="text-red-500">Error fetching visitors</p>;
    }

    const contacts = contactdata?.data || [];

    const totalContacts = contacts.length;

    const today = new Date(); 
    const todayContacts = contacts.filter(
        (c) => c.createdAt?.slice(0, 10) === today
    ).length;


    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        weekDays.push(d);
    }

    const testsData = weekDays.map(d => {
        const dateStr = d.toISOString().slice(0, 10);
        const count = contacts.filter(c => c.createdAt?.slice(0, 10) === dateStr).length;
        const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
        return { day: dayName, tests: count };
    });

    const stats = [
        { title: 'Total Today Contact', value: todayContacts, icon: FlaskConical, iconcolor: 'text-blue-500' },
        { title: 'Total Contact', value: totalContacts, icon: Users, iconcolor: 'text-green-500' },
    ];


    const tests = testsResponse || [];

    const testTypesMap = {};

    tests.forEach(test => {
        const categoryName = test.category?.categoryName || "Uncategorized";
        if (testTypesMap[categoryName]) {
            testTypesMap[categoryName] += 1;
        } else {
            testTypesMap[categoryName] = 1;
        }
    });

    const testTypesData = Object.entries(testTypesMap).map(([name, value]) => ({ name, value }));

    const COLORS = ['#EF4444', '#3B82F6', '#10B981', '#8B5CF6'];


    return (
        <div>
            {/* Content Area */}
            <main className="flex-1 overflow-y-auto p-6 bg-white">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">Laboratory Dashboard</h2>
                </div>

                <Visiter data={data} />

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
                    {stats.map((stat, idx) => (
                        <StatCard key={idx} {...stat} />
                    ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <Barchart title="Tests This Week" data={testsData} dataKey="tests" barColor="#3B82F6" />
                    <Piechart title="Test Distribution" data={testTypesData} colors={COLORS} />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;