import { motion } from "motion/react";
import { CheckCircle, Shield, Heart } from "lucide-react";

export function Donation() {
  const cashAppHandles = ["$DrGeeee", "$DrHamilton4you"];

  return (
    <section id="donation" className="py-20 md:py-28 bg-gradient-to-br from-[#1E3A5F] to-[#6BAF92] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Make a Difference Today
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Your generosity directly supports safety improvements, home modifications, and security enhancements
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="mb-6 rounded-2xl bg-[#F9FAFB] p-5 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1E3A5F]/70 mb-3">
              Donate via Cash App
            </p>
            <div className="space-y-2">
              {cashAppHandles.map((handle) => (
                <p key={handle} className="text-2xl font-bold text-[#1E3A5F]">
                  {handle}
                </p>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Send any amount directly to either Cash App handle above.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#6BAF92]" />
              <span className="text-sm text-gray-600">Secure Donation</span>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-[#6BAF92]" />
              <span className="text-sm text-gray-600">Direct Impact</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-[#6BAF92]" />
              <span className="text-sm text-gray-600">100% Transparent</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
