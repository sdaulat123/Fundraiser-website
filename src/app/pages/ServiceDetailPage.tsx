import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router";
import { ContactCta } from "../components/ContactCta";
import { getServiceBySlug } from "../content/services";

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E3A5F] via-[#24507D] to-[#6BAF92] px-6 py-24 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[-5%] top-10 h-56 w-56 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F59E0B] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <Link
            to="/services"
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/15"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-white/70"
          >
            {service.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-5xl text-4xl font-bold leading-tight md:text-6xl"
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-4xl text-lg text-white/88 md:text-xl"
          >
            {service.subtitle}
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
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">Overview</p>
            <p className="mt-5 text-lg leading-8 text-gray-700">{service.intro}</p>
            <div className="mt-8 grid gap-4">
              {service.bullets.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-[#1E3A5F]/10 bg-[#F9FAFB] px-5 py-4 text-gray-700"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#6BAF92]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="rounded-[2rem] bg-[#1E3A5F] p-8 text-white shadow-[0_20px_60px_rgba(30,58,95,0.18)] md:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/60">Why It Matters</p>
            <p className="mt-5 text-lg leading-8 text-white/88">{service.highlight}</p>
            <div className="mt-10 rounded-2xl bg-white/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Contact</p>
              <p className="mt-4 text-lg font-semibold text-white">480-531-4655</p>
              <p className="mt-2 text-white/80">6642 S 16th St, Phoenix, AZ 85042</p>
              <p className="mt-4 text-white/80">Additional Offices: Chandler • San Tan Valley • Goodyear</p>
            </div>
          </motion.aside>
        </div>
      </section>

      <ContactCta />
    </div>
  );
}
