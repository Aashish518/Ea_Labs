import React from "react";
import { motion } from "framer-motion";

const Stats = () => (
  <section className="bg-[#203270] py-20 w-full">
    <div className="container max-w-7xl mx-auto px-4">
      {/* Header */}
      <motion.div
        className="mb-10 text-left"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-2 text-white">
          EA Labs - Setting the Standard in Diagnostics.
        </h2>
        <p className="text-white max-w-2xl text-lg">
          Delivering excellence through accuracy, speed, and care because every
          result matters.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { number: "7,00,000+", label: "Patients Served", color: "from-teal-100 to-teal-200 text-teal-800" },
          { number: "16,000+", label: "Tests Processed Daily", color: "from-blue-100 to-blue-200 text-blue-800" },
          { number: "15+", label: "Cities Covered", color: "from-purple-100 to-purple-200 text-purple-800" },
          { number: "98.5%+", label: "On-Time Report Delivery", color: "from-pink-100 to-pink-200 text-pink-800" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`bg-gradient-to-r ${stat.color} p-6 rounded-xl flex flex-col items-start justify-center shadow-lg`}
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-3xl font-bold">{stat.number}</p>
            <p className="mt-2 text-sm font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
