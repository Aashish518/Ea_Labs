import { useEffect, useState } from "react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Filter,
  Download,
  BookOpen,
  Video,
  CheckCircle,
  Loader,
  Calendar,
  FileText,
} from "lucide-react";
import { getAllResources } from "../api/apis/resource";
import Button from "../components/ui/common/Button";
import Input from "../components/ui/common/Input";
import Image from "../components/ui/common/Image"

const categories = ["All", "Article", "Video", "Image"];

const typeIcons = {
  Article: BookOpen,
  Video: Video,
  Image: FileText,
};

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { data: resources = [], isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: getAllResources,
  });


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Loading resources...
      </div>
    );
  }


  // ✅ Filter logic
  const filtered = resources
    .filter((r) => r.isPublished) // ✅ Only show published items
    .filter((r) => {
      const matchesCategory =
        activeCategory === "All" ||
        r.type.toLowerCase() === activeCategory.toLowerCase();

      const matchesSearch =
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });


  // ✅ Handle view file in new tab
  const handleViewFile = (filePath) => {
    if (!filePath) return;
    const url = `${import.meta.env.VITE_BACK_URL}${filePath}`;
    window.open(url, "_blank");
  };



  const handleDownload = async (filePath, fileName) => {
    if (!filePath) return;

    setIsDownloading(true);

    try {
      const url = `${import.meta.env.VITE_BACK_URL}${filePath}`;

      // Fetch the file as a blob
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();

      // Create object URL from blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName || "downloaded-file";
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      // ✅ Close modal and show success
      setTimeout(() => {
        setSelectedResource(null);
        setIsDownloading(false);
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 3000);
      }, 500);
    } catch (error) {
      console.error("Download failed:", error);
      setIsDownloading(false);
      alert("Download failed. Please try again or check your connection.");
    }
  };

  return (
    <section className="bg-white min-h-screen relative">

      {/* ✅ Success Download Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed top-6 left-6 bg-green-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 shadow-lg z-50"
          >
            <CheckCircle className="w-5 h-5" />
            <span>File downloaded successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Modal Popup for Resource Details */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/85">

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-xl font-bold text-gray-900">Resource Details</h2>
                <Button
                  onClick={() => !isDownloading && setSelectedResource(null)}
                  disabled={isDownloading}
                  className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Thumbnail */}
                <div className="relative w-full h-72 rounded-xl overflow-hidden bg-gray-100 mb-6">
                  <Image
                    src={
                      selectedResource.thumbnail
                        ? `${import.meta.env.VITE_BACK_URL}${selectedResource.thumbnail}`
                        : "/placeholder.png"
                    }
                    alt={selectedResource.title}
                    className="w-full h-full"
                  />
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-md">
                    {typeIcons[selectedResource.type] && (
                      React.createElement(typeIcons[selectedResource.type], {
                        className: "w-4 h-4 text-blue-600"
                      })
                    )}
                    <span className="text-xs font-semibold text-gray-700 uppercase">
                      {selectedResource.type}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedResource.title}
                </h3>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(selectedResource.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>{selectedResource.type}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Description</h4>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedResource.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => handleDownload(selectedResource.fileUrl, selectedResource.title)}
                    disabled={isDownloading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDownloading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Download File
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={() => handleViewFile(selectedResource.fileUrl)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
                  >
                    <BookOpen className="w-5 h-5" />
                    View File
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="text-center pt-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
          >
            Knowledge Hub
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            EA Labs Resource Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Explore videos, articles, and images from the EA Labs knowledge base.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 rounded-lg text-gray-900 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {searchQuery && (
                <Button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="w-full mt-6">
            <div
              className="
      flex gap-3 
      overflow-x-auto 
      no-scrollbar
      py-3
      px-4
      justify-start
      sm:justify-center
    "
            >
              {categories.map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 text-sm whitespace-nowrap rounded-full border transition font-semibold ${activeCategory === cat
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50"
                    }`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

        </motion.div>
      </div>

      {/* Results Count */}
      <div className="container mx-auto px-4 sm:px-6 pt-4">
        <p className="text-gray-700 text-base">
          Showing{" "}
          <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "resource" : "resources"}
        </p>
      </div>

      {/* Resource Grid */}
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-10 h-10 mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                No resources found
              </h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filtered.map((res, i) => {
                const Icon = typeIcons[res.type];
                return (
                  <motion.div
                    key={res._id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    // Use a flex-col layout to ensure description and button are at the bottom
                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col relative"
                  >

                    {/* 1. Thumbnail - Now at the top, full width, with aspect ratio */}
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      <Image
                        src={

                          res.thumbnail

                            ? `${import.meta.env.VITE_BACK_URL}${res.thumbnail}`

                            : "/placeholder.png"

                        }
                        alt={res.title}
                        // object-cover ensures the image fills the container without distortion
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* 2. Type Badge - Absolute position in the corner for prominence */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full absolute top-4 right-4 z-10 shadow-sm">
                      {Icon && <Icon className="w-3 h-3" />}
                      {res.type}
                    </div>

                    {/* Content Wrapper */}
                    <div className="p-5 flex flex-col flex-grow">
                      {/* 3. Title */}
                      <h3 className="text-xl font-extrabold text-gray-900 line-clamp-2 mb-2">
                        {res.title}
                      </h3>

                      {/* 4. Meta Info - Lighter and clearer positioning */}
                      <div className="text-xs text-gray-400 mb-3">
                        Posted:{" "}
                        {new Date(res.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>

                      {/* 5. Description */}
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow">
                        {res.description}
                      </p>

                      {/* 6. Button - Clear call to action at the bottom */}
                      <Button
                        onClick={() => setSelectedResource(res)}
                        className="mt-4 inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
                      >
                        View Resource →
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}