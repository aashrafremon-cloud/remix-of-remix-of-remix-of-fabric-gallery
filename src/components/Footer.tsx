import { Link } from "react-router-dom";
import logo from "@/assets/adam-logo.svg";

const Footer = () => {
  return (
    <footer className="mt-16 bg-foreground py-12 text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-right">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <img src={logo} alt="ADAM Fabrics" className="h-16 w-16" />
            <p className="max-w-xs font-body text-sm opacity-70">
              آدم للأقمشة - وجهتك الأولى لأرقى الأقمشة المحلية والمستوردة
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-display text-lg text-gold">روابط سريعة</h4>
            <div className="flex flex-col gap-2 font-body text-sm opacity-70">
              <Link to="/" className="transition-opacity hover:opacity-100">الرئيسية</Link>
              <Link to="/about" className="transition-opacity hover:opacity-100">عن آدم</Link>
              <Link to="/gallery" className="transition-opacity hover:opacity-100">المعرض</Link>
              <Link to="/register" className="transition-opacity hover:opacity-100">تسجيل البيانات</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-display text-lg text-gold">تواصل معنا</h4>
            <div className="flex flex-col gap-2 font-body text-sm opacity-70">
              <span>📞 +966 50 000 0000</span>
              <span>✉️ info@adamfabrics.com</span>
              <span>📍 الرياض، المملكة العربية السعودية</span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center font-body text-xs opacity-50">
          © 2024 ADAM Fabrics. جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
};

export default Footer;
