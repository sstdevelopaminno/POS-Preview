"use client";

import { useState } from "react";
type Language = "th" | "en";

const channelsByLanguage = {
  th: ["หน้าร้าน", "กลับบ้าน", "Grab", "LINE MAN", "Shopee", "Merchant App", "อื่นๆ"],
  en: ["Storefront", "Takeaway", "Grab", "LINE MAN", "Shopee", "Merchant App", "Other"]
} as const;

const productsByLanguage = {
  th: ["ก๋วยเตี๋ยวน้ำใส", "ก๋วยเตี๋ยวต้มยำ", "บะหมี่แห้งลูกชิ้น", "ชุดคอมโบเส้น+เกี๊ยว", "น้ำเก๊กฮวย"],
  en: ["Clear Soup Noodle", "Tom Yum Noodle", "Dry Egg Noodle + Meatball", "Noodle Combo Set", "Chrysanthemum Drink"]
} as const;

const categoryLabels = {
  th: ["เส้น", "ทานเล่น", "เครื่องดื่ม", "คอมโบ"],
  en: ["Noodles", "Snacks", "Drinks", "Combo"]
} as const;

const statusLabels = {
  th: ["รอทำ", "กำลังทำ", "เสร็จแล้ว", "ยกเลิก"],
  en: ["Waiting", "Preparing", "Done", "Cancelled"]
} as const;

export function PosPreviewBoard({ lang }: { lang: Language }) {
  const channels = channelsByLanguage[lang];
  const products = productsByLanguage[lang];
  const categories = categoryLabels[lang];
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  return (
    <div className="surface" style={{ padding: 0, overflow: "hidden" }}>
      <div className="pos-preview-layout">
        <section style={{ padding: 16, borderRight: "1px solid var(--border)" }}>
          <h3>{lang === "th" ? "หมวดหมู่ / สินค้า" : "Category / Products"}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {categories.map((category) => (
              <button
                key={category}
                className="tap-target"
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
                className="tap-target"
                style={{
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: "#fff",
                  minHeight: 84,
                  fontWeight: 700,
                  padding: "10px 8px"
                }}
              >
                {name}
              </button>
            ))}
          </div>
        </section>

        <section data-cart-sidebar style={{ padding: 16, background: "#fffcf8" }}>
          <h3>{lang === "th" ? "ตะกร้า / ชำระเงิน" : "Cart / Payment"}</h3>
          <p style={{ color: "var(--muted)" }}>Shift: OPEN-20260517-01 | Table A01</p>
          <div style={{ border: "1px dashed var(--border)", borderRadius: 12, padding: 12, marginBottom: 12 }}>
            <p>{lang === "th" ? "1 x ก๋วยเตี๋ยวน้ำใส = THB 65" : "1 x Clear Soup Noodle = THB 65"}</p>
            <p>{lang === "th" ? "1 x น้ำเก๊กฮวย = THB 25" : "1 x Chrysanthemum Drink = THB 25"}</p>
            <p>{lang === "th" ? "ส่วนลด: THB 10" : "Discount: THB 10"}</p>
            <p style={{ fontWeight: 700 }}>{lang === "th" ? "รวมสุทธิ: THB 80" : "Net Total: THB 80"}</p>
          </div>

          <h4>{lang === "th" ? "ช่องทางขาย (Manual Delivery)" : "Sales Channel (Manual Delivery)"}</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            {channels.map((channel) => (
              <button
                key={channel}
                className="tap-target"
                style={{
                  borderRadius: 999,
                  border: "1px solid var(--border)",
                  padding: "10px 12px",
                  background: channel === "Grab" ? "#ffe8db" : "#fff"
                }}
              >
                {channel}
              </button>
            ))}
          </div>

          <div className="pos-preview-stack">
            <input
              className="tap-target"
              placeholder={lang === "th" ? "Order Code จากแอป" : "External Order Code"}
              style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)" }}
            />
            <input
              className="tap-target"
              placeholder={lang === "th" ? "ชื่อลูกค้า / หมายเหตุ" : "Customer Name / Notes"}
              style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)" }}
            />
            <input
              className="tap-target"
              placeholder={lang === "th" ? "ยอดขายตามแอป" : "App Total Amount"}
              style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)" }}
            />
            <input
              className="tap-target"
              placeholder={lang === "th" ? "ส่วนลด / GP" : "Discount / GP"}
              style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)" }}
            />
            <select className="tap-target" style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)" }}>
              {statusLabels[lang].map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>

          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <button className="tap-target" style={{ borderRadius: 10, padding: 12, border: "none", background: "#363633", color: "#fff", fontWeight: 700 }}>
              {lang === "th" ? "ชำระเงินสด" : "Cash Payment"}
            </button>
            <button className="tap-target" style={{ borderRadius: 10, padding: 12, border: "none", background: "var(--accent)", color: "#fff", fontWeight: 700 }}>
              {lang === "th" ? "เงินโอน" : "Bank Transfer"}
            </button>
          </div>

          <button
            type="button"
            data-pin-open
            className="tap-target"
            onClick={() => setIsPinModalOpen(true)}
            style={{
              marginTop: 10,
              borderRadius: 10,
              padding: "10px 12px",
              border: "1px solid var(--border)",
              background: "#fff"
            }}
          >
            {lang === "th" ? "ตัวอย่าง PIN อนุมัติผู้จัดการ" : "Preview Manager PIN Approval"}
          </button>

          <p style={{ marginTop: 10, color: "#a05e42" }}>
            {lang === "th" ? "Offline Queue: พร้อมใช้งานเมื่ออินเทอร์เน็ตหลุด" : "Offline Queue: ready when internet drops"}
          </p>
        </section>
      </div>

      {isPinModalOpen ? (
        <div className="dialog-overlay" role="dialog" data-pin-approval-modal aria-label="PIN Approval">
          <div className="dialog-card">
            <h4 style={{ marginTop: 0 }}>{lang === "th" ? "อนุมัติด้วย PIN ผู้จัดการ" : "Manager PIN Approval"}</h4>
            <p style={{ color: "var(--muted)" }}>
              {lang === "th"
                ? "ใช้สำหรับยกเลิกบิล ปรับสต๊อก หรือปิดกะยอดไม่ตรง"
                : "Required for bill cancellation, stock adjustment, or mismatch shift close."}
            </p>
            <div className="pos-preview-stack">
              <input
                className="tap-target"
                placeholder={lang === "th" ? "รหัสพนักงานผู้อนุมัติ" : "Approver Staff ID"}
                style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)" }}
              />
              <input
                className="tap-target"
                placeholder="PIN"
                type="password"
                style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)" }}
              />
            </div>
            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <button
                type="button"
                className="tap-target"
                onClick={() => setIsPinModalOpen(false)}
                style={{ borderRadius: 10, border: "1px solid var(--border)", background: "#fff" }}
              >
                {lang === "th" ? "ยกเลิก" : "Cancel"}
              </button>
              <button
                type="button"
                className="tap-target"
                onClick={() => setIsPinModalOpen(false)}
                style={{ borderRadius: 10, border: "none", background: "var(--accent)", color: "#fff", fontWeight: 700 }}
              >
                {lang === "th" ? "อนุมัติ" : "Approve"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
