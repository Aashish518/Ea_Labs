import { motion } from "framer-motion";
import Icon from "../../Icon";

// Features Component
const Features = () => (
  <section className="bg-white mb-10">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
      <motion.div
        className="bg-red-600 text-white rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center py-6 px-8"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Feature 1 */}
        <motion.div
          className="flex-1 flex items-center justify-center md:justify-start space-x-4 p-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Icon
            path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            className="w-10 h-10"
          />
          <span className="font-semibold text-[22px]">Rigorous Quality Checks</span>
        </motion.div>

        {/* Divider */}
        <div className="hidden md:block w-px h-12 bg-red-400"></div>

        {/* Feature 2 */}
        <motion.div
          className="flex-1 flex items-center justify-center space-x-4 p-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Icon
            path="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            className="w-10 h-10"
          />
          <span className="font-semibold text-[22px]">Same-Day Reporting</span>
        </motion.div>

        {/* Divider */}
        <div className="hidden md:block w-px h-12 bg-red-400"></div>

        {/* Feature 3 */}
        <motion.div
          className="flex-1 flex items-center justify-center md:justify-end space-x-4 p-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Icon
            path="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            className="w-10 h-10"
          />
          <span className="font-semibold text-[22px]">
            Convenient Home Collection
          </span>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default Features;
