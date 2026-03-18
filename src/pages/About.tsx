import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import BrandMarquee from "@/components/BrandMarquee";
import mascotFabric from "@/assets/mascot-fabric.png";

const values = [
  {
    title: "اختيار مدروس",
    description: "ننتقي مجموعاتنا بعناية لنوفّر أقمشة تجمع بين الفخامة، الثبات، وسهولة الاستخدام في السوق المحلي.",
  },
  {
    title: "علاقات طويلة",
    description: "نعمل مع علامات ومورّدين معروفين ونبني شراكات مستمرة ترتكز على الجودة والموثوقية والالتزام.",
  },
  {
    title: "خبرة عملية",
    description: "نفهم احتياج المصانع، المشاغل، والمتاجر؛ لذلك نرشّح القماش المناسب حسب الاستخدام وليس الشكل فقط.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-border bg-muted/40">
          <div className="container mx-auto grid items-center gap-10 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-right"
            >
              <p className="font-body text-xs uppercase tracking-[0.35em] text-muted-foreground">About Adam</p>
              <h1 className="mt-3 font-display text-4xl text-foreground md:text-6xl">عن آدم للأقمشة</h1>
              <p className="mt-5 max-w-2xl font-body text-base leading-8 text-muted-foreground md:text-lg">
                نحن نؤمن أن القماش الممتاز لا يُقاس بالمظهر فقط، بل بالإحساس، الأداء، وثقة العميل عند أول لمسة. لهذا نبني مجموعتنا على جودة حقيقية وشراكات موثوقة.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="relative flex justify-center"
            >
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
              <img
                src={mascotFabric}
                alt="شخصية آدم للأقمشة"
                className="relative z-10 w-64 max-w-full object-contain mix-blend-multiply md:w-80"
              />
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[1.75rem] border border-border bg-card p-7 shadow-fabric"
              >
                <h2 className="font-display text-2xl text-foreground">{value.title}</h2>
                <p className="mt-3 font-body text-sm leading-7 text-muted-foreground">{value.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <BrandMarquee />
        </section>
      </main>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default About;
