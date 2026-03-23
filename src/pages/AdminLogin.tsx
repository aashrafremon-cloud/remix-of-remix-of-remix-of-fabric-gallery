import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, ShieldPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/adam-logo.svg";

const sanitize = (v: string) => v.replace(/[<>"'&]/g, "").trim();

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = sanitize(email);
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      toast({ title: "خطأ", description: "بريد إلكتروني غير صالح", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "خطأ", description: "كلمة المرور قصيرة جداً", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
    
    if (error) {
      setLoading(false);
      clearForm();
      toast({ title: "خطأ في الدخول", description: "البريد الإلكتروني أو كلمة المرور غير صحيحة", variant: "destructive" });
      return;
    }

    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id).eq("role", "admin");
    setLoading(false);
    clearForm();

    if (roles && roles.length > 0) {
      navigate("/admin");
    } else {
      await supabase.auth.signOut();
      toast({ title: "غير مصرح", description: "هذا الحساب ليس لديه صلاحيات المشرف", variant: "destructive" });
    }
  };

  const handleBootstrapAdmin = async () => {
    setCreatingAdmin(true);
    const { error } = await supabase.functions.invoke("bootstrap-first-admin");
    setCreatingAdmin(false);

    if (error) {
      toast({ title: "تعذر إنشاء المشرف", description: "قد يكون تم إنشاء المشرف الأول بالفعل", variant: "destructive" });
      return;
    }

    toast({ title: "تم إنشاء أول مشرف", description: "أدخل بيانات الدخول الخاصة بالمشرف" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        className="w-full max-w-sm rounded-2xl bg-card p-8 shadow-fabric"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8 text-center">
          <img src={logo} alt="ADAM Fabrics" className="mx-auto mb-4 h-20 w-20" />
          <h1 className="font-display text-2xl text-foreground">لوحة تحكم المشرف</h1>
          <p className="mt-1 font-body text-sm text-muted-foreground">تسجيل دخول المشرف</p>
        </div>

        <div className="mb-5 rounded-xl border border-border bg-muted/60 p-4 text-right">
          <p className="font-body text-xs leading-6 text-muted-foreground">
            في حال عدم وجود مشرف بعد، اضغط الزر التالي لإنشاء أول مشرف تلقائياً.
          </p>
          <Button type="button" onClick={handleBootstrapAdmin} disabled={creatingAdmin} variant="outline" className="mt-3 w-full gap-2 font-body">
            <ShieldPlus size={16} />
            {creatingAdmin ? "جاري إنشاء المشرف الأول..." : "إنشاء أول مشرف"}
          </Button>
        </div>

        <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
          <div className="space-y-2">
            <Label htmlFor="admin-email" className="flex items-center gap-2 font-body text-sm">
              <Mail size={16} /> البريد الإلكتروني
            </Label>
            <Input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              dir="ltr"
              autoComplete="username"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password" className="flex items-center gap-2 font-body text-sm">
              <Lock size={16} /> كلمة المرور
            </Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              dir="ltr"
              autoComplete="current-password"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="gradient-teal w-full font-body font-semibold text-primary-foreground">
            {loading ? "جاري الدخول..." : "دخول"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
