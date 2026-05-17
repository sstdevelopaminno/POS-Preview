import Link from "next/link";

export default function QrLoginHomePage() {
  return (
    <main
      style={{
        maxWidth: 780,
        margin: "40px auto",
        padding: 20,
        background: "#fff",
        borderRadius: 12,
        border: "1px solid #ddd"
      }}
    >
      <h1>QR Login Web</h1>
      <p>ใช้สำหรับสแกน QR จาก POS Android และยืนยัน PIN ของผู้ใช้</p>
      <Link
        href="/scan"
        style={{
          display: "inline-flex",
          alignItems: "center",
          minHeight: 44,
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #ddd"
        }}
      >
        Open Scanner Preview
      </Link>
    </main>
  );
}
