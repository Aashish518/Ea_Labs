import { useState } from "react";
import { Plus } from "lucide-react";
import Card from "../../layout/Card";
import Button from "../common/Button";
import Table from "../../Table";
import CategoryDetailsModal from "./CategoryDetailsModal "; 

const PackageCategory = ({
    testsData,
    heading,
    tableheader,
    categories,
    handleDeleteCategory,
    onAddClick,
    onEditCategory,
}) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Row click opens modal
    const handleRowClick = (id) => {
        const cat = categories.find((c) => c._id === id);
        if (cat) {
            setSelectedCategory(cat);
            setIsModalOpen(true);
        }
    };

    return (
        <Card className="mb-6">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{heading}</h2>
                <Button
                    onClick={onAddClick}
                    className="flex px-4 py-2 rounded-lg font-medium transition duration-200 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300"
                >
                    <Plus className="w-5 h-5" />
                    Add PackageCategory
                </Button>
            </div>

            <Table
                headers={tableheader}
                data={categories.map((cat) => ({
                    name: cat.name,
                    image: cat.image ? `http://localhost:7000${cat.image}` : null,
                    price: cat.price,
                    enable: cat.enable ? "Yes" : "No",
                    tests: cat.tests?.length || 0,
                    _id: cat._id,
                }))}
                onEdit={(id) => {
                    const cat = categories.find((c) => c._id === id);
                    if (cat && onEditCategory) onEditCategory(cat);
                }}
                onDelete={(id) => handleDeleteCategory(id)}
                onRowClick={handleRowClick} // added row click
                emptyMessage="No categories found. Create your first category!"
            />

            {/* Modal to show full category + tests details */}
            <CategoryDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                category={selectedCategory}
                testsData={testsData} // pass full test data here
            />
        </Card>
    );
};

export default PackageCategory;
