import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/adam-logo.svg";

interface AuthGateProps {
  onSuccess?: () => void;
}

const AuthGate = ({ onSuccess }: AuthGateProps) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      setLoading(false);
      if (error) {
        toast({ title: "خطأ", description: "البريد الإلكتروني أو كلمة المرور غير صحيحة", variant: "destructive" });
        return;
      }
      toast({ title: "أهلاً بك! 👋" });
      onSuccess?.();
    } else {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { full_name: fullName.trim() } },
      });
      setLoading(false);
      if (error) {
        toast({ title: "خطأ", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "تم إنشاء الحساب", description: "تحقق من بريدك الإلكتروني لتأكيد الحساب" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4">
      <motion.div
        className="w-full max-w-md rounded-2xl bg-card p-8 shadow-fabric-hover"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="mb-6 text-center">
          <img src={logo} alt="ADAM" className="mx-auto mb-3 h-14 w-14" />
          <h2 className="font-display text-2xl text-foreground">
            {mode === "login" ? "سجّل دخولك" : "إنشاء حساب"}
          </h2>
          <p className="mt-1 font-body text-sm text-muted-foreground">
            {mode === "login" ? "سجّل دخولك لتصفح معرض الأقمشة" : "أنشئ حساباً جديداً للوصول للمعرض"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label className="font-body text-sm">الاسم الكامل</Label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="اسمك" required />
            </div>
          )}
          <div className="space-y-1.5">
            <Label className="flex items-center gap-2 font-body text-sm">
              <Mail size={14} /> البريد الإلكتروني
            </Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" dir="ltr" required />
          </div>
          <div className="space-y-1.5">
            <Label className="flex items-center gap-2 font-body text-sm">
              <Lock size={14} /> كلمة المرور
            </Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" dir="ltr" required minLength={6} />
          </div>
          <Button type="submit" disabled={loading} className="gradient-teal w-full font-body font-semibold text-primary-foreground">
            {loading ? "جاري التحميل..." : mode === "login" ? (
              <><LogIn size={18} /> دخول</>
            ) : (
              <><UserPlus size={18} /> إنشاء حساب</>
            )}
          </Button>
        </form>

        <p className="mt-5 text-center font-body text-sm text-muted-foreground">
          {mode === "login" ? "ليس لديك حساب؟ " : "لديك حساب بالفعل؟ "}
          <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-primary hover:underline font-semibold">
            {mode === "login" ? "إنشاء حساب" : "تسجيل الدخول"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthGate;
