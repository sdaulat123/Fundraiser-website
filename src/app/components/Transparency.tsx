import { motion } from "motion/react";
import { Shield, Home, Lock } from "lucide-react";

const allocations = [
  {
    icon: Shield,
    title: "Safety Upgrades",
    percentage: 40,
    description: "Fire safety systems, emergency equipment, and health standards",
  },
  {
    icon: Home,
    title: "Structural Improvements",
    percentage: 35,
    description: "Essential repairs, renovations, and maintenance",
  },
  {
    icon: Lock,
    title: "Security Systems",
    percentage: 25,
    description: "Modern security infrastructure and monitoring",
  },
];

export function Transparency() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A5F] mb-6">
            Where Your Support Goes
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            We believe in complete transparency. Here's how your donations are allocated to create lasting impact.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {allocations.map((allocation, index) => (
            <motion.div
              key={allocation.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-gradient-to-br from-[#F9FAFB] to-white rounded-2xl p-8 shadow-lg border border-[#6BAF92]/20"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-[#1E3A5F] to-[#6BAF92] w-16 h-16 rounded-xl flex items-center justify-center">
                    <allocation.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="text-2xl font-bold text-[#1E3A5F]">
                      {allocation.title}
                    </h3>
                    <span className="text-3xl font-bold text-[#F59E0B]">
                      {allocation.percentage}%
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{allocation.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${allocation.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.15 + 0.3, ease: "easeOut" }}
                      className="bg-gradient-to-r from-[#F59E0B] to-[#6BAF92] h-full rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-gradient-to-br from-[#1E3A5F]/5 to-[#6BAF92]/5 rounded-2xl p-8 border border-[#6BAF92]/20">
            <p className="text-lg text-gray-700">
              <span className="font-bold text-[#1E3A5F]">100% of your donation</span> goes directly to improving LifeResource4you and supporting our residents' recovery journey.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
