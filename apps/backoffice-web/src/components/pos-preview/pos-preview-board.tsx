import type { Language } from "@/lib/i18n";
import { t } from "@/lib/i18n";

const channelsByLanguage = {
  th: ["หน้าร้าน", "กลับบ้าน", "Grab", "LINE MAN", "Shopee", "Merchant App", "อื่นๆ"],
  en: ["Storefront", "Takeaway", "Grab", "LINE MAN", "Shopee", "Merchant App", "Other"]
} as const;

const productsByLanguage = {
  th: ["ก๋วยเตี๋ยวหมูน้ำใส", "ก๋วยเตี๋ยวต้มยำ", "บะหมี่แห้งลูกชิ้น", "ชุดคอมโบเส้น+เกี๊ยว", "น้ำเก๊กฮวย"],
  en: ["Clear Soup Noodle", "Tom Yum Noodle", "Dry Egg Noodle + Meatball", "Noodle Combo Set", "Chrysanthemum Drink"]
} as const;

export function PosPreviewBoard({ lang }: { lang: Language }) {
  const channels = channelsByLanguage[lang];
  const products = productsByLanguage[lang];

  return (
    <div
      className="surface"
      style={{
        padding: 0,
        overflow: "hidden"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          minHeight: 520
        }}
      >
        <section style={{ padding: 16, borderRight: "1px solid var(--border)" }}>
          <h3>{lang === "th" ? "หมวดหมู่ / สินค้า" : "Category / Products"}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {(lang === "th" ? ["เส้น", "ทานเล่น", "เครื่องดื่ม", "คอมโบ"] : ["Noodles", "Snacks", "Drinks", "Combo"]).map((category) => (
              <button
                key={category}
                style={{
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  background: "#fff",
                  padding: "10px 14px",
                  fontWeight: 600
                }}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid cols-3">
            {products.map((name) => (
              <button
                key={name}
                style={{
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: "#fff",
                  minHeight: 80,
                  fontWeight: 700
                }}
              >
                {name}
              </button>
            ))}
          </div>
        </section>

        <section style={{ padding: 16, background: "#fffcf8" }}>
          <h3>{lang === "th" ? "ตะกร้า / ชำระเงิน" : "Cart / Payment"}</h3>
          <p style={{ color: "var(--muted)" }}>Shift: OPEN-20260517-01 | Table A01</p>
          <div style={{ border: "1px dashed var(--border)", borderRadius: 12, padding: 12, marginBottom: 12 }}>
            <p>{lang === "th" ? "1 x ก๋วยเตี๋ยวหมูน้ำใส = THB 65" : "1 x Clear Soup Noodle = THB 65"}</p>
            <p>{lang === "th" ? "1 x น้ำเก๊กฮวย = THB 25" : "1 x Chrysanthemum Drink = THB 25"}</p>
            <p>{lang === "th" ? "ส่วนลด: THB 10" : "Discount: THB 10"}</p>
            <p style={{ fontWeight: 700 }}>{lang === "th" ? "รวมสุทธิ: THB 80" : "Net Total: THB 80"}</p>
          </div>

          <h4>{lang === "th" ? "ช่องทางขาย (Manual Delivery)" : "Sales Channel (Manual Delivery)"}</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            {channels.map((channel) => (
              <button
                key={channel}
                style={{
                  borderRadius: 999,
                  border: "1px solid var(--border)",
                  padding: "8px 12px",
                  background: channel === "Grab" ? "#ffe8db" : "#fff"
                }}
              >
                {channel}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            <input placeholder={lang === "th" ? "Order Code จากแอป" : "External Order Code"} style={{ padding: 10, borderRadius: 8, border: "1px solid var(--border)" }} />
            <input placeholder={lang === "th" ? "ชื่อลูกค้า / หมายเหตุ" : "Customer Name / Notes"} style={{ padding: 10, borderRadius: 8, border: "1px solid var(--border)" }} />
            <input placeholder={lang === "th" ? "ยอดขายตามแอป" : "App Total Amount"} style={{ padding: 10, borderRadius: 8, border: "1px solid var(--border)" }} />
            <input placeholder={lang === "th" ? "ส่วนลด / GP" : "Discount / GP"} style={{ padding: 10, borderRadius: 8, border: "1px solid var(--border)" }} />
            <select style={{ padding: 10, borderRadius: 8, border: "1px solid var(--border)" }}>
              <option>{t(lang, "status_waiting")}</option>
              <option>{t(lang, "status_preparing")}</option>
              <option>{t(lang, "status_done")}</option>
              <option>{t(lang, "status_cancelled")}</option>
            </select>
          </div>

          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <button style={{ borderRadius: 10, padding: 12, border: "none", background: "#363633", color: "#fff", fontWeight: 700 }}>
              {lang === "th" ? "ชำระเงินสด" : "Cash Payment"}
            </button>
            <button style={{ borderRadius: 10, padding: 12, border: "none", background: "var(--accent)", color: "#fff", fontWeight: 700 }}>
              {lang === "th" ? "เงินโอน" : "Bank Transfer"}
            </button>
          </div>
          <p style={{ marginTop: 10, color: "#a05e42" }}>
            {lang === "th" ? "Offline Queue: พร้อมใช้งานเมื่ออินเทอร์เน็ตหลุด" : "Offline Queue: ready when internet drops"}
          </p>
        </section>
      </div>
    </div>
  );
}

