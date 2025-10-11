import { useEffect, useState } from "react";
import Modal from "../../../layout/Modal";
import Input from "../../common/Input";
import Button from "../../common/Button";

// Location Form Modal
const LocationFormModal = ({ isOpen, onClose, onSubmit, editData }) => {
    const [locationName, setLocationName] = useState(editData?.locationName || '');

    useEffect(() => {
        setLocationName(editData?.locationName || '');
    }, [editData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ locationName });
        setLocationName('');
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editData ? 'Edit Location' : 'Add New Location'}
            size="sm"
        >
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                        label="Location Name"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                        placeholder="Enter location name"
                        required
                    />
                </div>

                <div className="flex gap-3 mt-6">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg font-medium transition duration-200 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="px-4 py-2 rounded-lg font-medium transition duration-200 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300"
                    >
                        {editData ? 'Update' : 'Create'} Location
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default LocationFormModal;
