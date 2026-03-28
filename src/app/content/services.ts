export type ServiceContent = {
  slug: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
  bullets: string[];
  highlight: string;
};

export const servicePages: ServiceContent[] = [
  {
    slug: "clinical-consulting",
    navLabel: "Clinical Consulting",
    eyebrow: "Flagship Service",
    title: "Clinical Consulting - Turnkey Program Development",
    subtitle: "From Idea to Fully Operational Clinic",
    intro:
      "We offer industry-leading consulting services designed to launch and scale behavioral health programs fast and correctly. Free consultation available: 2 hours - $250 value.",
    bullets: [
      "Full IOP / PHP / BHRF startup",
      "Licensing and compliance guidance",
      "Staffing for clinical and administrative roles",
      "EMR and billing system setup",
      "Credentialing with insurance",
      "Policy and procedure development",
      "Program structure and clinical models",
      "Licensed clinician recruitment teams that perform assessments and ensure proper level-of-care placement",
      "Immediate client pipeline development to bring clients to your door",
    ],
    highlight:
      "We do not just plan. We build operational clinics and help activate census from the start.",
  },
  {
    slug: "staffing-client-recruitment",
    navLabel: "Staffing & Recruitment",
    eyebrow: "Page 2",
    title: "Elite Staffing & Client Acquisition",
    subtitle: "We Staff Every Position - Guaranteed",
    intro:
      "We provide complete workforce solutions and a built-in client recruitment engine so behavioral health organizations can move faster from setup to admissions and revenue.",
    bullets: [
      "Licensed Therapists",
      "Clinical Supervisors",
      "Medical Providers",
      "Behavioral Health Technicians",
      "Case Managers",
      "Administrative and Billing Staff",
      "Clinical assessments",
      "Qualified client identification",
      "Level-of-care matching",
    ],
    highlight:
      "Immediate census growth and faster revenue generation through coordinated staffing and client acquisition.",
  },
  {
    slug: "housing-recovery-programs",
    navLabel: "Housing & Recovery",
    eyebrow: "Page 3",
    title: "Housing Solutions & Recovery Living",
    subtitle: "Structured environments built for stability and retention",
    intro:
      "We provide access to safe, structured housing environments through partnerships with nonprofit organizations that support behavioral health and recovery populations.",
    bullets: [
      "10 beds open now",
      "Mental health and substance use recovery support",
      "BHRF",
      "Sober Living",
      "Shared Living",
      "Integrated housing, clinical, and case management support",
    ],
    highlight:
      "Housing plus clinical services plus case management creates higher retention and better outcomes.",
  },
  {
    slug: "court-specialty-programs",
    navLabel: "Court & Specialty",
    eyebrow: "Page 4",
    title: "Court-Approved Programs & Specialty Groups",
    subtitle: "Outcome-driven services recognized by courts and communities",
    intro:
      "We provide high-quality, court-recognized services and specialty groups designed for real-world challenges, accountability, and measurable progress.",
    bullets: [
      "Anger Management",
      "Domestic Violence",
      "DUI Education",
      "Drug Court Programs",
      "Patriarch Support Groups for fathers seeking parental rights and involvement",
      "Executive Depression Groups for high-performing professionals under pressure",
      "Diverse staff including educators, ministers, and former professional athletes",
    ],
    highlight:
      "Clients choose us for real-world experience, diverse leadership, and results-driven programming.",
  },
  {
    slug: "family-services-supervised-visitation",
    navLabel: "Family Services",
    eyebrow: "Page 5",
    title: "Family Support & Supervised Visitation",
    subtitle: "Structured support for families, courts, and reunification efforts",
    intro:
      "We offer compassionate, structured services for families navigating complex situations involving court oversight, custody concerns, and reunification planning.",
    bullets: [
      "Supervised visitation on site and off site",
      "Parent care and aid training",
      "Family reintegration support",
      "Support for court-involved families",
      "Support for custody cases",
      "Support for reunification processes",
    ],
    highlight:
      "These services are built to support families with professionalism, clarity, and care during difficult transitions.",
  },
  {
    slug: "advanced-interventions",
    navLabel: "Advanced Interventions",
    eyebrow: "Page 6",
    title: "Advanced Clinical Interventions",
    subtitle: "Innovation plus science for better outcomes",
    intro:
      "We integrate cutting-edge treatment approaches with clinical expertise to improve patient outcomes and strengthen treatment effectiveness.",
    bullets: [
      "TMS Therapy (Transcranial Magnetic Stimulation)",
      "Peptide-based interventions",
      "Plasma treatments for wellness and recovery",
      "Psychological testing and evaluations",
    ],
    highlight:
      "Innovation and science are used intentionally to support stronger outcomes and more effective treatment plans.",
  },
  {
    slug: "industrial-psychology-business-growth",
    navLabel: "Business Growth",
    eyebrow: "Page 7",
    title: "Industrial Psychology & Business Growth",
    subtitle: "Operational excellence and revenue growth",
    intro:
      "We help existing organizations identify operational inefficiencies, improve team performance, and increase revenue streams through focused consulting and business development.",
    bullets: [
      "Operational inefficiency analysis",
      "Staff performance and structure improvement",
      "Revenue growth strategies",
      "Proven ability to help open 5 to 7 clinics",
      "Expansion across Arizona, Texas, Georgia, and soon Nevada",
    ],
    highlight:
      "We support expansion with practical systems, stronger operations, and scalable business strategy.",
  },
];

export function getServiceBySlug(slug: string | undefined) {
  return servicePages.find((service) => service.slug === slug);
}
