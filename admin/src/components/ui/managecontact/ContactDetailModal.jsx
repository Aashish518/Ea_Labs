import Modal from "../../layout/Modal";

const ContactDetailModal = ({ isOpen, onClose, contact }) => {
    if (!contact) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Contact Details">
            <div className="space-y-4 text-gray-700">
                <div>
                    <strong className="block text-sm text-gray-500">Name</strong>
                    <p>{contact.name}</p>
                </div>

                {contact.companyName && (
                    <div>
                        <strong className="block text-sm text-gray-500">Company Name</strong>
                        <p>{contact.companyName}</p>
                    </div>
                )}

                <div>
                    <strong className="block text-sm text-gray-500">Email</strong>
                    <p>{contact.email}</p>
                </div>

                <div>
                    <strong className="block text-sm text-gray-500">Phone</strong>
                    <p>{contact.phone}</p>
                </div>

                <div>
                    <strong className="block text-sm text-gray-500">Address</strong>
                    <p>{contact.address}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <strong className="block text-sm text-gray-500">City</strong>
                        <p>{contact.city}</p>
                    </div>
                    <div>
                        <strong className="block text-sm text-gray-500">Pincode</strong>
                        <p>{contact.pincode}</p>
                    </div>
                </div>

                <div>
                    <strong className="block text-sm text-gray-500">Created At</strong>
                    <p>{new Date(contact.createdAt).toLocaleString()}</p>
                </div>
            </div>
        </Modal>
    );
};

export default ContactDetailModal;
