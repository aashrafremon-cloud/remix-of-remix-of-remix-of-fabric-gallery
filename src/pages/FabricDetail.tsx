import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { fabrics, fabricTypes, brands } from "@/data/fabrics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import mascotFabric from "@/assets/mascot-fabric.png";

const FabricDetail = () => {
  const { id } = useParams();
  const fabric = fabrics.find((f) => f.id === id);
  const [selectedColor, setSelectedColor] = useState(0);

  if (!fabric) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl text-foreground mb-4">القماش غير موجود</h1>
          <Link to="/gallery" className="text-primary font-body text-sm hover:underline">العودة للمعرض</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const typeName = fabricTypes.find((t) => t.id === fabric.type)?.name || fabric.type;
  const brandName = brands.find((b) => b.id === fabric.brand)?.name || fabric.brand;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-body text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">الرئيسية</Link>
          <ArrowRight size={14} className="rotate-180" />
          <Link to="/gallery" className="hover:text-primary">المعرض</Link>
          <ArrowRight size={14} className="rotate-180" />
          <span className="text-foreground">{fabric.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image - Right side (RTL) */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="rounded-xl overflow-hidden shadow-fabric aspect-square">
              <img
                src={fabric.image}
                alt={fabric.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Color swatches under image */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs text-muted-foreground font-body">الألوان المتاحة:</span>
              {fabric.colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(i)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === i ? "border-primary scale-110" : "border-border"}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </motion.div>

          {/* Details - Left side (RTL) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-start gap-3 mb-4">
              {fabric.isFeatured && (
                <span className="bg-gold text-gold-foreground text-xs px-3 py-1 rounded-full font-body font-semibold">مميز</span>
              )}
              {fabric.isNew && (
                <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-body font-semibold">جديد</span>
              )}
            </div>

            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">{fabric.name}</h1>
            <p className="text-muted-foreground font-body text-sm mb-6">{fabric.nameEn}</p>

            {/* Specs */}
            <div className="bg-card border border-border rounded-xl p-5 mb-6">
              <h3 className="font-display text-lg text-foreground mb-4">المواصفات</h3>
              <div className="grid grid-cols-2 gap-y-3 text-sm font-body">
                <SpecRow label="النوع" value={typeName} />
                <SpecRow label="الماركة" value={brandName} />
                <SpecRow label="التصنيف" value={fabric.category === "local" ? "محلي" : "مستورد"} />
                <SpecRow label="المنشأ" value={fabric.origin} />
                <SpecRow label="التركيب" value={fabric.composition} />
                <SpecRow label="GSM" value={String(fabric.gsm)} />
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-display text-lg text-foreground mb-3">المميزات</h3>
              <div className="flex flex-wrap gap-2">
                {fabric.features.map((f, i) => (
                  <span key={i} className="bg-muted text-muted-foreground text-xs px-3 py-1.5 rounded-full font-body">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Usage */}
            <div className="mb-8">
              <h3 className="font-display text-lg text-foreground mb-3">الاستخدامات</h3>
              <div className="flex flex-wrap gap-2">
                {fabric.usage.map((u, i) => (
                  <span key={i} className="bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full font-body">
                    {u}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 gradient-teal text-primary-foreground py-3 rounded-lg font-body font-semibold text-center text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                اطلب السعر عبر واتساب
              </a>
            </div>

            {/* Mascot tip */}
            <div className="mt-6 bg-muted rounded-xl p-4 flex items-center gap-4 flex-row-reverse">
              <img src={mascotFabric} alt="نصيحة" className="w-16 h-16 object-contain flex-shrink-0" />
              <p className="text-xs font-body text-muted-foreground text-right">
                💡 هذا القماش مثالي لـ{fabric.usage[0]}! تواصل معنا للحصول على عينة مجانية.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
      <FloatingChat />
    </div>
  );
};

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <>
    <span className="text-muted-foreground">{label}</span>
    <span className="text-foreground font-medium">{value}</span>
  </>
);

export default FabricDetail;
