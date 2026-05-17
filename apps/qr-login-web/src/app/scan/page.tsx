export default function ScanPage() {
  return (
    <main
      style={{
        maxWidth: 760,
        margin: "40px auto",
        padding: 20,
        background: "#fff",
        borderRadius: 12,
        border: "1px solid #ddd"
      }}
    >
      <h2>Scan QR Login</h2>
      <p>1. เปิดกล้องสแกน QR session จาก POS</p>
      <p>2. ยืนยัน PIN ของพนักงาน</p>
      <p>3. คืน auth token กลับ Android app</p>
      <input
        placeholder="Session Token"
        style={{ width: "100%", minHeight: 44, padding: "10px 12px", marginBottom: 8, borderRadius: 8, border: "1px solid #ccc" }}
      />
      <input
        placeholder="PIN"
        style={{ width: "100%", minHeight: 44, padding: "10px 12px", borderRadius: 8, border: "1px solid #ccc" }}
      />
      <button
        style={{ marginTop: 10, minHeight: 44, padding: "10px 14px", borderRadius: 10, border: "1px solid #ccc", background: "#fff" }}
      >
        Verify Login
      </button>
    </main>
  );
}
