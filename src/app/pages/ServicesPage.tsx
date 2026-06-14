import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, BadgeCheck, CheckCircle2, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { ContactCta } from "../components/ContactCta";
import { servicePages } from "../content/services";

export function ServicesPage() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

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
            Resources Offered
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-5xl text-4xl font-bold leading-tight md:text-6xl"
          >
            Every resource we offer, one tap away.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-4xl text-lg text-white/88 md:text-xl"
          >
            LifeResource4You LLC provides A-Z turnkey services that help organizations launch, operate, and scale with
            compliance, structure, and measurable results. Tap any resource below to open the full details.
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
        <div className="mx-auto max-w-5xl">
          <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">
            Tap a resource to open it
          </p>

          <div className="space-y-4">
            {servicePages.map((service, index) => {
              const isOpen = openSlug === service.slug;
              const resourceNumber = String(index + 1).padStart(2, "0");

              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="overflow-hidden rounded-[1.75rem] border border-[#1E3A5F]/10 bg-white shadow-[0_18px_55px_rgba(30,58,95,0.08)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenSlug(isOpen ? null : service.slug)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-5 px-6 py-6 text-left transition-colors hover:bg-[#1E3A5F]/[0.03] md:px-8"
                  >
                    <span
                      className={[
                        "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-lg font-bold transition-colors",
                        isOpen ? "bg-[#F59E0B] text-white" : "bg-[#1E3A5F] text-white",
                      ].join(" ")}
                    >
                      {resourceNumber}
                    </span>
                    <span className="flex-1">
                      <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/45">
                        {service.eyebrow}
                      </span>
                      <span className="mt-1 block text-xl font-bold text-[#1E3A5F] md:text-2xl">{service.title}</span>
                    </span>
                    <ChevronDown
                      className={[
                        "h-6 w-6 flex-shrink-0 text-[#1E3A5F] transition-transform duration-300",
                        isOpen ? "rotate-180" : "",
                      ].join(" ")}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#1E3A5F]/10 px-6 py-7 md:px-8">
                          <p className="text-lg font-semibold text-[#1E3A5F]">{service.subtitle}</p>
                          <p className="mt-3 text-base leading-8 text-gray-700">{service.intro}</p>

                          <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            {service.bullets.map((item) => (
                              <div
                                key={item}
                                className="flex items-start gap-3 rounded-2xl border border-[#1E3A5F]/10 bg-[#F9FAFB] px-4 py-3 text-gray-700"
                              >
                                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#6BAF92]" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-6 rounded-2xl bg-[#1E3A5F] px-6 py-5 text-white">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                              Why It Matters
                            </p>
                            <p className="mt-2 leading-7 text-white/90">{service.highlight}</p>
                          </div>

                          <Link
                            to={`/services/${service.slug}`}
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F59E0B] px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
                          >
                            Open Full Page
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <ContactCta />
    </div>
  );
}
