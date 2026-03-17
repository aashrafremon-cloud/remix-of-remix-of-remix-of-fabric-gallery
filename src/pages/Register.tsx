import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Phone, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import mascotHappy from "@/assets/mascot-happy.png";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || trimmedName.length > 100) {
      toast({ title: "خطأ", description: "يرجى إدخال اسم صحيح (أقصى 100 حرف)", variant: "destructive" });
      return;
    }
    if (!trimmedPhone || !/^[\d\s+\-()]{7,20}$/.test(trimmedPhone)) {
      toast({ title: "خطأ", description: "يرجى إدخال رقم هاتف صحيح", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("customers").insert({ name: trimmedName, phone: trimmedPhone });
    setLoading(false);

    if (error) {
      toast({ title: "خطأ", description: "حدث خطأ في التسجيل، حاول مرة أخرى", variant: "destructive" });
    } else {
      setSuccess(true);
      setName("");
      setPhone("");
      toast({ title: "تم التسجيل بنجاح! 🎉", description: "شكراً لتسجيلك معنا" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="max-w-md mx-auto bg-card rounded-2xl shadow-fabric p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <img src={mascotHappy} alt="مرحباً" className="w-24 h-24 mx-auto mb-4 object-contain" />
            <h1 className="font-display text-3xl text-foreground mb-2">تسجيل بيانات العميل</h1>
            <p className="font-body text-muted-foreground text-sm">سجّل بياناتك لنتمكن من التواصل معك</p>
          </div>

          {success ? (
            <motion.div
              className="text-center py-8"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <div className="text-5xl mb-4">✅</div>
              <h2 className="font-display text-2xl text-primary mb-2">تم التسجيل بنجاح!</h2>
              <p className="font-body text-muted-foreground mb-6">سنتواصل معك قريباً</p>
              <Button onClick={() => setSuccess(false)} className="gradient-teal text-primary-foreground">
                تسجيل عميل آخر
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-body text-sm text-foreground flex items-center gap-2">
                  <User size={16} /> الاسم الكامل
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  maxLength={100}
                  className="text-right font-body"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-body text-sm text-foreground flex items-center gap-2">
                  <Phone size={16} /> رقم الهاتف
                </Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="مثال: +966 50 000 0000"
                  maxLength={20}
                  className="text-right font-body"
                  dir="ltr"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full gradient-teal text-primary-foreground font-body font-semibold py-3"
              >
                {loading ? (
                  <span className="flex items-center gap-2">جاري التسجيل...</span>
                ) : (
                  <span className="flex items-center gap-2"><UserPlus size={18} /> تسجيل</span>
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Register;
