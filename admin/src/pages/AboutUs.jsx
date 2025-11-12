import React, { useState } from 'react';
import { Plus, FileText } from 'lucide-react';
  import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import StatCard from '../components/StartCard';
import Card from '../components/layout/Card';
import Button from '../components/ui/common/Button';
import Table from '../components/Table';
import AboutUsFormModal from "../components/ui/aboutus/AboutUsFormModal";
import AboutUsViewModal from '../components/ui/aboutus/AboutUsViewModal';
import {
  getAllAboutUs,
  createAboutUs,
  updateAboutUs,
  deleteAboutUs,
} from '../api/apis/aboutUs';

const AboutUsAdmin = () => {
  const queryClient = useQueryClient();

  const { data: aboutData = [], isLoading } = useQuery({
    queryKey: ['aboutus'],
    queryFn: getAllAboutUs,
  });


  const createMutation = useMutation({
    mutationFn: createAboutUs,
    onSuccess: () => queryClient.invalidateQueries(['aboutus']),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }) => updateAboutUs(id, formData),
    onSuccess: () => queryClient.invalidateQueries(['aboutus']),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAboutUs,
    onSuccess: () => queryClient.invalidateQueries(['aboutus']),
  });

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (id) => {
    const item = aboutData.find(d => d._id === id);
    setSelectedItem(item);
    setIsFormModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleRowClick = (id) => {
    const item = aboutData.find(d => d._id === id);
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  const handleSave = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.image) formData.append('image', data.image);

    if (data._id) {
      await updateMutation.mutateAsync({ id: data._id, formData });
    } else {
      await createMutation.mutateAsync(formData);
    }

    setIsFormModalOpen(false);
    setSelectedItem(null);
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  const tableData = aboutData.map(item => {
  const shortDescription =
    item.description?.length > 25
      ? item.description.slice(0, 25) + "..."
      : item.description;

  return {
    _id: item._id,
    image: `${import.meta.env.VITE_BACK_URL}/${item.image}`,
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

        {/* Table Card */}
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
