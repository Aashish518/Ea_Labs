import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Phone } from "lucide-react";
import Table from "../components/Table";
import { getContacts, deleteContact } from "../api/apis/contactUs";
import ConfirmBox from "../components/ui/common/ConfirmBox";
import Input from "../components/ui/common/Input"
import StatCard from "../components/StartCard";
import ContactDetailModal from "../components/ui/managecontact/ContactDetailModal";
import Card from "../components/layout/Card";

const ManageContact = () => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState("");
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedContact, setSelectedContact]=useState(null)



    //Tan Stack
    const { data: contactsResponse, isLoading, isError } = useQuery({
        queryKey: ["contacts"],
        queryFn: getContacts,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
    });



    // Handler
    const handleDelete = async (id) => {
        try {
            const confirmed = await ConfirmBox({
                title: "Delete Test?",
                message: "Are you sure you want to delete this test?",
                confirmText: "Yes, delete it!",
                successTitle: "Deleted!",
                successMessage: "Test deleted successfully!",
            });

            if (confirmed) {
                await deleteMutation.mutate(id);
            }
        } catch (error) {
            console.error("Error deleting test:", error);
        }
    };



    const contacts = contactsResponse?.data || [];

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm) ||
        contact.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const tableHeaders = ["Name", "Email", "Phone", "Full Address", "Date"];

    const tableData = filteredContacts.map(contact => ({
        _id:contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: `${contact.address}, ${contact.city} - ${contact.pincode}`,
        date: contact.createdAt.slice(0, 10),
    }));

    if (isLoading) return <p>Loading contacts...</p>;
    if (isError) return <p>Error fetching contacts.</p>;

    const handlecontactdetail = (id) => {
        const data = contacts.find((data) => data._id === id);
        setSelectedContact(data)
    }

    return (
        <div className="space-y-6 bg-white p-6 min-h-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manage Contacts</h1>
                    <p className="text-sm text-gray-500 mt-1">View and manage all contact submissions</p>
                </div>
            </div>

            {/* Search and Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-end">
                <StatCard title="Total Contacts" value={contacts.length} icon={Phone} iconcolor="text-blue-500" />
            </div>

            <Card>
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <h2 className="text-xl font-bold text-gray-900">Contacts</h2>

                        <div className="flex flex-col md:flex-row gap-3">
                            {/* Search input */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="text"
                                    placeholder="Search by name, email or phone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-120"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                    <Table
                        headers={tableHeaders}
                        data={tableData}
                        onDelete={(id) => handleDelete(id)}
                        onRowClick={(id) => {
                            handlecontactdetail(id);
                            setIsDetailModalOpen(true);
                        }}
                        emptyMessage="No contacts found matching your search."
                    />
            </Card>


            {/*model */}
            <ContactDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                contact={selectedContact}
            />

        </div>
    );
};

export default ManageContact;
