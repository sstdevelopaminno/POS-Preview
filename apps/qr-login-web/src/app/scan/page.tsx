export default function ScanPage() {
  return (
    <main style={{ maxWidth: 760, margin: "40px auto", padding: 20, background: "#fff", borderRadius: 12, border: "1px solid #ddd" }}>
      <h2>Scan QR Login</h2>
      <p>1. เปิดกล้องสแกน QR session จาก POS</p>
      <p>2. ยืนยัน PIN ของพนักงาน</p>
      <p>3. คืน auth token กลับ Android app</p>
      <input placeholder="Session Token" style={{ width: "100%", padding: 10, marginBottom: 8 }} />
      <input placeholder="PIN" style={{ width: "100%", padding: 10 }} />
      <button style={{ marginTop: 10, padding: "10px 14px" }}>Verify Login</button>
    </main>
  );
}