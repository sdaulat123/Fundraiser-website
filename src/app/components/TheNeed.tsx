import { motion } from "motion/react";
import { Shield, Wrench, Lock } from "lucide-react";

const needs = [
  {
    icon: Shield,
    title: "Safety Improvements",
    description: "Critical updates to ensure the well-being of all residents, including fire safety systems, emergency equipment, and secure entry points.",
  },
  {
    icon: Wrench,
    title: "Home Modifications",
    description: "Essential repairs and renovations to maintain a comfortable, functional living space that supports recovery and dignity.",
  },
  {
    icon: Lock,
    title: "Security Enhancements",
    description: "Modern security systems and measures to provide peace of mind and a protected environment for residents and staff.",
  },
];

export function TheNeed() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#F9FAFB] to-[#6BAF92]/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A5F] mb-6">
            Why We Need Your Support
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Your contribution directly impacts the safety and quality of life for our residents
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {needs.map((need, index) => (
            <motion.div
              key={need.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full border border-[#6BAF92]/20">
                <div className="bg-gradient-to-br from-[#1E3A5F] to-[#6BAF92] w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <need.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1E3A5F] mb-4">
                  {need.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {need.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
