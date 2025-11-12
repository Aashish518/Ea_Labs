import React, { useState } from "react";
import { Plus, FileText, Video, Book } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import StatCard from "../components/StartCard";
import Card from "../components/layout/Card";
import Button from "../components/ui/common/Button";
import Table from "../components/Table";
import ResourceFormModal from "../components/ui/resource/ResourceFormModal";
import ResourceViewModal from "../components/ui/resource/ResourceViewModal";
import {
  getAllResources,
  createResource,
  updateResource,
  deleteResource,
} from "../api/apis/resource";

const ResourceAdmin = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch all resources
  const { data: resourceData = [], isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: getAllResources,
  });

  // ✅ Create resource
  const createMutation = useMutation({
    mutationFn: createResource,
    onSuccess: () => queryClient.invalidateQueries(["resources"]),
  });

  // ✅ Update resource
  const updateMutation = useMutation({
    mutationFn: ({ id, formData }) => updateResource(id, formData),
    onSuccess: () => queryClient.invalidateQueries(["resources"]),
  });

  // ✅ Delete resource
  const deleteMutation = useMutation({
    mutationFn: deleteResource,
    onSuccess: () => queryClient.invalidateQueries(["resources"]),
  });

  // ✅ State for modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // ✅ Handle edit
  const handleEdit = (id) => {
    const item = resourceData.find((d) => d._id === id);
    setSelectedItem(item);
    setIsFormModalOpen(true);
  };

  // ✅ Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      deleteMutation.mutate(id);
    }
  };

  // ✅ Handle view
  const handleRowClick = (id) => {
    const item = resourceData.find((d) => d._id === id);
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  // ✅ Handle create/update save
  const handleSave = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("isPublished", data.isPublished);

    if (data.file) formData.append("file", data.file);
    if (data.thumbnail) formData.append("thumbnail", data.thumbnail);

    if (data._id) {
      await updateMutation.mutateAsync({ id: data._id, formData });
    } else {
      await createMutation.mutateAsync(formData);
    }

    setIsFormModalOpen(false);
    setSelectedItem(null);
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  // ✅ Prepare table data
  const tableData = resourceData.map((item) => ({
    _id: item._id,
    image: item.thumbnail
      ? `${import.meta.env.VITE_BACK_URL}/${item.thumbnail}`
      : "/placeholder.png",
    title: item.title,
    description: item.type,
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Resource Management
          </h1>
          <p className="text-gray-600">
            Manage your articles, images, PDFs, and videos
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Resources"
            value={resourceData.length}
            icon={FileText}
            iconcolor="text-blue-600"
          />
          <StatCard
            title="Published"
            value={resourceData.filter((r) => r.isPublished).length}
            icon={Book}
            iconcolor="text-green-600"
          />
          <StatCard
            title="Videos"
            value={resourceData.filter((r) => r.type === "Video").length}
            icon={Video}
            iconcolor="text-red-600"
          />
        </div>

        {/* Table */}
        <Card>
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Resources</h2>
            <Button
              onClick={() => {
                setSelectedItem(null);
                setIsFormModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" /> Add Resource
            </Button>
          </div>

          <Table
            headers={["Thumbnail", "Title", "Type"]}
            data={tableData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRowClick={handleRowClick}
            emptyMessage="No resources available. Add your first one!"
          />
        </Card>

        {/* Form Modal */}
        {isFormModalOpen && (
          <ResourceFormModal
            isOpen={isFormModalOpen}
            onClose={() => setIsFormModalOpen(false)}
            onSubmit={handleSave}
            initialData={selectedItem}
          />
        )}

        {/* View Modal */}
        {isDetailModalOpen && selectedItem && (
          <ResourceViewModal
            item={selectedItem}
            onClose={() => setIsDetailModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ResourceAdmin;
