import { motion } from "motion/react";
import { useState } from "react";
import { CheckCircle, Shield, Heart } from "lucide-react";

const presetAmounts = [25, 50, 100, 250];

export function Donation() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const cashAppHandles = ["$DrGeeee", "$DrHamilton4you"];

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
  };

  const handleCustomClick = () => {
    setIsCustom(true);
    setSelectedAmount(null);
  };

  const handleDonate = () => {
    const amount = isCustom ? customAmount : selectedAmount;
    alert(
      `Thank you for your pledge to donate $${amount}. Please send your donation via Cash App to ${cashAppHandles.join(" or ")}.`,
    );
  };

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
          <div className="mb-8">
            <label className="block text-[#1E3A5F] mb-4">
              Select Your Donation Amount
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handlePresetClick(amount)}
                  className={`py-4 rounded-xl transition-all duration-300 ${
                    selectedAmount === amount
                      ? "bg-[#F59E0B] text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <button
              onClick={handleCustomClick}
              className={`w-full py-4 rounded-xl transition-all duration-300 ${
                isCustom
                  ? "bg-[#F59E0B] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Custom Amount
            </button>
          </div>

          {isCustom && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-8"
            >
              <label className="block text-[#1E3A5F] mb-2">
                Enter Custom Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                  $
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#F59E0B] focus:outline-none transition-colors"
                />
              </div>
            </motion.div>
          )}

          <button
            onClick={handleDonate}
            disabled={!selectedAmount && (!isCustom || !customAmount)}
            className="w-full bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white py-5 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mb-6"
          >
            Donate ${isCustom ? customAmount || "0" : selectedAmount || "0"}
          </button>

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
