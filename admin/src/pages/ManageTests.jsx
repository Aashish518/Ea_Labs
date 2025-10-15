import { useState } from "react";
import { FlaskConical, FolderOpen, MapPin } from "lucide-react";
import { useCategories } from "../hooks/useCategories";
import { useLocations } from "../hooks/useLocations";
import { useTests } from "../hooks/useTests";
import {
    handleAddCategory,
    handleDeleteCategory,
    handleUpdateCategory,
} from "../utils/handleCategory";
import { handleAddLocation, handleDeleteLocation } from "../utils/handleLocation";
import { handleAddTest, handleDeleteTest } from "../utils/handleTest";

import StatCard from "../components/StartCard";
import Category from "../components/ui/managetest/Category";
import Location from "../components/ui/managetest/Location";
import Test from "../components/ui/managetest/Test";
import CategoryFormModal from "../components/ui/managetest/category/CategoryFormModal";
import LocationFormModal from "../components/ui/managetest/location/LocationFormModel";
import TestFormModal from "../components/ui/managetest/test/TestFormModal";

const TestsManagement = () => {
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null); 
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingTest, setEditingTest] = useState(null);

    const { categories, addCategory, removeCategory, editCategory } = useCategories();
    const { locations, addLocation, removeLocation } = useLocations();
    const { tests, addTest, editTest, removeTest } = useTests();

    const filteredTests = tests.filter((t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCategoryName = (categoryId) => {
        const cat = categories.find((c) => c._id === categoryId);
        return cat ? cat.categoryName : "Unknown";
    };

    const testTableData = filteredTests.map((test) => ({
        name: test.name,
        category: getCategoryName(test.category._id),
        price: `₹${test.price}`,
        reportTime: test.reportInTime,
        location: Array.isArray(test.locations)
            ? test.locations.map((loc) => loc.locationName).join(", ")
            : "",
        _id: test._id,
    }));

    return (
        <div className="min-h-screen bg-white p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold">Tests Management</h1>
                <p className="text-gray-600 mb-6 mt-1">
                    View and manage all test records, pricing, and details efficiently.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <StatCard title="Total Locations" value={locations.length} icon={MapPin} iconcolor="text-green-500" />
                    <StatCard title="Total Categories" value={categories.length} icon={FolderOpen} iconcolor="text-blue-500" />
                    <StatCard title="Total Tests" value={tests.length} icon={FlaskConical} iconcolor="text-green-500" />
                </div>

                {/* Locations */}
                <Location
                    locations={locations}
                    handleDeleteLocation={(id) => handleDeleteLocation(id, tests,removeLocation)}
                    onAddClick={() => setIsLocationModalOpen(true)}
                />

                {/* Categories */}
                <Category
                    categories={categories}
                    handleDeleteCategory={(id) => handleDeleteCategory(id, tests, removeCategory)}
                    onEditCategory={(cat) => { 
                        setEditingCategory(cat);
                        setIsCategoryModalOpen(true);
                    }}
                    onAddClick={() => {
                        setEditingCategory(null);
                        setIsCategoryModalOpen(true);
                    }}
                />

                {/* Tests */}
                <Test
                    tests={tests}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    testTableData={testTableData}
                    onAddClick={() => {
                        setEditingTest(null);
                        setIsTestModalOpen(true);
                    }}
                    onEdit={(id) => {
                        const testToEdit = tests.find((t) => t._id === id);
                        setEditingTest(testToEdit);
                        setIsTestModalOpen(true);
                    }}
                    onDelete={(id) => handleDeleteTest(id, removeTest)}
                />

                {/* Modals */}
                <LocationFormModal
                    isOpen={isLocationModalOpen}
                    onClose={() => setIsLocationModalOpen(false)}
                    onSubmit={(data) =>
                        handleAddLocation(data, addLocation, () => setIsLocationModalOpen(false))
                    }
                />

                <CategoryFormModal
                    isOpen={isCategoryModalOpen}
                    editData={editingCategory} 
                    onClose={() => setIsCategoryModalOpen(false)}
                    onSubmit={(data) => {
                        if (editingCategory) {
                            handleUpdateCategory(editingCategory._id, data, editCategory, () =>
                                setIsCategoryModalOpen(false)
                            );
                        } else {
                            handleAddCategory(data, addCategory, () =>
                                setIsCategoryModalOpen(false)
                            );
                        }
                    }}
                />

                <TestFormModal
                    isOpen={isTestModalOpen}
                    onClose={() => {
                        setIsTestModalOpen(false);
                        setEditingTest(null);
                    }}
                    onSubmit={(data) =>
                        handleAddTest(data, editingTest, addTest, editTest, () =>
                            setIsTestModalOpen(false)
                        )
                    }
                    editData={editingTest}
                    categories={categories}
                    locations={locations}
                />
            </div>
        </div>
    );
};

export default TestsManagement;
