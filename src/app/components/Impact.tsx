import { motion } from "motion/react";
import { Users, Target, Quote } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const stats = [
  {
    icon: Users,
    number: "7",
    label: "Residents Currently Supported",
  },
  {
    icon: Target,
    number: "100%",
    label: "Focused on Recovery & Stability",
  },
];

export function Impact() {
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
            Your Impact
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Every dollar makes a real difference in the lives of our residents
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-gradient-to-br from-[#1E3A5F] to-[#6BAF92] rounded-2xl p-10 text-center shadow-xl"
            >
              <div className="flex justify-center mb-4">
                <stat.icon className="w-12 h-12 text-white" />
              </div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-lg text-white/90">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1721018671018-4c7d3c759c80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzdXBwb3J0JTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzc0NjI1OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Community support"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative">
              <Quote className="w-12 h-12 text-[#6BAF92] mb-6" />
              <blockquote className="text-2xl text-gray-700 leading-relaxed mb-6 italic">
                "The Chandler House gave me the stability I needed to focus on my recovery. Having a safe place to call home made all the difference in my journey."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#6BAF92] rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-[#1E3A5F]">Former Resident</div>
                  <div className="text-gray-600">The Chandler House</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
