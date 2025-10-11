import { useState } from 'react';
import { Trash2, Monitor, Smartphone, FileImage, Loader2, EyeOff, Eye } from 'lucide-react';
import Button from '../components/ui/common/Button';
import Card from '../components/layout/Card';
import ImageUpload from '../components/ui/common/ImageUpload';
import ImagePreviewCard from '../components/ui/sliderimages/ImagePreviewCard';
import ImagePreviewModal from '../components/ui/sliderimages/ImagePreviewModal';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getImages, uploadImages, deleteImage, deleteAllImage, updateVisiblityStatus } from '../api/apis/sliderimagesapi';
import AlertBox from '../components/ui/common/AlertBox';
import ConfirmBox from '../components/ui/common/ConfirmBox';
import StatCard from '../components/StartCard';

const SliderImageManagement = () => {
    const [activeTab, setActiveTab] = useState('mobile');
    const [previewImage, setPreviewImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const queryClient = useQueryClient();



    //Tan Stack
    const { data: slider = {}, isLoading } = useQuery({
        queryKey: ['sliderimages'],
        queryFn: getImages
    });

    const uploadMutation = useMutation({
        mutationFn: uploadImages,
        onSuccess: () => queryClient.invalidateQueries(['sliderimages']),
        onSettled: () => setIsUploading(false)
    });

    const deleteMutation = useMutation({
        mutationFn: deleteImage,
        onSuccess: () => queryClient.invalidateQueries(['sliderimages'])
    });

    const deleteAllMutation = useMutation({
        mutationFn: deleteAllImage,
        onSuccess: () => queryClient.invalidateQueries(['sliderimages'])
    });

    const updateVisibilityMutation = useMutation({
        mutationFn: updateVisiblityStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(['sliderimages']);
        },
        onError: (error) => {
            AlertBox({
                type: "error",
                message: error?.response?.data?.message || "Failed to update slider visibility.",
            });
        }
    });



    // Handler
    const handleUpload = async (files) => {
        if (!files.length) return;
        if (!validateFiles(files)) return;

        try {
            setIsUploading(true);
            const response = await uploadMutation.mutateAsync({ type: activeTab, files });

            AlertBox({
                type: "success",
                message: response?.message || `${files.length} file(s) uploaded successfully!`,
            });
        } catch (error) {
            const errorMsg = error?.response?.data?.message || "Failed to upload files. Please try again.";
            AlertBox({ type: "error", message: errorMsg });
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (image) => {
        try {
            const confirmed = await ConfirmBox({
                title: "Delete Media?",
                message: "Are you sure you want to delete this file?",
                confirmText: "Yes, delete it!",
                successTitle: "Deleted!",
                successMessage: "File deleted successfully!",
            });

            if (!confirmed) return;

            await deleteMutation.mutateAsync({
                id: slider[0]?._id,
                type: activeTab,
                path: image.url,
            });
        } catch (error) {
            AlertBox({
                type: "error",
                message: error?.response?.data?.message || "Failed to delete file.",
            });
        }
    };

    const handleDeleteAll = async () => {
        const confirmed = await ConfirmBox({
            title: "Delete All Files?",
            message: "Are you sure you want to delete all media? This action cannot be undone.",
            confirmText: "Yes, delete all!",
        });

        if (!confirmed) return;

        deleteAllMutation.mutate();
    };

    const handleToggleVisibility = async (mediaId) => {
        if (!mediaId) {
            AlertBox({ type: "error", message: "Invalid media ID" });
            return;
        }
        try {
            const response = await updateVisibilityMutation.mutateAsync(mediaId);
            AlertBox({
                type: "success",
                message: response?.message || `${files.length} file(s) uploaded successfully!`,
            });
        } catch (error) {
            AlertBox({
                type: "error",
                message: error?.response?.data?.message || "Failed to toggle visibility.",
            });
        }
    };







    const mobileImages = slider[0]?.mobileScreenMedia || [];
    const desktopImages = slider[0]?.desktopScreenMedia || [];
    const currentImages = activeTab === 'mobile' ? mobileImages : desktopImages;

    const validateFiles = (files) => {
        const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'webm', 'ogg'];

        for (const file of files) {
            const ext = file.name.split('.').pop().toLowerCase();
            if (!validExtensions.includes(ext)) {
                AlertBox({
                    type: "error",
                    message: `Invalid file type: ${file.name}. Only images and videos allowed.`,
                });
                return false;
            }
        }
        return true;
    };

    return (
        <div className="min-h-screen bg-white p-6 relative">
            {(isUploading || isLoading) && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
                    <span className="ml-3 text-blue-700 font-medium">Processing...</span>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 flex flex-col md:flex-row items-start md:justify-between gap-5">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Slider Media Management
                        </h1>
                        <p className="text-gray-600">
                            Manage your homepage slider media (images & videos)
                        </p>
                    </div>

                    <Button
                        className="flex px-4 gap-2 py-2 rounded-lg font-medium transition duration-200 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300"
                        onClick={handleDeleteAll}
                    >
                        <Trash2 className="w-5 h-5" />
                        Delete All
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <StatCard title="Mobile Media" value={mobileImages.length} icon={Smartphone} iconcolor="text-blue-500" />
                    <StatCard title="Desktop Media" value={desktopImages.length} icon={Monitor} iconcolor="text-purple-500" />
                    <StatCard title="Total Files" value={mobileImages.length + desktopImages.length} icon={FileImage} iconcolor="text-green-500" />
                </div>

                {/* Tabs */}
                <Card className="mb-6">
                    <div className="flex border-b border-gray-200">
                        <Button
                            onClick={() => setActiveTab('mobile')}
                            className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-4 font-medium transition-colors ${activeTab === 'mobile'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Smartphone className="w-5 h-5" />
                            Mobile ({mobileImages.length})
                        </Button>
                        <Button
                            onClick={() => setActiveTab('desktop')}
                            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${activeTab === 'desktop'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Monitor className="w-5 h-5" />
                            Desktop ({desktopImages.length})
                        </Button>
                    </div>

                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Upload {activeTab === 'mobile' ? 'Mobile' : 'Desktop'} Media
                        </h3>
                        <ImageUpload onUpload={handleUpload} />

                        <h3 className="text-lg font-semibold text-gray-900 my-4">
                            Current Files ({currentImages.length})
                        </h3>

                        {currentImages.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {currentImages.map((image, index) => (
                                    <ImagePreviewCard
                                        key={index}
                                        image={image}
                                        index={index}
                                        onDelete={() => handleDelete(image)}
                                        onView={() => setPreviewImage(image)}
                                        onToggleVisibility={() => handleToggleVisibility(image._id)}
                                        isNew={false}
                                    />
                                ))}


                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                <FileImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 font-medium mb-2">
                                    No media uploaded yet
                                </p>
                                <p className="text-sm text-gray-500">
                                    Upload your first {activeTab} file above
                                </p>
                            </div>
                        )}
                    </div>
                </Card>

                <ImagePreviewModal image={previewImage} onClose={() => setPreviewImage(null)} />
            </div>
        </div>
    );
};

export default SliderImageManagement;
