import Link from "next/link";
import { getCurrentLanguage, t } from "@/lib/i18n";

const links = [
  { href: "/dashboard", labelKey: "dashboard" },
  { href: "/it-admin", labelKey: "it_admin_title" },
  { href: "/preview/pos", labelKey: "pos_preview_title" },
  { href: "/api/contracts", label: "API Contract JSON" }
] as const;

export default async function HomePage() {
  const lang = await getCurrentLanguage();

  return (
    <main className="page">
      <h1>{t(lang, "home_title")}</h1>
      <p>{t(lang, "home_desc")}</p>
      <div className="surface">
        <ul>
          {links.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{"labelKey" in item ? t(lang, item.labelKey) : item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

