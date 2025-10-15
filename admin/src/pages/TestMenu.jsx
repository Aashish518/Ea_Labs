import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, TestTube, Plus } from 'lucide-react';
import Input from "../components/ui/common/Input";
import Button from "../components/ui/common/Button";
import StatCard from "../components/StartCard";
import Card from '../components/layout/Card';
import Table from "../components/Table";
import { getAllTestMenus, createTestMenu, updateTestMenu, deleteTestMenu } from '../api/apis/testmenu';
import TestMenuViewModal from '../components/ui/testmenu/TestMenuView';
import TestMenuFormModal from '../components/ui/testmenu/TestMenuForm';


export default function TestMenu() {
    const [filters, setFilters] = useState({ search: '' });
    const [selectedTest, setSelectedTest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    const queryClient = useQueryClient();

    const { data: testMenus = [], isLoading, isError } = useQuery({
        queryKey: ['testMenus'],
        queryFn: getAllTestMenus,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTestMenu,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['testMenus'] }),
    });

    const createMutation = useMutation({
        mutationFn: createTestMenu,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['testMenus'] });
            setIsFormModalOpen(false);
            setSelectedTest(null); 
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateTestMenu(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['testMenus'] });
            setIsFormModalOpen(false);
            setSelectedTest(null);
        },
    });

    const handleRowClick = (id) => {
        const test = testMenus.find(t => t._id === id);
        setSelectedTest(test);
        setIsModalOpen(true);
    };

    const handleEdit = (id) => {
        const test = testMenus.find(t => t._id === id);
        setSelectedTest(test);
        setIsFormModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this test?')) {
            deleteMutation.mutate(id);
        }
    };

    const handleFormSubmit = (formData) => {
        formData.price = parseFloat(formData.price);

        if (selectedTest?._id) {
            updateMutation.mutate({ id: selectedTest._id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const filteredTests = testMenus
        .filter(test => test.name.toLowerCase().includes(filters.search.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));

    const tableData = filteredTests.map(test => ({
        _id: test._id,
        name: test.name,
        sampleType: test.sampleType,
        sampleVolume: test.sampleVolume,
        testMethod: test.testMethod,
        price: `₹${test.price}`
    }));

    const totalTests = testMenus.length;

    if (isLoading) return <p className="text-center text-indigo-700 mt-8">Loading tests...</p>;
    if (isError) return <p className="text-center text-red-600 mt-8">Failed to load tests.</p>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-2">
                    <h1 className="text-3xl font-bold text-gray-800">Test Menu</h1>
                    <p className="text-gray-600 mb-6 mt-1">
                        View and manage all testmenu records, pricing, and details efficiently.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-end">
                    <StatCard title="Total Tests" value={totalTests} icon={TestTube} iconcolor="text-blue-600" />
                </div>
                
                <Card>
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <h2 className="text-xl font-bold text-gray-900">Tests</h2>
                            <div className="flex flex-col md:flex-row gap-3">
                                {/* Search input */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        type="text"
                                        placeholder="Search tests..."
                                        value={filters.search}
                                        onChange={(e) => setFilters({ search: e.target.value })}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-[30rem]"
                                    />
                                </div>


                                {/* Add test button */}
                                <Button
                                    onClick={() => { setSelectedTest(null); setIsFormModalOpen(true); }}
                                    className="flex justify-center px-4 py-2 rounded-lg font-medium transition duration-200 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add Test
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <Table
                        headers={['Test Name', 'Sample Type', 'Sample Volume', 'Test Method', 'Price']}
                        data={tableData}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onRowClick={handleRowClick}
                        emptyMessage="No tests found. Create your first test!"
                    />
                </Card>

                {/* Modals */}
                <TestMenuViewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} test={selectedTest} />
                
                <TestMenuFormModal
                    isOpen={isFormModalOpen}
                    onClose={() => { setIsFormModalOpen(false); setSelectedTest(null); }}
                    onSubmit={handleFormSubmit} 
                    initialData={selectedTest || {}}
                />
            </div>
        </div>
    );
}
