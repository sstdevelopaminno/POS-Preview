import Link from "next/link";

export default function QrLoginHomePage() {
  return (
    <main style={{ maxWidth: 780, margin: "40px auto", padding: 20, background: "#fff", borderRadius: 12, border: "1px solid #ddd" }}>
      <h1>QR Login Web</h1>
      <p>ใช้สำหรับสแกน QR จาก POS Android และยืนยัน PIN ผู้ใช้</p>
      <Link href="/scan">Open Scanner Preview</Link>
    </main>
  );
}