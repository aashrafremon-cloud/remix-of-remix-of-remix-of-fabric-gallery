import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";
import logo from "@/assets/logo.jpg";
import mascotThinking from "@/assets/mascot-thinking.png";
import mascotFabric from "@/assets/mascot-fabric.png";
import { fabrics } from "@/data/fabrics";
import FabricCard from "@/components/FabricCard";
import SectionHeader from "@/components/SectionHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import IntroLoader from "@/components/IntroLoader";

const categoryCards = [
  { label: "أقمشة محلية", desc: "أجود الأقمشة المصنعة محلياً", path: "/gallery?category=local", color: "gradient-teal" },
  { label: "أقمشة مستوردة", desc: "أرقى الأقمشة العالمية", path: "/gallery?category=imported", color: "gradient-gold" },
  { label: "تصفح الكل", desc: "استكشف مجموعتنا الكاملة", path: "/gallery", color: "bg-foreground" },
];

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  const featured = fabrics.filter((f) => f.isFeatured);
  const newArrivals = fabrics.filter((f) => f.isNew);
  const popular = fabrics.filter((f) => f.isPopular);

  const handleIntroComplete = useCallback(() => setShowIntro(false), []);

  if (showIntro) {
    return <IntroLoader onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <img src={heroBanner} alt="معرض الأقمشة" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
        {/* Watermark logo */}
        <img src={logo} alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-10 rounded-full" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            className="font-display text-4xl md:text-6xl text-primary-foreground mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            آدم للأقمشة الفاخرة
          </motion.h1>
          <motion.p
            className="font-body text-primary-foreground/80 text-lg md:text-xl max-w-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            اكتشف أرقى الأقمشة المحلية والمستوردة بأعلى جودة
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/gallery"
              className="gradient-teal text-primary-foreground px-8 py-3 rounded-lg font-body font-semibold text-sm hover:opacity-90 transition-opacity inline-block"
            >
              تصفح المعرض
            </Link>
          </motion.div>
        </div>
        {/* Mascot welcoming */}
        <motion.img
          src={mascotFabric}
          alt="مرحباً"
          className="absolute bottom-4 right-8 w-28 md:w-36 hidden md:block"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
      </section>

      {/* Quick Navigation */}
      <section className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categoryCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i }}
            >
              <Link to={card.path} className={`block ${card.color} text-primary-foreground rounded-lg p-6 hover:opacity-90 transition-opacity`}>
                <h3 className="font-display text-xl mb-1">{card.label}</h3>
                <p className="text-sm opacity-80 font-body">{card.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeader title="أقمشة مميزة" subtitle="اختيارات منتقاة بعناية لك" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((f) => (
            <FabricCard key={f.id} fabric={f} />
          ))}
        </div>
      </section>

      {/* Mascot tip */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          className="bg-muted rounded-xl p-6 flex items-center gap-6 flex-row-reverse"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <img src={mascotThinking} alt="نصيحة" className="w-24 h-24 object-contain flex-shrink-0" />
          <div className="text-right">
            <h3 className="font-display text-xl text-foreground mb-2">💡 نصيحة من آدم</h3>
            <p className="font-body text-sm text-muted-foreground">
              هل تعلم أن القطن المصري يُعتبر من أفخر أنواع القطن في العالم؟ يتميز بأليافه الطويلة التي تمنحه نعومة ومتانة استثنائية. جرّب مجموعتنا من القطن المصري الفاخر!
            </p>
          </div>
        </motion.div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeader title="وصل حديثاً" subtitle="أحدث الأقمشة في مجموعتنا" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newArrivals.map((f) => (
            <FabricCard key={f.id} fabric={f} />
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeader title="الأكثر طلباً" subtitle="الأقمشة المفضلة لدى عملائنا" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popular.map((f) => (
            <FabricCard key={f.id} fabric={f} />
          ))}
        </div>
      </section>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Index;
