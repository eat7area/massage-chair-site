import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  PhoneCall,
  Wrench,
  ShieldCheck,
  Truck,
  MapPin,
  Star,
  Images,
  Check,
  ChevronRight,
  MessageSquare,
  Clock,
  BadgeCheck,
  Wallet,
  ClipboardList,
  Hammer,
  BatteryCharging,
  Plug,
  RefreshCw,
  Info,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

/* =====================================================
   PRO CONFIG (Edit these and the entire site updates)
   ===================================================== */
const BRAND = {
  name: "TMC HEALTHTECH",
  tagline: "ซ่อมเก้าอี้นวดไฟฟ้า ถึงบ้าน รวดเร็ว โปร่งใส",
  legal: "TMC HEALTHTECH",
};

const CONTACT = {
  phone: "093-002-0700", // e.g. +66812345678
  phonePretty: "08x-xxx-xxxx",
  lineId: "iifix", // e.g. @massagepro (include @ if it’s an Official Account)
  email: "info@example.com",
  whatsapp: "+66800000000",
};

const CITY_SERVICE = [
  "กรุงเทพฯ ชั้นใน/รอบนอก",
  "นนทบุรี • ปทุมธานี • สมุทรปราการ",
  "ฉะเชิงเทรา • ชลบุรี (ตัวเมือง/ศรีราชา/พัทยา)",
  "อยุธยา • นครปฐม (นัดล่วงหน้า)",
];

// Brand accent set to SKY BLUE
const ACCENT = "#0a5584ff";

/* Helpers derived from config */
const LINE_URL = `https://line.me/R/ti/p/~${CONTACT.lineId.replace(/^@/, "")}`;
const TEL_URL = `tel:${CONTACT.phone}`;
const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsapp.replace("+", "")}`;

/* =====================================================
   DATA
   ===================================================== */
const NAV = [
  { label: "บริการ", href: "#services" },
  { label: "ผลงานซ่อม", href: "#portfolio" },
  { label: "รีวิวลูกค้า", href: "#reviews" },
  { label: "ราคา & นัดหมาย", href: "#pricing" },
  { label: "เขตให้บริการ", href: "#areas" },
  { label: "FAQ", href: "#faq" },
];

const SERVICES = [
  { icon: Wrench, title: "ซ่อมระบบกลไก", points: ["รางสไลด์", "ลูกกลิ้งนวด", "รางติด/มีเสียง"] },
  { icon: BatteryCharging, title: "ซ่อมระบบไฟฟ้า", points: ["บอร์ดควบคุม", "ฟิวส์/สายไฟ", "ระบบเปิด-ปิด"] },
  { icon: Plug, title: "มอเตอร์ & เกียร์", points: ["เปลี่ยนมอเตอร์", "แก้เกียร์รูด", "ตั้งตำแหน่ง"] },
  { icon: RefreshCw, title: "ระบบลม/ถุงลม", points: ["รั่ว/ไม่พอง", "วาล์ว", "ปั๊มลม"] },
  { icon: Hammer, title: "โครงสร้าง & บุผิว", points: ["ซ่อมโครง", "เปลี่ยนหนัง/ผ้า", "งานประกอบ"] },
  { icon: ClipboardList, title: "บำรุงรักษา", points: ["ทำความสะอาด", "หล่อลื่น", "เช็คระยะ"] },
];

const CASES = [
  {
    title: "เปลี่ยนมอเตอร์ลูกกลิ้ง + ตั้งศูนย์",
    city: "บางนา, กรุงเทพฯ",
    before: "/img/cases/motor_before.jpg",
    after: "/img/cases/motor_after.jpg",
    bullets: ["ลูกกลิ้งไม่หมุน", "มีเสียงดัง", "ใช้เวลา ~1 ชม."]
  },
  {
    title: "ซ่อมถุงลมรั่ว 3 จุด",
    city: "เมืองนนทบุรี, นนทบุรี",
    before: "/img/cases/air_before.jpg",
    after: "/img/cases/air_after.jpg",
    bullets: ["นวดไม่แน่น", "ตรวจรั่วด้วยโฟม", "รับประกัน 90 วัน"]
  },
  {
    title: "เปลี่ยนแผงบอร์ดควบคุม + รีไวร์",
    city: "ศรีราชา, ชลบุรี",
    before: "/img/cases/pcb_before.jpg",
    after: "/img/cases/pcb_after.jpg",
    bullets: ["ไฟไม่เข้า", "มีรอยไหม้", "ทดสอบครบโหมด"]
  },
];

const REVIEWS = [
  { name: "คุณอรทัย", text: "ช่างมาทันเวลา ตรวจละเอียด อธิบายชัดเจน เก้าอี้กลับมานวดได้เหมือนใหม่เลยค่ะ", stars: 5 },
  { name: "คุณบอย", text: "บริการถึงบ้าน ไม่ยัดเยียดอะไหล่ ราคาตรงไปตรงมาครับ", stars: 5 },
  { name: "คุณมุก", text: "ถุงลมรั่ว แก้จบในครั้งเดียว แนะนำมาก", stars: 4 },
];

/* =====================================================
   SMALL COMPONENTS
   ===================================================== */
function Brand() {
  return (
    <a
      href="#top"
      className="flex items-center gap-2 select-none focus:outline-none"
      aria-label={BRAND.name}
    >
      <img
        src="/img/logo.png"   // ใช้ path จาก public/
        alt={BRAND.name}
        className="h-8 w-auto"
      />
      <span className="font-semibold tracking-tight text-lg">
        {BRAND.name}
      </span>
    </a>
  );
}


function Rating({ value }) {
  const whole = Math.round(value);
  return (
    <div className="flex items-center gap-1 text-sm text-gray-600" aria-label={`เรตติ้ง ${value.toFixed(1)} จาก 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < whole ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
      ))}
      <span>{value.toFixed(1)}</span>
    </div>
  );
}

function CaseCard({ item, i }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: 0.05 * i }}
      className="rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-[0_30px_100px_-25px_rgba(0,0,0,0.35)]"
    >
      <div className="grid sm:grid-cols-2">
        <div className="p-4">
          <div className="text-xs inline-flex px-2 py-1 rounded-full" style={{ background: `${ACCENT}10`, color: ACCENT }}>
            ก่อนซ่อม
          </div>
          <div className="mt-2 aspect-[4/3] rounded-xl border border-gray-100 overflow-hidden bg-sky-50">
            <img src={item.before} alt="ภาพก่อนซ่อม" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="p-4">
          <div className="text-xs inline-flex px-2 py-1 rounded-full" style={{ background: `${ACCENT}10`, color: ACCENT }}>
            หลังซ่อม
          </div>
          <div className="mt-2 aspect-[4/3] rounded-xl border border-gray-100 overflow-hidden bg-sky-50">
            <img src={item.after} alt="ภาพหลังซ่อม" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold leading-tight">{item.title}</h3>
            <div className="text-sm text-gray-600 inline-flex items-center gap-1"><MapPin className="w-4 h-4" /> {item.city}</div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600"><Images className="w-4 h-4" /> งานจริงจากหน้างาน</div>
        </div>
        <ul className="mt-2 text-sm text-gray-600 grid sm:grid-cols-3 gap-1">
          {item.bullets.map((b, idx) => (
            <li key={idx} className="inline-flex items-center gap-1"><Check className="w-4 h-4 text-emerald-500" /> {b}</li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

/* =====================================================
   PAGE
   ===================================================== */
export default function ProMassageChairServiceSite() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", model: "", details: "" });
  const [sent, setSent] = useState(false);

  // Simple client-side validation
  const canSubmit = form.name.trim() && form.contact.trim() && form.details.trim();

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    // Fallback: open mailto with prefilled content (replace with API/email service in production)
    const subject = encodeURIComponent("ขอประเมินอาการเก้าอี้นวด");
    const body = encodeURIComponent(
      `ชื่อ: ${form.name}\nติดต่อ: ${form.contact}\nรุ่น: ${form.model}\nรายละเอียด: ${form.details}`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  // Sticky mobile CTA visibility
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // =====================
  // DEV SMOKE TESTS
  // =====================
  useEffect(() => {
    const tests = [];

    // Test 1: LINE URL builder
    const sampleLineIds = ["@abc", "abc", "@massagepro"];
    sampleLineIds.forEach((id) => {
      const url = `https://line.me/R/ti/p/~${id.replace(/^@/, "")}`;
      tests.push({ name: "LINE URL", input: id, expectedContains: id.replace(/^@/, ""), got: url, pass: url.endsWith(id.replace(/^@/, "")) });
    });

    // Test 2: WhatsApp URL builder
    const sampleWhats = ["+66800000000", "+11234567890"]; 
    sampleWhats.forEach((w) => {
      const url = `https://wa.me/${w.replace("+", "")}`;
      tests.push({ name: "WA URL", input: w, expected: w.replace("+", ""), got: url.split("/").pop(), pass: url.endsWith(w.replace("+", "")) });
    });

    // Test 3: Config presence
    tests.push({ name: "Config phone", pass: Boolean(CONTACT.phone) });
    tests.push({ name: "Config email", pass: Boolean(CONTACT.email && CONTACT.email.includes("@")) });
    tests.push({ name: "Services count >= 6", pass: SERVICES.length >= 6 });

    // Log results
    const allPass = tests.every((t) => t.pass);
    console.table(tests);
    if (!allPass) {
      console.warn("[SMOKE TESTS] Some tests failed. Please check CONTACT/NAV/SERVICES configuration.");
    } else {
      console.info("[SMOKE TESTS] All tests passed.");
    }
  }, []);

  return (
    <div id="top" className="min-h-screen bg-sky-50 text-gray-900" style={{ ["--accent"]: ACCENT }}>
      {/* ===== SEO & Structured Data (insert in <Head> when using Next.js) ===== */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: BRAND.name,
        description: BRAND.tagline,
        url: "https://example.com",
        telephone: CONTACT.phone,
        email: CONTACT.email,
        areaServed: CITY_SERVICE,
        sameAs: [LINE_URL, WHATSAPP_URL],
        address: { "@type": "PostalAddress", addressCountry: "TH" },
        openingHours: "Mo-Su 09:00-19:00",
        priceRange: "฿฿",
        image: ["/og-cover.jpg"]
      }) }} />

      {/* ===== Skip to content ===== */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-white border rounded px-3 py-2 z-50">ข้ามไปยังเนื้อหา</a>

      {/* ===== Top infobar ===== */}
      <div className="bg-sky-100 border-b border-sky-200/60 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-4 text-gray-700">
            <div className="inline-flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> รับประกันงานซ่อม 90 วัน</div>
            <div className="inline-flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> บริการนอกสถานที่</div>
            <div className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> เปิดทุกวัน 09:00–19:00</div>
          </div>
          <div className="text-gray-700 flex items-center gap-3">
            <a href={LINE_URL} className="hover:text-[color:var(--accent)] inline-flex items-center gap-1" aria-label="LINE"><MessageSquare className="w-3.5 h-3.5" /> {CONTACT.lineId}</a>
          </div>
        </div>
      </div>

      {/* ===== Header ===== */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-sky-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <Brand />
            <nav className="hidden lg:flex items-center gap-6 text-sm" aria-label="หลัก">
              {NAV.map((n) => (
                <a key={n.href} className="hover:text-[color:var(--accent)] inline-flex items-center gap-1" href={n.href}>
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="#contact"
                className="px-4 py-2 rounded-full text-white inline-flex items-center gap-2"
                style={{ background: ACCENT }}
              >
                <PhoneCall className="w-4 h-4" /> โทร/ไลน์ นัดช่าง
              </a>
            </div>
            <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="เปิด/ปิด เมนู">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden border-t border-sky-200/60 bg-white/95">
            <div className="px-4 py-3 space-y-3 text-sm">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className="block py-2" onClick={() => setOpen(false)}>{n.label}</a>
              ))}
              <div className="flex gap-3 pt-2">
                <a href="#contact" className="flex-1 px-4 py-2 rounded-full text-white text-center" style={{ background: ACCENT }}>โทร/ไลน์ นัดช่าง</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ===== HERO ===== */}
      <section className="relative">
        <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full bg-sky-300/25 blur-3xl" animate={{ y: [0, 18, 0], x: [0, 10, 0] }} transition={{ duration: 12, repeat: Infinity }} />
          <motion.div className="absolute -bottom-40 -right-40 w-[42rem] h-[42rem] rounded-full bg-sky-400/25 blur-3xl" animate={{ y: [0, -18, 0], x: [0, -12, 0] }} transition={{ duration: 14, repeat: Infinity }} />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative">
          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="lg:col-span-2 rounded-3xl overflow-hidden border border-sky-200 bg-white shadow-[0_30px_100px_-25px_rgba(0,0,0,0.35)]">
              <div className="p-6 sm:p-8">
                <div className="aspect-[16/9] rounded-2xl border border-sky-200 overflow-hidden bg-gradient-to-tr from-sky-100 to-sky-200 flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-sm inline-flex items-center gap-2 text-[color:var(--accent)]"><Sparkles className="w-4 h-4" /> {BRAND.tagline}</p>
                    <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight mt-2">ซ่อมเก้าอี้นวดไฟฟ้า — ถึงบ้าน รวดเร็ว โปร่งใส</h1>
                    <p className="text-gray-700 mt-3 max-w-2xl mx-auto">ตรวจเช็กอาการฟรีเมื่อซ่อมจริง อะไหล่แท้ รับประกันงานซ่อม 90 วัน</p>
                    <div className="mt-4 flex flex-wrap gap-3 justify-center">
                      <a href="#pricing" className="px-5 py-2.5 rounded-full text-white inline-flex items-center gap-2" style={{ background: ACCENT }}>
                        ดูแพ็กเกจ/ค่าแรง <ChevronRight className="w-4 h-4" />
                      </a>
                      <a href="#portfolio" className="px-5 py-2.5 rounded-full border border-sky-200 hover:bg-sky-50 inline-flex items-center gap-2">
                        ดูผลงานซ่อมจริง <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-4">
              {["อะไหล่แท้มีรับประกัน", "แจ้งราคา-ยินยอมก่อนเริ่ม", "ออกใบเสร็จ/เอกสารบริษัท"].map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05 * i }} className="rounded-3xl overflow-hidden border border-sky-200 bg-white p-5 hover:shadow-[0_30px_100px_-25px_rgba(0,0,0,0.35)]">
                  <div className="flex items-center gap-3">
                    <BadgeCheck className="w-6 h-6 text-[color:var(--accent)]" />
                    <div className="font-medium">{t}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-12 border-y border-sky-200 bg-sky-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">บริการของเรา</h2>
          <p className="text-gray-600">ซ่อมครบ จบทุกอาการ สำหรับเก้าอี้นวดทุกรุ่น แบรนด์ชั้นนำ</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
            {SERVICES.map((s, i) => (
              <a key={i} href="#pricing" className="group rounded-2xl bg-white border border-sky-200 p-4 text-center hover:border-[color:var(--accent)] transition">
                <s.icon className="w-6 h-6 mx-auto mb-2 text-gray-700 group-hover:text-[color:var(--accent)]" />
                <div className="text-sm font-medium">{s.title}</div>
                <div className="text-[11px] text-gray-500 mt-1">{s.points.join(" • ")}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section id="portfolio" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">ผลงานซ่อมล่าสุด</h2>
              <p className="text-gray-600">ตัวอย่างงานจริง ก่อน–หลังซ่อม พร้อมรายละเอียดอาการ</p>
            </div>
            <a href="#contact" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium hover:text-[color:var(--accent)]">
              ขอให้ประเมินอาการ <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CASES.map((item, i) => (
              <CaseCard key={i} item={item} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section id="reviews" className="py-12 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">รีวิวลูกค้า</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="rounded-2xl border border-sky-200 bg-white p-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[color:var(--accent)]" />
                  <div className="font-semibold">{r.name}</div>
                </div>
                <p className="text-sm text-gray-700 mt-2">“{r.text}”</p>
                <div className="mt-3"><Rating value={r.stars} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">ราคา & การนัดหมาย</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="rounded-2xl border border-sky-200 bg-white p-6">
              <div className="text-xs inline-flex px-2 py-1 rounded-full" style={{ background: `${ACCENT}10`, color: ACCENT }}>ยอดนิยม</div>
              <h3 className="mt-2 font-semibold">ตรวจเช็กหน้างาน</h3>
              <div className="text-3xl font-bold mt-1">฿0–300</div>
              <p className="text-sm text-gray-600">ยกเว้นค่าตรวจเมื่อซ่อมจริง</p>
              <ul className="mt-3 text-sm text-gray-600 space-y-1">
                <li className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> ตรวจทุกระบบ</li>
                <li className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> แจ้งสาเหตุ + ใบเสนอราคา</li>
                <li className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> ซ่อมได้ทันทีถ้ามีอะไหล่</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-sky-200 bg-white p-6 ring-2" style={{ ringColor: ACCENT }}>
              <div className="text-xs inline-flex px-2 py-1 rounded-full" style={{ background: `${ACCENT}10`, color: ACCENT }}>คุ้มค่า</div>
              <h3 className="mt-2 font-semibold">ซ่อมมาตรฐาน</h3>
              <div className="text-3xl font-bold mt-1">฿1,200–3,500</div>
              <p className="text-sm text-gray-600">ขึ้นกับอาการ/รุ่น</p>
              <ul className="mt-3 text-sm text-gray-600 space-y-1">
                <li className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> อะไหล่แท้ + รับประกัน 90 วัน</li>
                <li className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> ทดสอบก่อนส่งมอบ</li>
                <li className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> ออกใบเสร็จ/เอกสารบริษัท</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-sky-200 bg-white p-6">
              <div className="text-xs inline-flex px-2 py-1 rounded-full" style={{ background: `${ACCENT}10`, color: ACCENT }}>พรีเมียม</div>
              <h3 className="mt-2 font-semibold">รีเฟอร์บิชครบชุด</h3>
              <div className="text-3xl font-bold mt-1">เริ่ม ฿5,900</div>
              <p className="text-sm text-gray-600">ยกเครื่อง เปลี่ยนบุผิว/ถุงลม/ตั้งค่า</p>
              <ul className="mt-3 text-sm text-gray-600 space-y-1">
                <li className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> รับประกัน 180 วัน</li>
                <li className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> รับ–ส่ง เครื่องใหญ่</li>
                <li className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> บริการเร่งด่วน (+ค่าใช้จ่าย)</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-sky-200 bg-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2"><Wallet className="w-5 h-5 text-[color:var(--accent)]" /><div className="text-sm text-gray-700">ชำระเงินสด โอน หรือออกบิลบริษัทได้</div></div>
            <div className="flex gap-3">
              <a href="#contact" className="px-5 py-2.5 rounded-full text-white inline-flex items-center gap-2" style={{ background: ACCENT }}>
                นัดช่าง/สอบถามอาการ <ChevronRight className="w-4 h-4" />
              </a>
              <a href={LINE_URL} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-full border border-sky-200 inline-flex items-center gap-2">
                LINE {CONTACT.lineId} <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AREAS ===== */}
      <section id="areas" className="py-12 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">เขตให้บริการ</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {CITY_SERVICE.map((a, i) => (
              <div key={i} className="rounded-2xl border border-sky-200 bg-white p-6">
                <MapPin className="w-6 h-6 text-[color:var(--accent)]" />
                <div className="mt-2 font-medium">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">คำถามที่พบบ่อย</h2>
          <div className="mt-6 space-y-3">
            {[
              { q: "มีค่าเช็กอาการไหม?", a: "มีค่าตรวจเช็กเล็กน้อยในบางพื้นที่ และฟรีเมื่อซ่อมจริง" },
              { q: "ใช้เวลาซ่อมนานแค่ไหน?", a: "งานทั่วไป 30–90 นาที ถ้าต้องเปลี่ยนอะไหล่เฉพาะรุ่นอาจนัดรอบ 2" },
              { q: "รับประกันยังไง?", a: "รับประกันงานซ่อม/อะไหล่ 90–180 วันตามแพ็กเกจ" },
            ].map((f, i) => (
              <details key={i} className="rounded-xl border border-sky-200 bg-white p-4 open:shadow">
                <summary className="font-medium cursor-pointer flex items-center gap-2"><Info className="w-5 h-5 text-[color:var(--accent)]" /> {f.q}</summary>
                <p className="text-sm text-gray-700 mt-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-12 border-t border-sky-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-sky-200 bg-white p-6">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">นัดหมาย/ขอใบเสนอราคา</h2>
            <p className="text-gray-600">ส่งรูป/วิดีโออาการ + รุ่นบนสติ๊กเกอร์หลังเครื่อง จะช่วยประเมินได้แม่นยำ</p>
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              <a href={TEL_URL} className="rounded-xl border border-sky-200 px-4 py-3 inline-flex items-center gap-2 hover:bg-sky-50"><PhoneCall className="w-5 h-5" /> {CONTACT.phonePretty}</a>
              <a href={LINE_URL} target="_blank" rel="noreferrer" className="rounded-xl border border-sky-200 px-4 py-3 inline-flex items-center gap-2 hover:bg-sky-50"><MessageSquare className="w-5 h-5" /> LINE: {CONTACT.lineId}</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="rounded-xl border border-sky-200 px-4 py-3 inline-flex items-center gap-2 hover:bg-sky-50"><MessageSquare className="w-5 h-5" /> WhatsApp/Chat</a>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 grid sm:grid-cols-2 gap-3">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-4 py-3 rounded-xl border border-sky-200" placeholder="ชื่อ-นามสกุล" required />
              <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="px-4 py-3 rounded-xl border border-sky-200" placeholder="เบอร์โทร/ไลน์" required />
              <input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className="px-4 py-3 rounded-xl border border-sky-200 sm:col-span-2" placeholder="ยี่ห้อ/รุ่น (ถ้ามี)" />
              <textarea value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} className="px-4 py-3 rounded-xl border border-sky-200 sm:col-span-2" placeholder="รายละเอียดอาการ" required></textarea>
              <button type="submit" disabled={!canSubmit} className="px-5 py-3 rounded-full text-white w-fit disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: ACCENT }}>
                ส่งข้อมูล
              </button>
              {sent && <p className="text-emerald-600 text-sm">เปิดแอปอีเมลเพื่อส่งเรียบร้อย — ขอบคุณครับ/ค่ะ</p>}
            </form>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-sky-200 bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Brand />
              <p className="text-sm text-gray-600 mt-3">ซ่อมเก้าอี้นวดไฟฟ้าโดยช่างมืออาชีพ — โปร่งใส ปลอดภัย มีรับประกัน</p>
            </div>
            {["บริการ", "ลูกค้าองค์กร", "ติดต่อ"].map((title, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-3">{title}</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {title === "บริการ" && ["ซ่อมถึงบ้าน", "รับ-ส่งเครื่องใหญ่", "สัญญาบริการองค์กร"].map((it) => (
                    <li key={it}><a href="#services" className="hover:text-[color:var(--accent)]">{it}</a></li>
                  ))}
                  {title === "ลูกค้าองค์กร" && ["ออกบิล/หักณที่จ่าย", "สัญญาบริการรายปี", "ดูแลหลายสาขา"].map((it) => (
                    <li key={it}><a href="#pricing" className="hover:text-[color:var(--accent)]">{it}</a></li>
                  ))}
                  {title === "ติดต่อ" && [
                    `โทร ${CONTACT.phonePretty}`,
                    `LINE: ${CONTACT.lineId}`,
                    `อีเมล ${CONTACT.email}`,
                  ].map((it) => (
                    <li key={it}><a href="#contact" className="hover:text-[color:var(--accent)]">{it}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <div>© {new Date().getFullYear()} {BRAND.name}. สงวนลิขสิทธิ์.</div>
            <div className="flex items-center gap-4">
              <a href="#">นโยบายความเป็นส่วนตัว</a>
              <a href="#">เงื่อนไขการให้บริการ</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== Sticky CTA (mobile) ===== */}
      <div className={`lg:hidden fixed bottom-3 inset-x-3 transition ${showBar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"}`}>
        <div className="rounded-2xl border border-sky-200 bg-white shadow-lg p-3 flex items-center justify-between gap-3">
          <div className="text-sm">
            <div className="font-medium">นัดช่าง/ปรึกษาอาการ</div>
            <div className="text-gray-600">ตอบไว ภายในเวลาเปิดทำการ</div>
          </div>
          <div className="flex gap-2">
            <a href={LINE_URL} className="px-4 py-2 rounded-full border border-sky-200 inline-flex items-center gap-2"><MessageSquare className="w-4 h-4" /> LINE</a>
            <a href={TEL_URL} className="px-4 py-2 rounded-full text-white inline-flex items-center gap-2" style={{ background: ACCENT }}><PhoneCall className="w-4 h-4" /> โทร</a>
          </div>
        </div>
      </div>
    </div>
  );
}
