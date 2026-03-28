export function ContactCta() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-to-r from-[#1E3A5F] to-[#6BAF92] p-8 text-white shadow-[0_20px_60px_rgba(30,58,95,0.18)] md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/65">Ready To Launch Or Scale Your Program?</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <a
            href="tel:4805314655"
            className="rounded-2xl bg-white/10 px-5 py-4 text-lg font-semibold text-white transition-colors hover:bg-white/14"
          >
            Call Now: 480-531-4655
          </a>
          <div className="rounded-2xl bg-white/10 px-5 py-4 text-lg font-semibold text-white">
            Phoenix • Chandler • San Tan Valley • Goodyear
          </div>
        </div>
        <p className="mt-8 text-xl font-semibold text-white/92">LifeResource4You LLC</p>
        <p className="mt-2 text-lg text-white/88">We don&apos;t just build programs — we build success.</p>
      </div>
    </section>
  );
}
