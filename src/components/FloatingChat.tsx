import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import mascot from "@/assets/mascot-happy.png";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="mb-4 bg-card rounded-lg shadow-fabric-hover border border-border p-4 w-72"
        >
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>
            <h4 className="font-display text-sm text-foreground">مرحباً! كيف أساعدك؟</h4>
          </div>
          <div className="bg-muted rounded-lg p-3 mb-3">
            <p className="text-xs font-body text-muted-foreground">
              أهلاً بك في آدم للأقمشة! أنا هنا لمساعدتك في اختيار أفضل الأقمشة. تواصل معنا عبر واتساب للاستفسار عن الأسعار والتوفر.
            </p>
          </div>
          <a
            href="https://wa.me/966500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full gradient-teal text-primary-foreground text-center py-2 rounded-lg text-sm font-body font-semibold hover:opacity-90 transition-opacity"
          >
            تواصل عبر واتساب
          </a>
        </motion.div>
      )}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-fabric-hover overflow-hidden border-2 border-gold hover:scale-110 transition-transform"
        whileTap={{ scale: 0.95 }}
      >
        <img src={mascot} alt="مساعد آدم" className="w-full h-full object-cover" />
      </motion.button>
    </div>
  );
};

export default FloatingChat;
