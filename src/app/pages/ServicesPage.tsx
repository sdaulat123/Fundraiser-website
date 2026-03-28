import { motion } from "motion/react";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Link } from "react-router";
import { ContactCta } from "../components/ContactCta";
import { servicePages } from "../content/services";

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E3A5F] via-[#24507D] to-[#6BAF92] px-6 py-24 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[-5%] top-10 h-56 w-56 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F59E0B] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-white/70"
          >
            Services Offered
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-5xl text-4xl font-bold leading-tight md:text-6xl"
          >
            Behavioral health consulting, staffing, housing, family support, and growth strategy under one roof.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-4xl text-lg text-white/88 md:text-xl"
          >
            LifeResource4You LLC provides A-Z turnkey services that help organizations launch, operate, and scale with
            compliance, structure, and measurable results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white/90"
          >
            <BadgeCheck className="h-4 w-4" />
            Free initial consultation
            <ArrowRight className="h-4 w-4" />
            2 hours - $250 value
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {servicePages.map((service, index) => (
              <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="rounded-[2rem] border border-[#1E3A5F]/10 bg-white p-8 shadow-[0_18px_55px_rgba(30,58,95,0.08)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">{service.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-bold text-[#1E3A5F]">{service.title}</h2>
                <p className="mt-4 line-clamp-3 text-lg leading-8 text-gray-700">{service.intro}</p>
                <Link
                  to={`/services/${service.slug}`}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1E3A5F] px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
                >
                  Open Page
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </div>
  );
}
