import Modal from "../../layout/Modal";

const ContactDetailModal = ({ isOpen, onClose, contact }) => {
    if (!contact) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Contact Details">
            <div className="p-8 space-y-8">

                <div>
                    <h1 className="text-3xl font-light text-gray-900 mb-2">{contact.name}</h1>
                    {contact.companyName && (
                        <p className="text-sm text-gray-500">{contact.companyName}</p>
                    )}
                </div>

                <div className="space-y-6 border-t border-gray-200 pt-6">
                    <div>
                        <span className="text-sm text-gray-500">Email</span>
                        <p className="text-gray-700 mt-1">{contact.email}</p>
                    </div>

                    <div>
                        <span className="text-sm text-gray-500">Phone</span>
                        <p className="text-gray-700 mt-1">{contact.phone}</p>
                    </div>

                    <div>
                        <span className="text-sm text-gray-500">Address</span>
                        <p className="text-gray-700 mt-1">{contact.address}</p>
                    </div>

                    <div className="flex gap-8">
                        <div>
                            <span className="text-sm text-gray-500">City</span>
                            <p className="text-gray-700 mt-1">{contact.city}</p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Pincode</span>
                            <p className="text-gray-700 mt-1">{contact.pincode}</p>
                        </div>
                    </div>
                </div>

                <div className="text-xs text-gray-400 pt-4 border-t border-gray-200">
                    {new Date(contact.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            </div>
        </Modal>
    );
};

export default ContactDetailModal;