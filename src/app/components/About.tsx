import { motion } from "motion/react";
import { Home, Users, Heart } from "lucide-react";

const features = [
  {
    icon: Home,
    title: "Stability",
    description: "A safe, structured environment for lasting recovery",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building connections and support networks",
  },
  {
    icon: Heart,
    title: "Recovery",
    description: "Focused programs for sustainable growth",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A5F] mb-6">
            About The Chandler House
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Located on Monterey Street, The Chandler House is more than just a residence—it's a community dedicated to supporting 7 individuals on their journey of recovery. We provide a stable, safe environment focused on rebuilding lives and fostering lasting change through compassion and structured support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-[#1E3A5F]/5 to-[#6BAF92]/5 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full border border-[#1E3A5F]/10">
                <div className="bg-[#6BAF92] w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1E3A5F] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
