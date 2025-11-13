import React, { useState } from 'react';
import { Plus, FileText } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import StatCard from '../components/StartCard';
import Card from '../components/layout/Card';
import Button from '../components/ui/common/Button';
import Table from '../components/Table';
import AboutUsFormModal from "../components/ui/aboutus/AboutUsFormModal";
import AboutUsViewModal from '../components/ui/aboutus/AboutUsViewModal';
import AlertBox from "../components/ui/common/AlertBox";
import ConfirmBox from "../components/ui/common/ConfirmBox";
import {
  getAllAboutUs,
  createAboutUs,
  updateAboutUs,
  deleteAboutUs,
} from '../api/apis/aboutUs';

const AboutUsAdmin = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch data
  const { data: aboutData = [], isLoading } = useQuery({
    queryKey: ['aboutus'],
    queryFn: getAllAboutUs,
  });

  // ✅ Create Mutation
  const createMutation = useMutation({
    mutationFn: createAboutUs,
    onSuccess: () => {
      queryClient.invalidateQueries(['aboutus']);
      AlertBox({ type: 'success', message: 'Content added successfully!' });
    },
    onError: () => {
      AlertBox({ type: 'error', message: 'Failed to add content!' });
    },
  });

  // ✅ Update Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, formData }) => updateAboutUs(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(['aboutus']);
      AlertBox({ type: 'success', message: 'Content updated successfully!' });
    },
    onError: () => {
      AlertBox({ type: 'error', message: 'Failed to update content!' });
    },
  });

  // ✅ Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteAboutUs,
    onSuccess: () => {
      queryClient.invalidateQueries(['aboutus']);
      AlertBox({ type: 'success', message: 'Content deleted successfully!' });
    },
    onError: () => {
      AlertBox({ type: 'error', message: 'Failed to delete content!' });
    },
  });

  // ✅ Local state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // ✅ Handle edit
  const handleEdit = (id) => {
    const item = aboutData.find((d) => d._id === id);
    setSelectedItem(item);
    setIsFormModalOpen(true);
  };

  // ✅ Handle delete with confirmation
  const handleDelete = async (id) => {
    const confirmed = await ConfirmBox({
      title: "Delete Section?",
      message: "Are you sure you want to permanently delete this section?",
      confirmText: "Yes, Delete",
      cancelText: "Cancel",
      icon: "warning",
      important: true,
      successMessage: "Section deleted successfully!",
      successTitle: "Deleted!",
    });

    if (confirmed) {
      deleteMutation.mutate(id);
    }
  };

  // ✅ Handle row click
  const handleRowClick = (id) => {
    const item = aboutData.find((d) => d._id === id);
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  // ✅ Handle save for add/update
  const handleSave = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.image) formData.append('image', data.image);

    try {
      if (data._id) {
        await updateMutation.mutateAsync({ id: data._id, formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      setIsFormModalOpen(false);
      setSelectedItem(null);
    } catch (error) {
      AlertBox({ type: 'error', message: 'Something went wrong!' });
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  // ✅ Prepare table data
  const tableData = aboutData.map((item) => {
    const shortDescription =
      item.description?.length > 25
        ? item.description.slice(0, 25) + "..."
        : item.description;

    return {
      _id: item._id,
      image: item.image
        ? `${import.meta.env.VITE_BACK_URL}/${item.image}`
        : "/placeholder.png",
      title: item.title,
      description: shortDescription,
    };
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">About Us Management</h1>
          <p className="text-gray-600">Manage your About Us content</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard
            title="Total Sections"
            value={aboutData.length}
            icon={FileText}
            iconcolor="text-blue-600"
          />
        </div>

        {/* Table */}
        <Card>
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900">About Us Content</h2>
              <Button
                onClick={() => {
                  setSelectedItem(null);
                  setIsFormModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition duration-200 bg-blue-600 text-white hover:bg-blue-700"
              >
                <Plus className="w-5 h-5" />
                Add Content
              </Button>
            </div>
          </div>

          <Table
            headers={['Image', 'Title', 'Description']}
            data={tableData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRowClick={handleRowClick}
            emptyMessage="No About Us content available. Add your first section!"
          />
        </Card>

        {/* Form Modal */}
        {isFormModalOpen && (
          <AboutUsFormModal
            selectedItem={selectedItem}
            onClose={() => setIsFormModalOpen(false)}
            onSave={handleSave}
          />
        )}

        {/* View Modal */}
        {isDetailModalOpen && selectedItem && (
          <AboutUsViewModal
            item={selectedItem}
            onClose={() => setIsDetailModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AboutUsAdmin;
