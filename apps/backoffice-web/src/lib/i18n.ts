import { cookies } from "next/headers";

export const supportedLanguages = ["th", "en"] as const;
export type Language = (typeof supportedLanguages)[number];

export const languageCookieName = "pos_lang";

export function isLanguage(value: string | undefined | null): value is Language {
  return Boolean(value && supportedLanguages.includes(value as Language));
}

export async function getCurrentLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  const value = cookieStore.get(languageCookieName)?.value;
  return isLanguage(value) ? value : "th";
}

const dict = {
  en: {
    common_settings: "Settings",
    language: "Language",
    thai: "Thai",
    english: "English",
    backoffice_title: "Back Office",
    it_admin_title: "IT Admin Portal",
    dashboard: "Dashboard",
    orders: "Orders",
    stock: "Stock",
    staff: "Staff",
    sales_report: "Sales Report",
    stock_report: "Stock Report",
    audit_report: "Audit Report",
    manual_delivery: "Manual Delivery",
    shifts: "Shifts",
    promotions: "Promotions",
    tables: "Dine-In Tables",
    tenants: "Tenants",
    packages: "Packages",
    platform_users: "Platform Users",
    monitoring: "DB Monitoring",
    language_settings_title: "Language Settings",
    language_settings_desc: "Select your preferred language for this interface.",
    pos_preview_title: "POS Android UI Preview (Web)",
    pos_preview_desc: "Tablet landscape preview with touch-first layout and manual delivery flow.",
    home_title: "POS Platform Workspace",
    home_desc: "Next.js 16 workspace for Back Office, IT Admin, API contracts, and POS preview screens.",
    it_admin_overview: "Platform Summary",
    pending_delivery: "Pending Delivery",
    today_sales: "Today Sales",
    open_shift: "Open Shift",
    low_stock: "Low Stock Items",
    status_waiting: "Pending",
    status_preparing: "Preparing",
    status_done: "Completed",
    status_cancelled: "Cancelled"
  },
  th: {
    common_settings: "ตั้งค่า",
    language: "ภาษา",
    thai: "ไทย",
    english: "อังกฤษ",
    backoffice_title: "ระบบหลังบ้าน",
    it_admin_title: "IT Admin",
    dashboard: "แดชบอร์ด",
    orders: "บิลขาย",
    stock: "สต๊อก",
    staff: "พนักงาน",
    sales_report: "รายงานยอดขาย",
    stock_report: "รายงานสต๊อก",
    audit_report: "รายงาน Audit",
    manual_delivery: "ช่องทางเดลิเวอรี",
    shifts: "กะการขาย",
    promotions: "โปรโมชัน",
    tables: "โต๊ะหน้าร้าน",
    tenants: "ร้านค้า",
    packages: "แพ็กเกจ",
    platform_users: "ผู้ใช้ระบบกลาง",
    monitoring: "สถานะฐานข้อมูล",
    language_settings_title: "ตั้งค่าภาษา",
    language_settings_desc: "เลือกภาษาที่ต้องการใช้งานในหน้าจอนี้",
    pos_preview_title: "ตัวอย่างหน้าขาย POS Android (Web)",
    pos_preview_desc: "พรีวิวหน้าจอแท็บเล็ตแนวนอน เน้นปุ่มใหญ่และ workflow เดลิเวอรีแบบ manual",
    home_title: "POS Platform Workspace",
    home_desc: "พื้นที่ทำงาน Next.js 16 สำหรับ Back Office, IT Admin, API contracts และ POS preview",
    it_admin_overview: "ภาพรวมแพลตฟอร์ม",
    pending_delivery: "ออเดอร์เดลิเวอรีค้างทำ",
    today_sales: "ยอดขายวันนี้",
    open_shift: "กะที่เปิดอยู่",
    low_stock: "วัตถุดิบใกล้หมด",
    status_waiting: "รอทำ",
    status_preparing: "กำลังทำ",
    status_done: "เสร็จแล้ว",
    status_cancelled: "ยกเลิก"
  }
} as const;

export type TranslationKey = keyof (typeof dict)["th"];

export function t(lang: Language, key: TranslationKey): string {
  return dict[lang][key] ?? dict.th[key];
}