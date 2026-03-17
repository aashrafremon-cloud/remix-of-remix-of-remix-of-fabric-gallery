import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users, Package, MessageSquare, Tag, LogOut, BarChart3, Plus, Trash2, Eye, EyeOff,
  ChevronDown, ChevronUp, Star, TrendingUp, Sparkles
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/adam-logo.svg";

type Tab = "stats" | "fabrics" | "customers" | "brands" | "messages";

const AdminDashboard = () => {
  const [tab, setTab] = useState<Tab>("stats");
  const [customers, setCustomers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [fabrics, setFabrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/admin-login"); return; }
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
    if (!roles || roles.length === 0) { navigate("/admin-login"); return; }
    fetchAll();
  };

  const fetchAll = async () => {
    setLoading(true);
    const [c, m, b, f] = await Promise.all([
      supabase.from("customers").select("*").order("created_at", { ascending: false }),
      supabase.from("messages").select("*").order("created_at", { ascending: false }),
      supabase.from("brands").select("*").order("created_at", { ascending: false }),
      supabase.from("fabrics_db").select("*").order("created_at", { ascending: false }),
    ]);
    setCustomers(c.data || []);
    setMessages(m.data || []);
    setBrands(b.data || []);
    setFabrics(f.data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  const tabs: { id: Tab; label: string; icon: any; count?: number }[] = [
    { id: "stats", label: "إحصائيات", icon: BarChart3 },
    { id: "fabrics", label: "الأقمشة", icon: Package, count: fabrics.length },
    { id: "customers", label: "العملاء", icon: Users, count: customers.length },
    { id: "brands", label: "الماركات", icon: Tag, count: brands.length },
    { id: "messages", label: "الرسائل", icon: MessageSquare, count: messages.filter(m => !m.is_read).length },
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-background border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <img src={logo} alt="ADAM" className="w-10 h-10" />
          <h1 className="font-display text-xl text-foreground hidden sm:block">لوحة تحكم المشرف</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive gap-2 font-body">
          <LogOut size={16} /> خروج
        </Button>
      </header>

      {/* Tabs */}
      <div className="bg-background border-b border-border overflow-x-auto">
        <div className="container mx-auto px-4 flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-body whitespace-nowrap border-b-2 transition-colors ${
                tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon size={16} />
              {t.label}
              {t.count !== undefined && t.count > 0 && (
                <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">{t.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-20 font-body text-muted-foreground">جاري التحميل...</div>
        ) : (
          <>
            {tab === "stats" && <StatsTab customers={customers} messages={messages} fabrics={fabrics} brands={brands} />}
            {tab === "fabrics" && <FabricsTab fabrics={fabrics} brands={brands} onRefresh={fetchAll} />}
            {tab === "customers" && <CustomersTab customers={customers} />}
            {tab === "brands" && <BrandsTab brands={brands} onRefresh={fetchAll} />}
            {tab === "messages" && <MessagesTab messages={messages} onRefresh={fetchAll} />}
          </>
        )}
      </div>
    </div>
  );
};

// Stats Tab
const StatsTab = ({ customers, messages, fabrics, brands }: any) => {
  const stats = [
    { label: "إجمالي العملاء", value: customers.length, icon: Users, color: "text-primary" },
    { label: "إجمالي الأقمشة", value: fabrics.length, icon: Package, color: "text-accent" },
    { label: "الماركات", value: brands.length, icon: Tag, color: "text-gold" },
    { label: "رسائل غير مقروءة", value: messages.filter((m: any) => !m.is_read).length, icon: MessageSquare, color: "text-destructive" },
    { label: "أقمشة مميزة", value: fabrics.filter((f: any) => f.is_featured).length, icon: Star, color: "text-accent" },
    { label: "وصل حديثاً", value: fabrics.filter((f: any) => f.is_new).length, icon: Sparkles, color: "text-primary" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          className="bg-card rounded-xl p-6 shadow-fabric"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <s.icon className={`${s.color} mb-2`} size={24} />
          <div className="font-display text-3xl text-foreground">{s.value}</div>
          <div className="font-body text-sm text-muted-foreground">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

// Fabrics Tab
const FabricsTab = ({ fabrics, brands, onRefresh }: { fabrics: any[]; brands: any[]; onRefresh: () => void }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "", name_en: "", type: "cotton", category: "local", brand: "",
    origin: "", composition: "", gsm: "", price: "اطلب السعر",
    is_featured: false, is_new: false, is_popular: false, coming_soon: false,
  });
  const { toast } = useToast();

  const handleAdd = async () => {
    if (!form.name.trim() || !form.brand.trim()) {
      toast({ title: "خطأ", description: "يرجى ملء الاسم والماركة", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("fabrics_db").insert({
      name: form.name.trim(),
      name_en: form.name_en.trim() || null,
      type: form.type,
      category: form.category,
      brand: form.brand.trim(),
      origin: form.origin.trim() || null,
      composition: form.composition.trim() || null,
      gsm: form.gsm ? parseInt(form.gsm) : null,
      price: form.price || "اطلب السعر",
      is_featured: form.is_featured,
      is_new: form.is_new,
      is_popular: form.is_popular,
      coming_soon: form.coming_soon,
    });
    if (error) {
      toast({ title: "خطأ", description: "فشل في إضافة القماش", variant: "destructive" });
    } else {
      toast({ title: "تم بنجاح", description: "تم إضافة القماش" });
      setShowForm(false);
      setForm({ name: "", name_en: "", type: "cotton", category: "local", brand: "", origin: "", composition: "", gsm: "", price: "اطلب السعر", is_featured: false, is_new: false, is_popular: false, coming_soon: false });
      onRefresh();
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("fabrics_db").delete().eq("id", id);
    toast({ title: "تم الحذف" });
    onRefresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-foreground">إدارة الأقمشة</h2>
        <Button onClick={() => setShowForm(!showForm)} className="gradient-teal text-primary-foreground gap-2 font-body">
          <Plus size={16} /> إضافة قماش
        </Button>
      </div>

      {showForm && (
        <motion.div className="bg-card rounded-xl p-6 shadow-fabric space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label className="font-body text-sm">الاسم بالعربي *</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="font-body" /></div>
            <div><Label className="font-body text-sm">الاسم بالإنجليزي</Label><Input value={form.name_en} onChange={e => setForm({...form, name_en: e.target.value})} dir="ltr" /></div>
            <div>
              <Label className="font-body text-sm">النوع</Label>
              <Select value={form.type} onValueChange={v => setForm({...form, type: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["cotton","linen","polyester","silk","velvet","satin","chiffon","denim"].map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-body text-sm">الفئة</Label>
              <Select value={form.category} onValueChange={v => setForm({...form, category: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">محلي</SelectItem>
                  <SelectItem value="imported">مستورد</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label className="font-body text-sm">الماركة *</Label><Input value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} className="font-body" /></div>
            <div><Label className="font-body text-sm">بلد المنشأ</Label><Input value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} className="font-body" /></div>
            <div><Label className="font-body text-sm">التركيب</Label><Input value={form.composition} onChange={e => setForm({...form, composition: e.target.value})} className="font-body" /></div>
            <div><Label className="font-body text-sm">GSM</Label><Input type="number" value={form.gsm} onChange={e => setForm({...form, gsm: e.target.value})} dir="ltr" /></div>
            <div><Label className="font-body text-sm">السعر</Label><Input value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="font-body" /></div>
          </div>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 font-body text-sm"><Switch checked={form.is_featured} onCheckedChange={v => setForm({...form, is_featured: v})} /> مميز</label>
            <label className="flex items-center gap-2 font-body text-sm"><Switch checked={form.is_new} onCheckedChange={v => setForm({...form, is_new: v})} /> جديد</label>
            <label className="flex items-center gap-2 font-body text-sm"><Switch checked={form.is_popular} onCheckedChange={v => setForm({...form, is_popular: v})} /> شائع</label>
            <label className="flex items-center gap-2 font-body text-sm"><Switch checked={form.coming_soon} onCheckedChange={v => setForm({...form, coming_soon: v})} /> قريباً</label>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAdd} className="gradient-teal text-primary-foreground font-body">حفظ</Button>
            <Button variant="outline" onClick={() => setShowForm(false)} className="font-body">إلغاء</Button>
          </div>
        </motion.div>
      )}

      <div className="bg-card rounded-xl shadow-fabric overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-right">الاسم</th>
                <th className="px-4 py-3 text-right">النوع</th>
                <th className="px-4 py-3 text-right">الفئة</th>
                <th className="px-4 py-3 text-right">الماركة</th>
                <th className="px-4 py-3 text-right">الحالة</th>
                <th className="px-4 py-3 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {fabrics.map((f: any) => (
                <tr key={f.id} className="border-t border-border hover:bg-muted/50">
                  <td className="px-4 py-3">{f.name}</td>
                  <td className="px-4 py-3">{f.type}</td>
                  <td className="px-4 py-3">{f.category === "local" ? "محلي" : "مستورد"}</td>
                  <td className="px-4 py-3">{f.brand}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {f.is_featured && <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-0.5 rounded">مميز</span>}
                      {f.is_new && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">جديد</span>}
                      {f.is_popular && <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded">شائع</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(f.id)} className="text-destructive">
                      <Trash2 size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
              {fabrics.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">لا توجد أقمشة بعد</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Customers Tab
const CustomersTab = ({ customers }: { customers: any[] }) => (
  <div className="space-y-4">
    <h2 className="font-display text-xl text-foreground">العملاء المسجلين ({customers.length})</h2>
    <div className="bg-card rounded-xl shadow-fabric overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-body">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-right">#</th>
              <th className="px-4 py-3 text-right">الاسم</th>
              <th className="px-4 py-3 text-right">الهاتف</th>
              <th className="px-4 py-3 text-right">تاريخ التسجيل</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c: any, i: number) => (
              <tr key={c.id} className="border-t border-border hover:bg-muted/50">
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3 font-semibold">{c.name}</td>
                <td className="px-4 py-3 dir-ltr" dir="ltr">{c.phone}</td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(c.created_at).toLocaleDateString("ar-EG")}</td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr><td colSpan={4} className="text-center py-8 text-muted-foreground">لا يوجد عملاء مسجلين بعد</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// Brands Tab
const BrandsTab = ({ brands, onRefresh }: { brands: any[]; onRefresh: () => void }) => {
  const [newBrand, setNewBrand] = useState("");
  const { toast } = useToast();

  const handleAdd = async () => {
    if (!newBrand.trim()) return;
    const { error } = await supabase.from("brands").insert({ name: newBrand.trim() });
    if (error) {
      toast({ title: "خطأ", description: "فشل في إضافة الماركة", variant: "destructive" });
    } else {
      setNewBrand("");
      toast({ title: "تم إضافة الماركة" });
      onRefresh();
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("brands").delete().eq("id", id);
    toast({ title: "تم الحذف" });
    onRefresh();
  };

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl text-foreground">إدارة الماركات</h2>
      <div className="flex gap-2">
        <Input value={newBrand} onChange={e => setNewBrand(e.target.value)} placeholder="اسم الماركة الجديدة" className="font-body max-w-xs" />
        <Button onClick={handleAdd} className="gradient-teal text-primary-foreground gap-2 font-body"><Plus size={16} /> إضافة</Button>
      </div>
      <div className="bg-card rounded-xl shadow-fabric overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-right">الاسم</th>
              <th className="px-4 py-3 text-right">التاريخ</th>
              <th className="px-4 py-3 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((b: any) => (
              <tr key={b.id} className="border-t border-border hover:bg-muted/50">
                <td className="px-4 py-3 font-semibold">{b.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(b.created_at).toLocaleDateString("ar-EG")}</td>
                <td className="px-4 py-3 text-center">
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(b.id)} className="text-destructive"><Trash2 size={14} /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Messages Tab
const MessagesTab = ({ messages, onRefresh }: { messages: any[]; onRefresh: () => void }) => {
  const { toast } = useToast();

  const toggleRead = async (id: string, current: boolean) => {
    await supabase.from("messages").update({ is_read: !current }).eq("id", id);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("messages").delete().eq("id", id);
    toast({ title: "تم حذف الرسالة" });
    onRefresh();
  };

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl text-foreground">الرسائل ({messages.length})</h2>
      <div className="space-y-3">
        {messages.map((m: any) => (
          <motion.div
            key={m.id}
            className={`bg-card rounded-xl p-4 shadow-fabric border-r-4 ${m.is_read ? "border-border" : "border-primary"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-body font-semibold text-foreground">{m.name}</span>
                  {m.phone && <span className="text-xs text-muted-foreground" dir="ltr">{m.phone}</span>}
                  {!m.is_read && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">جديد</span>}
                </div>
                <p className="font-body text-sm text-muted-foreground">{m.message}</p>
                <span className="font-body text-xs text-muted-foreground/60 mt-1 block">
                  {new Date(m.created_at).toLocaleDateString("ar-EG")} - {new Date(m.created_at).toLocaleTimeString("ar-EG")}
                </span>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => toggleRead(m.id, m.is_read)}>
                  {m.is_read ? <EyeOff size={14} /> : <Eye size={14} />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(m.id)} className="text-destructive">
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
        {messages.length === 0 && (
          <div className="text-center py-12 text-muted-foreground font-body">لا توجد رسائل</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
