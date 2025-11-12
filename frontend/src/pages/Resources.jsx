import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Filter, Download, Share2, BookOpen, Video, FileText, Briefcase, FileCode } from "lucide-react";

const allResources = [
  {
    id: 1,
    type: "Article",
    title: "AI Revolution in Healthcare",
    description:
      "EA Labs is leading the AI revolution in healthcare by developing intelligent systems for diagnostics, patient monitoring, and predictive medicine.",
    image:
      "https://images.unsplash.com/photo-1581091215367-59ab6b6b42c3?auto=format&fit=crop&w=1200&q=80",
    link: "#",
    date: "Nov 10, 2025",
    readTime: "5 min read",
  },
  {
    id: 2,
    type: "Video",
    title: "Inside the Innovation Hub",
    description:
      "Get an exclusive look at EA Labs' innovation hub — where ideas turn into breakthroughs.",
    image:
      "https://images.unsplash.com/photo-1581093588401-22d56b349898?auto=format&fit=crop&w=1200&q=80",
    link: "#",
    date: "Nov 8, 2025",
    readTime: "12 min watch",
  },
  {
    id: 3,
    type: "Report",
    title: "2025 Sustainability Report",
    description:
      "A detailed look at EA Labs' commitment to sustainability — from eco-friendly lab operations to renewable-energy integration.",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
    link: "#",
    date: "Nov 5, 2025",
    readTime: "25 min read",
  },
];

const categories = ["All", "Articles", "Videos", "Reports", "Case Studies", "Whitepapers"];

const typeIcons = {
  Article: BookOpen,
  Video: Video,
  Report: FileText,
  "Case Study": Briefcase,
  Whitepaper: FileCode,
};

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = allResources.filter((r) => {
    const matchesCategory =
      activeCategory === "All" ||
      r.type.toLowerCase() === activeCategory.toLowerCase().slice(0, -1);
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-16 px-4">
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
            Explore cutting-edge insights, reports, and innovations from the EA Labs team.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 rounded-lg text-gray-900 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-4 lg:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 transition"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            <div className={`flex flex-wrap justify-center gap-3 ${showFilters ? "block" : "hidden lg:flex"}`}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 text-sm rounded-full border transition font-semibold ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Results Count */}
      <div className="container mx-auto px-4 sm:px-6 pt-4">
        <p className="text-gray-700 text-base">
          Showing <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "resource" : "resources"}
        </p>
      </div>

      {/* Resource Grid */}
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-10 h-10 mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((res, i) => {
                const Icon = typeIcons[res.type];
                return (
                  <motion.div
                    key={res.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                      <img
                        src={res.image}
                        alt={res.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Type Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-md border border-gray-200">
                        {Icon && <Icon className="w-4 h-4 text-blue-600" />}
                        <span className="text-xs font-semibold text-gray-700 uppercase">{res.type}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col h-72">
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        <span>{res.date}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{res.readTime}</span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{res.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                        {res.description}
                      </p>

                      <a
                        href={res.link}
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                      >
                        Read More →
                      </a>
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
