import { useState } from "react";
import { Heart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DonationButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="fixed bottom-6 left-6 z-[999] flex h-[40px] w-[40px] items-center justify-center rounded-xl bg-[#FF5555] text-white shadow-xl transition hover:scale-110 hover:shadow-2xl"
        aria-label="Doar"
      >
        <Heart size={17} fill="white" />
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="z-[1001] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 p-3 shadow-2xl backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  ❤️ Apoie o MChiodi Focus
                </h2>
                <button
                  onClick={closeModal}
                  className="rounded-full p-2 transition-colors hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="mb-4 text-neutral-300">
                Se você está gostando da ferramenta e ela te ajuda a ser mais
                produtivo, considere fazer uma contribuição. Isso me ajuda a
                manter o projeto e desenvolver novos recursos!
              </p>

              <div className="flex flex-col items-center justify-center">
                <div className="mb-4 rounded-xl bg-white p-4">
                  <img
                    src="https://mchiodi-focus.vercel.app/pixicon.png"
                    alt="QR Code LivePix"
                    className="h-48 w-48"
                  />
                </div>
                <p className="text-sm text-neutral-400">
                  Escaneie o QR code acima ou use o link abaixo:
                </p>
                <a
                  href="https://livepix.gg/mchiodi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 font-medium text-[#FF5555] hover:underline"
                >
                  livepix.gg/mchiodi
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
