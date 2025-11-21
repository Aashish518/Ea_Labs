import { motion } from "framer-motion";
import Image from "../common/Image";
import icmr from "../../../assets/img/ICMR.png";
import iso from "../../../assets/img/ISO.png";
import nabl from "../../../assets/img/NABL.png";

// Certifications Component
const Certifications = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-5">
      {/* ✅ Text fade-up on scroll */}
      <motion.p
        className="text-[18px] text-gray-600 max-w-4xl mx-auto mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        At EA Labs, an ISO, NABL & ICMR certified diagnostics center, we combine
        cutting-edge analyzers, globally validated assays, and rigorous quality
        controls to deliver clean, actionable results.
      </motion.p>

      {/* ✅ Logos fade-up & stagger animation */}
      <motion.div
        className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-16 mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2, duration: 1 },
          },
        }}
      >
        {[iso, icmr, nabl].map((img, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Image
              src={img}
              alt={
                i === 0
                  ? "ISO Certified"
                  : i === 1
                  ? "ICMR Certified"
                  : "NABL Certified"
              }
              className="h-16 sm:h-20 md:h-20 w-auto"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Certifications;
