import { motion } from "framer-motion";
import { waLink } from "@/lib/site";

export default function FloatingWhatsapp() {
  return (
    <motion.a
      href={waLink()}
      target="_blank"
      rel="noopener"
      aria-label="Chat dengan tim SIAP via WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-[max(18px,env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1FAF55] text-white shadow-[0_12px_28px_-6px_rgba(31,175,85,.6)] sm:right-6"
    >
      <span aria-hidden className="absolute inset-0 animate-ping2 rounded-full bg-[#1FAF55]" />
      <svg aria-hidden width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="relative">
        <path d="M20.52 3.48A11.93 11.93 0 0012.06 0C5.46 0 .06 5.4.06 12a11.9 11.9 0 001.6 6L0 24l6.2-1.6a11.93 11.93 0 005.86 1.5c6.6 0 12-5.4 12-12a11.9 11.9 0 00-3.54-8.42zM12.06 21.3a9.3 9.3 0 01-4.74-1.3l-.34-.2-3.68.96.98-3.6-.22-.36a9.24 9.24 0 1112 4.5z" />
        <path d="M17.52 14.4c-.3-.16-1.78-.88-2.06-.98-.28-.1-.48-.16-.68.16-.2.3-.78.98-.96 1.18-.18.2-.36.22-.66.06-.3-.16-1.26-.46-2.4-1.48-.88-.78-1.48-1.74-1.66-2.04-.18-.3-.02-.46.14-.62.14-.14.3-.36.46-.54.16-.18.22-.3.34-.5.12-.2.06-.38-.02-.54-.08-.16-.68-1.64-.94-2.24-.24-.58-.48-.5-.68-.5h-.58c-.2 0-.54.08-.82.38-.28.3-1.08 1.06-1.08 2.58s1.1 3 1.26 3.2c.16.2 2.18 3.32 5.3 4.66.74.32 1.32.5 1.78.64.74.24 1.42.2 1.96.12.6-.08 1.78-.72 2.04-1.42.26-.7.26-1.3.18-1.42-.08-.12-.28-.18-.58-.34z" />
      </svg>
    </motion.a>
  );
}
