import { Plus, Search } from "lucide-react";
import Card from "../../layout/Card";
import Button from "../common/Button";
import Table from "../../Table";
import Input from "../common/Input"
import { useState } from "react";
import TestDetailModal from "./test/TestDetailModal";

const Test = ({
    tests,
    title = "Laboratory Tests",
    searchTerm,
    setSearchTerm,
    testTableData = [],
    onAddClick,
    onEdit,
    onDelete,
}) => {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const handletestdetail = (id) => {
        const data = tests.find((data) => data._id === id);
        setSelectedTest(data)
    }
    return (
        <>
            <Card>
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <h2 className="text-xl font-bold text-gray-900">{title}</h2>

                        <div className="flex flex-col md:flex-row gap-3">
                            {/* Search input */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="text"
                                    placeholder="Search tests..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-[30rem]"
                                />
                            </div>


                            {/* Add test button */}
                            <Button
                                onClick={onAddClick}
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
                    headers={["Test Name", "Category", "Price", "Report Time", "Location"]}
                    data={testTableData}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onRowClick={(id) => {
                        handletestdetail(id);
                        setIsDetailModalOpen(true);
                    }}
                    emptyMessage="No tests found. Create your first test!"
                />
            </Card>
            <TestDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                test={selectedTest}
            />
        </>
    );
};

export default Test;
