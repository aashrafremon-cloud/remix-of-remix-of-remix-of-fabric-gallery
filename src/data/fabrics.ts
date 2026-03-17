import fabricSilk from "@/assets/fabric-silk.jpg";
import fabricCotton from "@/assets/fabric-cotton.jpg";
import fabricVelvet from "@/assets/fabric-velvet.jpg";
import fabricLinen from "@/assets/fabric-linen.jpg";
import fabricSatin from "@/assets/fabric-satin.jpg";
import fabricDenim from "@/assets/fabric-denim.jpg";
import fabricPolyester from "@/assets/fabric-polyester.jpg";

export interface Fabric {
  id: string;
  name: string;
  nameEn: string;
  type: string;
  category: "local" | "imported";
  brand: string;
  image: string;
  colors: string[];
  gsm: number;
  origin: string;
  composition: string;
  features: string[];
  usage: string[];
  price: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  comingSoon?: boolean;
}

export const fabricTypes = [
  { id: "cotton", name: "قطن", nameEn: "Cotton" },
  { id: "linen", name: "كتان", nameEn: "Linen" },
  { id: "polyester", name: "بوليستر", nameEn: "Polyester" },
  { id: "silk", name: "حرير", nameEn: "Silk" },
  { id: "velvet", name: "مخمل", nameEn: "Velvet" },
  { id: "satin", name: "ساتان", nameEn: "Satin" },
  { id: "chiffon", name: "شيفون", nameEn: "Chiffon" },
  { id: "denim", name: "دنيم", nameEn: "Denim" },
];

export const brands = [
  { id: "adam-premium", name: "آدم بريميوم" },
  { id: "silk-road", name: "طريق الحرير" },
  { id: "cotton-club", name: "نادي القطن" },
  { id: "royal-textiles", name: "رويال تكستايل" },
  { id: "orient-fabrics", name: "أقمشة الشرق" },
];

export const origins = [
  "مصر", "الهند", "الصين", "تركيا", "إيطاليا", "اليابان", "المغرب"
];

export const fabrics: Fabric[] = [
  {
    id: "1",
    name: "حرير ملكي",
    nameEn: "Royal Silk",
    type: "silk",
    category: "imported",
    brand: "silk-road",
    image: fabricSilk,
    colors: ["#008080", "#D4AF37", "#800020", "#1a1a2e"],
    gsm: 90,
    origin: "الصين",
    composition: "100% حرير طبيعي",
    features: ["ناعم الملمس", "لامع", "خفيف الوزن", "مقاوم للتجاعيد"],
    usage: ["فساتين السهرة", "الأوشحة", "البطانات الفاخرة"],
    price: "اطلب السعر",
    isFeatured: true,
    isPopular: true,
  },
  {
    id: "2",
    name: "قطن مصري فاخر",
    nameEn: "Premium Egyptian Cotton",
    type: "cotton",
    category: "local",
    brand: "cotton-club",
    image: fabricCotton,
    colors: ["#FDFBF7", "#F5E6D3", "#E8D5B7", "#C4A882"],
    gsm: 180,
    origin: "مصر",
    composition: "100% قطن مصري",
    features: ["تنفس ممتاز", "متين", "مريح", "سهل العناية"],
    usage: ["القمصان", "الملابس اليومية", "مفروشات المنزل"],
    price: "اطلب السعر",
    isFeatured: true,
    isNew: true,
  },
  {
    id: "3",
    name: "مخمل بورغندي",
    nameEn: "Burgundy Velvet",
    type: "velvet",
    category: "imported",
    brand: "royal-textiles",
    image: fabricVelvet,
    colors: ["#800020", "#4A0E2E", "#2D0519", "#C41E3A"],
    gsm: 320,
    origin: "إيطاليا",
    composition: "80% قطن، 20% حرير",
    features: ["فخم", "ناعم جداً", "غني اللون", "ثقيل"],
    usage: ["الستائر", "المفروشات الفاخرة", "ملابس الشتاء"],
    price: "اطلب السعر",
    isPopular: true,
  },
  {
    id: "4",
    name: "كتان طبيعي",
    nameEn: "Natural Linen",
    type: "linen",
    category: "local",
    brand: "orient-fabrics",
    image: fabricLinen,
    colors: ["#D4C5A9", "#BFB093", "#E8DCC8", "#A89776"],
    gsm: 150,
    origin: "مصر",
    composition: "100% كتان طبيعي",
    features: ["صديق للبيئة", "تنفس عالي", "متين", "يزداد نعومة مع الغسل"],
    usage: ["الملابس الصيفية", "مفروشات المنزل", "الحقائب"],
    price: "اطلب السعر",
    isNew: true,
  },
  {
    id: "5",
    name: "ساتان أزرق ملكي",
    nameEn: "Royal Blue Satin",
    type: "satin",
    category: "imported",
    brand: "adam-premium",
    image: fabricSatin,
    colors: ["#00008B", "#191970", "#000080", "#4169E1"],
    gsm: 120,
    origin: "اليابان",
    composition: "100% بوليستر ساتان",
    features: ["لامع", "ناعم", "انسيابي", "مقاوم للتجاعيد"],
    usage: ["فساتين السهرة", "البطانات", "الإكسسوارات"],
    price: "اطلب السعر",
    isFeatured: true,
  },
  {
    id: "6",
    name: "دنيم كلاسيكي",
    nameEn: "Classic Denim",
    type: "denim",
    category: "imported",
    brand: "cotton-club",
    image: fabricDenim,
    colors: ["#1560BD", "#00308F", "#4682B4", "#6082B6"],
    gsm: 350,
    origin: "تركيا",
    composition: "98% قطن، 2% إيلاستين",
    features: ["متين جداً", "مرن", "كلاسيكي", "سهل العناية"],
    usage: ["الجينز", "الجاكيتات", "الحقائب"],
    price: "اطلب السعر",
    isPopular: true,
  },
  {
    id: "7",
    name: "بوليستر أخضر",
    nameEn: "Green Polyester",
    type: "polyester",
    category: "local",
    brand: "orient-fabrics",
    image: fabricPolyester,
    colors: ["#228B22", "#006400", "#32CD32", "#90EE90"],
    gsm: 130,
    origin: "مصر",
    composition: "100% بوليستر",
    features: ["مقاوم للتجاعيد", "سريع الجفاف", "خفيف", "اقتصادي"],
    usage: ["الملابس الرياضية", "البطانات", "الأعلام"],
    price: "اطلب السعر",
    isNew: true,
  },
];
