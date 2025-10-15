import Card from "../../layout/Card";
import Button from "../common/Button";
import Table from "../../Table";
import { Plus } from "lucide-react";

const Location = ({ locations, handleDeleteLocation, onAddClick }) => {
    return (
        <Card className="mb-6">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Test Locations</h2>
                <Button
                    onClick={onAddClick}
                    className="flex px-4 py-2 rounded-lg font-medium transition duration-200 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300"
                >
                    <Plus className="w-5 h-5" />
                    Add Location
                </Button>
            </div>

            <Table
                headers={["Location Name"]}
                data={locations.map((loc) => ({
                    locationName: loc.locationName,
                    _id: loc._id,
                }))}
                onDelete={(id) => handleDeleteLocation(id)}
                emptyMessage="No locations found. Create your first Location!"
            />
        </Card>
    );
};

export default Location;
