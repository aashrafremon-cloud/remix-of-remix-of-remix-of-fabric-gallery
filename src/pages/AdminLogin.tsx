import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/adam-logo.svg";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });

    if (error) {
      setLoading(false);
      toast({ title: "خطأ في الدخول", description: "البريد الإلكتروني أو كلمة المرور غير صحيحة", variant: "destructive" });
      return;
    }

    // Check admin role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin");

    setLoading(false);

    if (roles && roles.length > 0) {
      navigate("/admin");
    } else {
      await supabase.auth.signOut();
      toast({ title: "غير مصرح", description: "هذا الحساب ليس لديه صلاحيات المشرف", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-sm bg-card rounded-2xl shadow-fabric p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-8">
          <img src={logo} alt="ADAM Fabrics" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="font-display text-2xl text-foreground">لوحة تحكم المشرف</h1>
          <p className="font-body text-muted-foreground text-sm mt-1">تسجيل دخول المشرف</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-body text-sm flex items-center gap-2">
              <Mail size={16} /> البريد الإلكتروني
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              dir="ltr"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-body text-sm flex items-center gap-2">
              <Lock size={16} /> كلمة المرور
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              dir="ltr"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full gradient-teal text-primary-foreground font-body font-semibold">
            {loading ? "جاري الدخول..." : "دخول"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
