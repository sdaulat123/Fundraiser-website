import { motion } from "motion/react";
import { Building2, Sparkles, TrendingUp } from "lucide-react";

const storyPoints = [
  {
    icon: Building2,
    title: "Founded in 2016",
    description:
      "COO Dr. Gregory Hamilton founded LifeResource4You LLC in 2016 with a vision for building strong clinical infrastructure and practical systems that support long-term growth.",
  },
  {
    icon: Sparkles,
    title: "Strength Through the Pandemic",
    description:
      "He orchestrated the company’s survival during the pandemic through disciplined leadership, operational focus, and a commitment to emerging stronger on the other side.",
  },
  {
    icon: TrendingUp,
    title: "Bigger and Stronger",
    description:
      "That resilience positioned LifeResource4You LLC to grow with confidence, expand services, and continue delivering results-driven support across multiple states.",
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#16314F] via-[#1E3A5F] to-[#6BAF92] px-6 py-24 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[-4%] top-8 h-60 w-60 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-[-4%] h-72 w-72 rounded-full bg-[#F59E0B] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-white/70"
          >
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-5xl text-4xl font-bold leading-tight md:text-6xl"
          >
            LifeResource4You LLC combines clinical expertise, operational execution, and business development.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-3xl text-lg text-white/88 md:text-xl"
          >
            Building Clinics. Transforming Lives. Driving Results.
          </motion.p>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
            className="rounded-[2rem] bg-white p-8 shadow-[0_20px_60px_rgba(30,58,95,0.08)] md:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">Leadership</p>
            <h2 className="mt-4 text-3xl font-bold text-[#1E3A5F] md:text-4xl">
              Dr. Gregory Hamilton led the company through challenge and into growth.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              COO Dr. Gregory Hamilton founded LifeResource4You LLC in 2016 and has played a central role in guiding
              the company’s development. With a focus on behavioral health operations, program structure, and service
              delivery, he built the organization on practical execution and long-term vision.
            </p>
            <p className="mt-5 text-lg leading-8 text-gray-700">
              During the pandemic, he orchestrated the company’s survival and helped position it to emerge bigger and
              stronger. Today, that same leadership continues to shape an organization dedicated to building clinics,
              supporting people, and driving measurable outcomes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="space-y-6"
          >
            {storyPoints.map((point, index) => (
              <motion.article
                key={point.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: 0.08 * index }}
                className="rounded-3xl border border-[#1E3A5F]/10 bg-white p-7 shadow-[0_16px_45px_rgba(30,58,95,0.08)]"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-[#1E3A5F] p-4 text-white">
                  <point.icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#1E3A5F]">{point.title}</h3>
                <p className="mt-3 leading-7 text-gray-600">{point.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
