import { Users, FlaskConical } from 'lucide-react';
import StatCard from '../components/StartCard';
import { useQuery } from "@tanstack/react-query";
import { trackVisitor } from "../api/apis/visiter";
import Visiter from '../components/ui/dashboard/Visiter';
import Barchart from '../components/ui/dashboard/BarChart';
import Piechart from '../components/ui/dashboard/Piechart';
import { getContacts } from '../api/apis/contactUs';
import { getTests } from '../api/apis/testsapi';

const Dashboard = () => {
    // 🧭 Visitor Data
    const { data: visitorData, isLoading, isError } = useQuery({
        queryKey: ["visitorCount"],
        queryFn: trackVisitor,
    });

    // 📨 Contact Data
    const { data: contactdata, isLoading: contactLoading, isError: contactError } = useQuery({
        queryKey: ["contacts"],
        queryFn: getContacts,
    });

    // 🧪 Test Data
    const { data: testsResponse = [] } = useQuery({
        queryKey: ["tests"],
        queryFn: getTests,
    });

    if (isLoading || contactLoading) {
        return <p className="text-gray-500">Loading dashboard...</p>;
    }

    if (isError || contactError) {
        return <p className="text-red-500">Error fetching data</p>;
    }

    const contacts = contactdata?.data || [];
    const totalContacts = contacts.length;

    // 📅 Calculate Today's Contacts
    const today = new Date();
    const todayLocal = today.toISOString().split("T")[0];
    const todayContacts = contacts.filter((c) => c.createdAt?.slice(0, 10) === todayLocal).length;

    // 📊 Calculate Contacts for Current Week
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
    });

    const contactsData = weekDays.map((d) => {
        const dateStr = d.toISOString().slice(0, 10);
        const count = contacts.filter((c) => c.createdAt?.slice(0, 10) === dateStr).length;
        const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
        return { day: dayName, contacts: count };
    });

    // 📈 Stats Cards
    const stats = [
        { title: 'Total Today Contacts', value: todayContacts, icon: FlaskConical, iconcolor: 'text-blue-500' },
        { title: 'Total Contacts', value: totalContacts, icon: Users, iconcolor: 'text-green-500' },
    ];

    // 🧪 Test Distribution (Piechart)
    const tests = testsResponse || [];
    const testTypesMap = {};
    tests.forEach(test => {
        const categoryName = test.category?.categoryName || "Uncategorized";
        testTypesMap[categoryName] = (testTypesMap[categoryName] || 0) + 1;
    });
    const testTypesData = Object.entries(testTypesMap).map(([name, value]) => ({ name, value }));

    const COLORS = ['#EF4444', '#3B82F6', '#10B981', '#8B5CF6'];

    // 🧩 Render
    return (
        <div>
            <main className="flex-1 overflow-y-auto p-6 bg-white">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">Laboratory Dashboard</h2>
                </div>

                <Visiter data={visitorData} />

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
                    {stats.map((stat, idx) => (
                        <StatCard key={idx} {...stat} />
                    ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <Barchart
                        title="Contacts This Week"
                        data={contactsData}
                        dataKey="contacts"
                        barColor="#3B82F6"
                    />
                    <Piechart
                        title="Test Distribution"
                        data={testTypesData}
                        colors={COLORS}
                    />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
