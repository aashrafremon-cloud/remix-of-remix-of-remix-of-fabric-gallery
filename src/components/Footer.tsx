import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src={logo} alt="ADAM Fabrics" className="w-16 h-16 rounded-full" />
            <p className="text-sm opacity-70 font-body max-w-xs">
              آدم للأقمشة - وجهتك الأولى لأرقى الأقمشة المحلية والمستوردة
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg text-gold mb-4">روابط سريعة</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70 font-body">
              <Link to="/" className="hover:opacity-100 transition-opacity">الرئيسية</Link>
              <Link to="/gallery" className="hover:opacity-100 transition-opacity">المعرض</Link>
              <Link to="/gallery?category=local" className="hover:opacity-100 transition-opacity">أقمشة محلية</Link>
              <Link to="/gallery?category=imported" className="hover:opacity-100 transition-opacity">أقمشة مستوردة</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg text-gold mb-4">تواصل معنا</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70 font-body">
              <span>📞 +966 50 000 0000</span>
              <span>✉️ info@adamfabrics.com</span>
              <span>📍 الرياض، المملكة العربية السعودية</span>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-xs opacity-50 font-body">
          © 2024 ADAM Fabrics. جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
};

export default Footer;
