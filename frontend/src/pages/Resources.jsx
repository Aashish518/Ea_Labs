import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Filter, Download, Share2, BookOpen, Video, FileText, Briefcase, FileCode } from "lucide-react";

const allResources = [
  {
    id: 1,
    type: "Article",
    title: "AI Revolution in Healthcare",
    description:
      "EA Labs is leading the AI revolution in healthcare by developing intelligent systems for diagnostics, patient monitoring, and predictive medicine. Learn how AI is helping doctors make faster, more accurate decisions.",
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
      "Get an exclusive look at EA Labs' innovation hub — where ideas turn into breakthroughs. Our scientists and engineers collaborate to design tomorrow's technologies.",
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
      "A detailed look at EA Labs' ongoing commitment to sustainability — from eco-friendly lab operations to zero-waste packaging and renewable-energy integration.",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
    link: "#",
    date: "Nov 5, 2025",
    readTime: "25 min read",
  },
  {
    id: 4,
    type: "Case Study",
    title: "Smart Agriculture Pilot Project",
    description:
      "Discover how EA Labs' IoT-powered agriculture solutions helped farmers increase yield and reduce water use by 30% in just one season.",
    image:
      "https://images.unsplash.com/photo-1526378722414-3a29f3c4a4be?auto=format&fit=crop&w=1200&q=80",
    link: "#",
    date: "Oct 30, 2025",
    readTime: "8 min read",
  },
  {
    id: 5,
    type: "Whitepaper",
    title: "The Future of Quantum Computing",
    description:
      "Our researchers explore how quantum processors will transform computation in fields from chemistry to AI. A must-read for tech enthusiasts.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    link: "#",
    date: "Oct 28, 2025",
    readTime: "15 min read",
  },
  {
    id: 6,
    type: "Article",
    title: "Nanotech in Everyday Life",
    description:
      "Explore the world of nanotechnology and how EA Labs brings molecular-level engineering into consumer applications and advanced materials.",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
    link: "#",
    date: "Oct 25, 2025",
    readTime: "6 min read",
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
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-4 px-4 py-2 bg-gray-800 rounded-full text-sm font-semibold"
            >
              Knowledge Hub
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              EA Labs Resource Center
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed px-4">
              Explore cutting-edge insights, breakthrough innovations, and comprehensive reports from the EA Labs team.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto mb-8 px-4"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 sm:py-4 rounded-lg text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-500 border border-gray-300"
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
            </motion.div>

            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="px-4"
            >
              <div className="flex items-center justify-center gap-2 mb-4 lg:hidden">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-sm font-semibold hover:bg-gray-700 transition"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>
              
              <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
                {categories.map((cat, idx) => (
                  <motion.button
                    key={cat}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + idx * 0.05 }}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base rounded-lg border transition-all duration-300 font-semibold ${
                      activeCategory === cat
                        ? "bg-white text-gray-900 border-white shadow-lg"
                        : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Results Count */}
      <div className="container mx-auto px-4 sm:px-6 pt-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 text-sm sm:text-base"
        >
          Showing <span className="font-semibold text-gray-900">{filtered.length}</span> {filtered.length === 1 ? 'resource' : 'resources'}
        </motion.p>
      </div>

      {/* Resource Grid */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 sm:py-20"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600 text-sm sm:text-base">Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filtered.map((res, i) => {
                const Icon = typeIcons[res.type];
                return (
                  <motion.div
                    key={res.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-100">
                      <img
                        src={res.image}
                        alt={res.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      
                      {/* Type badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-md border border-gray-200">
                        {Icon && <Icon className="w-4 h-4 text-gray-700" />}
                        <span className="text-xs font-semibold text-gray-700 uppercase">
                          {res.type}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition">
                          <Share2 className="w-4 h-4 text-gray-700" />
                        </button>
                        <button className="p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition">
                          <Download className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 flex flex-col h-72 sm:h-80">
                      <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-500 mb-3">
                        <span>{res.date}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{res.readTime}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-3 line-clamp-2">
                        {res.title}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3 mb-4 flex-grow">
                        {res.description}
                      </p>

                      <a
                        href={res.link}
                        className="inline-flex items-center gap-2 text-gray-900 font-semibold hover:gap-3 transition-all group/link text-sm sm:text-base"
                      >
                        Read More
                        <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Newsletter CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900 text-white py-12 sm:py-16 px-4 sm:px-6 mt-12 sm:mt-16"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-4 px-4 py-2 bg-gray-800 rounded-lg text-xs sm:text-sm font-semibold"
          >
            Stay Updated
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Stay Ahead with EA Labs Insights
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 px-4">
            Subscribe to receive research updates, product launches, and innovation stories delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 sm:px-6 py-3 sm:py-4 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-600 border border-gray-700"
            />
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base whitespace-nowrap">
              Subscribe Now
            </button>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 mt-4 px-4">
            Join 10,000+ innovators receiving our weekly newsletter
          </p>
        </div>
      </motion.div>
    </section>
  );
}