// import { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { User, Users } from 'lucide-react';
// import StatCard from '../components/StartCard';
// import PackageCategory from '../components/ui/managetestpackage/PackageCategory';
// import TestPackageFormModal from '../components/ui/managetestpackage/PackageCategoryForm';
// import {
//     getAllTestPackages,
//     addTestItem,
//     updateTestItem,
//     deleteTestItem
// } from '../api/apis/packagecategory';

// const ManageTestPackages = () => {
//     const queryClient = useQueryClient();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingPackage, setEditingPackage] = useState(null);
//     const [activeCategory, setActiveCategory] = useState('');

//     const { data: testPackagesData, isLoading } = useQuery({
//         queryKey: ['testPackages'],
//         queryFn: getAllTestPackages,
//     });

//     console.log(testPackagesData,"ppp")

//     const menPackages = testPackagesData?.[0]?.men || [];
//     const womenPackages = testPackagesData?.[0]?.women || [];

//     const addMutation = useMutation({
//         mutationFn: addTestItem,
//         onSuccess: () => queryClient.invalidateQueries({ queryKey: ['testPackages'] }),
//     });

//     const updateMutation = useMutation({
//         mutationFn: ({ id, formData }) => updateTestItem(id, formData),
//         onSuccess: () => queryClient.invalidateQueries({ queryKey: ['testPackages'] }),
//     });

//     const deleteMutation = useMutation({
//         mutationFn: deleteTestItem,
//         onSuccess: () => queryClient.invalidateQueries({ queryKey: ['testPackages'] }),
//     });

//     const handleAddPackage = (category) => {
//         setActiveCategory(category);
//         setEditingPackage(null);
//         setIsModalOpen(true);
//     };

//     const handleEditPackage = (category, pkg) => {
//         setActiveCategory(category);
//         setEditingPackage(pkg);
//         setIsModalOpen(true);
//     };

//     const handleDeletePackage = (pkgId) => {
//         if (!window.confirm('Are you sure you want to delete this package?')) return;
//         deleteMutation.mutate(pkgId);
//     };

//     const handleSubmitPackage = (formData) => {
//         if (editingPackage) {
//             updateMutation.mutate({ id: editingPackage._id, formData });
//         } else {
//             formData.append('category', activeCategory.toLowerCase());
//             addMutation.mutate(formData);
//         }
//         setIsModalOpen(false);
//     };

//     if (isLoading) return <div>Loading...</div>;

//     return (
//         <div className="min-h-screen bg-gray-50 p-6">
//             <div className="max-w-7xl mx-auto">
//                 <div className="mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Test Packages</h1>
//                     <p className="text-gray-600">Manage test packages for men and women categories</p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                     <StatCard title="Men Packages" value={menPackages.length} icon={User} iconcolor="text-blue-500" />
//                     <StatCard title="Women Packages" value={womenPackages.length} icon={Users} iconcolor="text-pink-500" />
//                     <StatCard title="Total Packages" value={menPackages.length + womenPackages.length} icon={Users} iconcolor="text-green-500" />
//                 </div>

//                 <PackageCategory
//                     heading="Men Packages"
//                     categories={menPackages}
//                     tableheader={['Name', 'Image', 'Age Range']}
//                     onAddClick={() => handleAddPackage('Men')}
//                     onEditCategory={(pkg) => handleEditPackage('Men', pkg)}
//                     handleDeleteCategory={handleDeletePackage}
//                 />

//                 <PackageCategory
//                     heading="Women Packages"
//                     categories={womenPackages}
//                     tableheader={['Name', 'Image', 'Age Range']}
//                     onAddClick={() => handleAddPackage('Women')}
//                     onEditCategory={(pkg) => handleEditPackage('Women', pkg)}
//                     handleDeleteCategory={handleDeletePackage}
//                 />

//                 <TestPackageFormModal
//                     isOpen={isModalOpen}
//                     onClose={() => setIsModalOpen(false)}
//                     editData={editingPackage}
//                     onSubmit={handleSubmitPackage}
//                 />
//             </div>
//         </div>
//     );
// };

// export default ManageTestPackages;


import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Package, PlusCircle } from 'lucide-react';
import StatCard from '../components/StartCard';
import PackageCategory from '../components/ui/managetestpackage/PackageCategory';
import TestPackageFormModal from '../components/ui/managetestpackage/PackageCategoryForm';
import {
    getAllTestPackages,
    addTestPackage,
    updateTestPackage,
    deleteTestPackage
} from '../api/apis/packagecategory';
import Button from '../components/ui/common/Button';
import { getTests } from '../api/apis/testsapi';

const ManageTestPackages = () => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState(null);

    // ✅ Fetch all test packages
    const { data: testPackagesData, isLoading } = useQuery({
        queryKey: ['testPackages'],
        queryFn: getAllTestPackages,
    });

    const { data: tests = [] } = useQuery({
            queryKey: ["tests"],
            queryFn: getTests,
        });

    const testPackages = testPackagesData || [];
    console.log(testPackages,"nnnn")

    // ✅ Mutations
    const addMutation = useMutation({
        mutationFn: addTestPackage,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['testPackages'] }),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, formData }) => updateTestPackage(id, formData),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['testPackages'] }),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTestPackage,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['testPackages'] }),
    });

    // ✅ Handlers
    const handleAddPackage = () => {
        setEditingPackage(null);
        setIsModalOpen(true);
    };

    const handleEditPackage = (pkg) => {
        setEditingPackage(pkg);
        setIsModalOpen(true);
    };

    const handleDeletePackage = (pkgId) => {
        if (!window.confirm('Are you sure you want to delete this package?')) return;
        deleteMutation.mutate(pkgId);
    };

    const handleSubmitPackage = (formData) => {
        if (editingPackage) {
            // Edit existing package
            updateMutation.mutate({ id: editingPackage._id, formData });
        } else {
            // Add new package
            addMutation.mutate(formData);
        }
        setIsModalOpen(false);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Test Packages</h1>
                        <p className="text-gray-600">Add, edit, and manage all available test packages</p>
                    </div>
                    <Button
                        onClick={handleAddPackage}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Add Package
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <StatCard title="Total Packages" value={testPackages.length} icon={Package} iconcolor="text-green-500" />
                    <StatCard title="Enabled Packages" value={testPackages.filter(p => p.enable).length} icon={Package} iconcolor="text-blue-500" />
                    <StatCard title="Disabled Packages" value={testPackages.filter(p => !p.enable).length} icon={Package} iconcolor="text-red-500" />
                </div>

                {/* Packages Table */}
                <PackageCategory
                    heading="All Test Packages"
                    categories={testPackages}
                    tableheader={['Name', 'Image', 'Price', 'Enable', 'Tests']}
                    onAddClick={handleAddPackage}
                    onEditCategory={handleEditPackage}
                    handleDeleteCategory={handleDeletePackage}
                />

                {/* Modal */}
                <TestPackageFormModal
                    testsData={tests}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    editData={editingPackage}
                    onSubmit={handleSubmitPackage}
                />
            </div>
        </div>
    );
};

export default ManageTestPackages;
