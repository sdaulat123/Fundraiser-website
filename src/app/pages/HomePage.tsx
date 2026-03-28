import { motion } from "motion/react";
import { ArrowRight, BriefcaseBusiness, Building2, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router";
import { ContactCta } from "../components/ContactCta";

const turnkeyPrograms = [
  "Intensive Outpatient Programs (IOP)",
  "Partial Hospitalization Programs (PHP)",
  "Behavioral Health Residential Facilities (BHRF)",
  "Sober Living & Shared Living Environments",
];

const coreServices = [
  "Full staffing solutions",
  "Client recruitment and intake development",
  "Licensing and compliance guidance",
  "Revenue growth and operational strategy",
];

const cashAppHandles = ["$DrGeeee", "$DrHamilton4you"];

const featureCards = [
  {
    icon: Building2,
    title: "A-Z Turnkey Development",
    description:
      "From concept through launch, LifeResource4You LLC builds behavioral health programs that are structured, compliant, and ready to operate.",
  },
  {
    icon: Users,
    title: "Staffing and Census Growth",
    description:
      "We provide staffing, recruitment, intake systems, and client pipeline support designed to accelerate admissions and stabilize growth.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance and Operations",
    description:
      "Our team helps organizations align clinical programming, licensing, billing, and operations for sustainable performance.",
  },
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#183653] via-[#1E3A5F] to-[#6BAF92] px-6 py-24 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[-4%] top-10 h-64 w-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-4%] h-80 w-80 rounded-full bg-[#F59E0B] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-white/70"
          >
            LifeResource4You LLC
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="max-w-5xl text-4xl font-bold leading-tight md:text-6xl"
          >
            Building Clinics. Transforming Lives. Driving Results.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-6 max-w-4xl text-lg leading-8 text-white/90 md:text-xl"
          >
            LifeResource4You LLC is a full-service behavioral health consulting and operations company specializing in
            building, staffing, and scaling clinical programs from concept to full operation.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mt-6 max-w-4xl text-base leading-8 text-white/78 md:text-lg"
          >
            Headquarters: 6642 S 16th St, Phoenix, AZ 85042
            <br />
            Additional Offices: Chandler • San Tan Valley • Goodyear
            <br />
            Phone: 480-531-4655
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F59E0B] px-7 py-4 font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
            >
              View Services
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="tel:4805314655"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              Call 480-531-4655
            </a>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#1E3A5F]/10 bg-white p-8 shadow-[0_20px_60px_rgba(30,58,95,0.08)] md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">Fundraising Support</p>
            <h2 className="mt-4 text-3xl font-bold text-[#1E3A5F] md:text-4xl">
              Support the mission behind LifeResource4You LLC
            </h2>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-gray-700">
              In addition to our clinical and operational work, contributions help support recovery-focused outreach,
              service development, and the continued growth of programs that serve individuals and families in need.
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[1.5rem] bg-[#F9FAFB] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1E3A5F]/55">Donate via Cash App</p>
                <div className="mt-5 space-y-3">
                  {cashAppHandles.map((handle) => (
                    <div key={handle} className="rounded-2xl bg-white px-5 py-4 text-2xl font-bold text-[#1E3A5F] shadow-sm">
                      {handle}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-[#1E3A5F] p-6 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Why Give</p>
                <p className="mt-5 text-lg leading-8 text-white/88">
                  Your support helps strengthen the work, reach, and long-term impact of LifeResource4You LLC. Every
                  contribution supports a broader mission of building programs, supporting recovery, and creating real
                  opportunities for change.
                </p>
                <p className="mt-6 text-base font-semibold text-white/92">
                  Send donations directly to either Cash App handle listed here.
                </p>
              </div>
            </div>
          </motion.div>
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
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">
              Turnkey Programs
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[#1E3A5F] md:text-4xl">
              We provide A-Z turnkey services for behavioral health and recovery operations.
            </h2>
            <div className="mt-8 grid gap-4">
              {turnkeyPrograms.map((program) => (
                <div key={program} className="rounded-2xl border border-[#1E3A5F]/10 bg-[#F9FAFB] px-5 py-4 text-gray-700">
                  {program}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="rounded-[2rem] bg-[#1E3A5F] p-8 text-white shadow-[0_20px_60px_rgba(30,58,95,0.18)] md:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/60">
              Core Services
            </p>
            <p className="mt-5 text-lg leading-8 text-white/92">
              At LifeResource4You LLC, we don&apos;t just consult — we build, staff, and scale behavioral health
              organizations from the ground up.
            </p>
            <div className="mt-6 space-y-4">
              {coreServices.map((service) => (
                <div key={service} className="rounded-2xl bg-white/8 px-5 py-4 text-white/90">
                  {service}
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg leading-8 text-white/88">
              Led by Dr. Gregory Hamilton, our organization combines clinical expertise with business development to
              deliver measurable, sustainable results.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {featureCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-3xl border border-[#1E3A5F]/10 bg-white p-8 shadow-[0_16px_45px_rgba(30,58,95,0.08)]"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-[#1E3A5F] p-4 text-white">
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#1E3A5F]">{card.title}</h3>
                <p className="mt-3 leading-7 text-gray-600">{card.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </div>
  );
}
