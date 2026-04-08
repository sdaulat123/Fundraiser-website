import { motion } from "motion/react";
import { ArrowRight, CalendarClock, GraduationCap, HeartHandshake, House, Phone } from "lucide-react";
import { ContactCta } from "../components/ContactCta";

const featuredServices = [
  {
    title: "Supervised Visitation",
    price: "$70/hour",
    details: [
      "2-hour minimum",
      "Visits conducted in office or in the community",
      "Clinical support available when appropriate",
    ],
  },
  {
    title: "Initial Assessment",
    price: "$150/person",
    details: [
      "90-minute intake assessment",
      "Helps determine level of care, service fit, and next steps",
      "Required before placement or shared living consideration",
    ],
  },
  {
    title: "Wraparound Services For At-Risk Teens",
    price: "$75/hour",
    details: [
      "Up to 4 visits per week",
      "Private pay accepted",
      "Insurance accepted when eligible, coverage may vary",
    ],
  },
];

const featureCards = [
  {
    icon: CalendarClock,
    title: "Parenting Classes And Family Groups",
    description:
      "Parenting classes and family groups are offered three days a week using psychodynamic principles to support insight, structure, and healthier communication.",
  },
  {
    icon: HeartHandshake,
    title: "Mentorship And School Support",
    description:
      "Services can include home intervention, cognitive behavioral teaching, coaching, mentorship, school visits, and conduct-development support to help youth remain in school, at home, and out of the justice system.",
  },
  {
    icon: GraduationCap,
    title: "Youth Growth And Workforce Readiness",
    description:
      "Youth IOP coordination, professional development, teen employment placement, work-readiness skills, and attitude training are available for age-appropriate participants.",
  },
  {
    icon: House,
    title: "Shared Living With Accountability",
    description:
      "Group home and shared living options are for clients who are ready for self-sustainability, active treatment participation, job placement support, and measurable progress toward sober living and graduation benchmarks.",
  },
];

const sharedLivingRequirements = [
  "IOP clinic recommendation required. We only recommend CARF-approved clinics.",
  "A $300 deposit is required to cover potential AWOL risk.",
  "Move-in requires one-half month's rent of $350. Standard rent is $700 per month, discussed at intake.",
  "Clients must complete an assessment, establish service needs, and decide which clinic they will attend before placement.",
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
            LifeResource4you
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="max-w-5xl text-4xl font-bold leading-tight md:text-6xl"
          >
            Real support, real structure, and real work for families, teens, and shared living placement.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-6 max-w-4xl text-lg leading-8 text-white/90 md:text-xl"
          >
            LifeResource4you offers supervised visitation, family-centered support, wraparound services for at-risk
            teens, and shared living pathways focused on accountability, treatment participation, and long-term
            self-sustainability.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mt-6 max-w-4xl text-base leading-8 text-white/78 md:text-lg"
          >
            Intake line: 480-531-4655
            <br />
            Services are available in office, at home, at school, and in community settings depending on need.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#service-menu"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F59E0B] px-7 py-4 font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
            >
              View Service Menu
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="tel:4805314655"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              Call Intake
            </a>
          </motion.div>
        </div>
      </section>

      <section id="service-menu" className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#1E3A5F]/10 bg-white p-8 shadow-[0_20px_60px_rgba(30,58,95,0.08)] md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">Service Menu</p>
            <h2 className="mt-4 text-3xl font-bold text-[#1E3A5F] md:text-4xl">
              Services offered with straightforward pricing and intake requirements.
            </h2>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-gray-700">
              Visits may be conducted in office or out in the community depending on the service. Clinical support is
              available when needed, and every case begins with an assessment to establish the right level of care.
            </p>
            <div className="mt-10 space-y-5">
              {featuredServices.map((service) => (
                <article
                  key={service.title}
                  className="rounded-[1.5rem] border border-[#1E3A5F]/10 bg-[#F9FAFB] p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-[#1E3A5F]">{service.title}</h3>
                      <div className="mt-4 space-y-2 text-base leading-7 text-gray-700">
                        {service.details.map((detail) => (
                          <p key={detail}>{detail}</p>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-[#1E3A5F] px-5 py-4 text-left text-white md:min-w-52 md:text-right">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Price</p>
                      <p className="mt-2 text-3xl font-bold">{service.price}</p>
                    </div>
                  </div>
                </article>
              ))}
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
              Wraparound Coverage
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[#1E3A5F] md:text-4xl">
              At-risk teen support is designed to intervene at home, in school, and in the community.
            </h2>
            <div className="mt-8 grid gap-4">
              <div className="rounded-2xl border border-[#1E3A5F]/10 bg-[#F9FAFB] px-5 py-4 text-gray-700">
                Home intervention, cognitive behavioral teaching, coaching, and mentorship
              </div>
              <div className="rounded-2xl border border-[#1E3A5F]/10 bg-[#F9FAFB] px-5 py-4 text-gray-700">
                Educational and conduct-development support to help keep youth in school, at home, and out of jail
              </div>
              <div className="rounded-2xl border border-[#1E3A5F]/10 bg-[#F9FAFB] px-5 py-4 text-gray-700">
                Visits to schools, juvenile detention centers, foster care settings, and group homes
              </div>
              <div className="rounded-2xl border border-[#1E3A5F]/10 bg-[#F9FAFB] px-5 py-4 text-gray-700">
                Youth IOP coordination, professional development, and teen employment placement when age-appropriate
              </div>
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
              Shared Living Intake
            </p>
            <p className="mt-5 text-lg leading-8 text-white/92">
              Group home shared living is private pay and intended for people who are ready to work toward sober,
              stable, self-sustaining living with treatment support in place.
            </p>
            <div className="mt-6 space-y-4">
              {sharedLivingRequirements.map((requirement) => (
                <div key={requirement} className="rounded-2xl bg-white/8 px-5 py-4 text-white/90">
                  {requirement}
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg leading-8 text-white/88">
              We house those who are ready for accountability, job placement support, skill development, treatment
              participation, and measurable progress toward self-sustainability.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-8 md:py-12">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#1E3A5F]/10 bg-[#FFF7ED] p-8 shadow-[0_20px_60px_rgba(30,58,95,0.08)] md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">Our Standard</p>
              <h2 className="mt-4 text-3xl font-bold text-[#1E3A5F] md:text-4xl">
                This is not a free ride and it is not a temporary hotel. It is real work.
              </h2>
              <p className="mt-5 text-lg leading-8 text-gray-700">
                Our motto is "Excuses are the bridges that lead to nothingness and many men travel there on with
                intention to go nowhere. Don&apos;t be one of them."
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-[#1E3A5F] p-3 text-white">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1E3A5F]/55">Phone Intake</p>
                  <a href="tel:4805314655" className="mt-2 block text-3xl font-bold text-[#1E3A5F]">
                    480-531-4655
                  </a>
                  <p className="mt-3 leading-7 text-gray-700">
                    Bed availability varies. Please call when you are ready to put in the work and begin the intake
                    process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
