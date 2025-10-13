import { Plus } from "lucide-react";
import Card from "../../layout/Card";
import Button from "../common/Button";
import Table from "../../Table";

const PackageCategory = ({ heading,tableheader,categories, handleDeleteCategory, onAddClick, onEditCategory }) => {
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
                    name:cat.name,
                    image: cat.image ? `http://localhost:7000${cat.image}` : null,
                    price: cat.price,
                    enable: cat.enable?"yes":"no",
                    tests: cat.tests?.length || 0,
                    _id: cat._id,
                }))}
                onEdit={(id) => {
                    const cat = categories.find((c) => c._id === id);
                    if (cat && onEditCategory) onEditCategory(cat);
                }}
                onDelete={(id) => handleDeleteCategory(id)}
                emptyMessage="No categories found. Create your first category!"
            />
        </Card>
    );
};

export default PackageCategory;
