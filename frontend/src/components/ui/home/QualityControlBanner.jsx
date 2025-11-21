import { motion } from "framer-motion";

export default function QualityControlBanner() {
  return (
    <motion.div
      className="bg-[linear-gradient(to_right,#86efac_70%,white_100%)] py-11 mb-6 sm:mx-0"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <h2 className="sm:text-3xl text-[25px] md:text-4xl font-extrabold sm:text-center px-5">
        <span className="text-red-600">3-Level Quality Control</span>
        <span className="text-indigo-900"> on Every Batch.</span>
      </h2>
    </motion.div>
  );
}
