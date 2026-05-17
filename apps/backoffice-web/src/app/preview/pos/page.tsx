import Link from "next/link";
import { LanguageSwitcher } from "@/components/language/language-switcher";
import { PosPreviewBoard } from "@/components/pos-preview/pos-preview-board";
import { getCurrentLanguage, t } from "@/lib/i18n";

export default async function PosPreviewPage() {
  const lang = await getCurrentLanguage();

  return (
    <main className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <h1>{t(lang, "pos_preview_title")}</h1>
        <LanguageSwitcher
          currentLanguage={lang}
          label={t(lang, "language")}
          thaiLabel={t(lang, "thai")}
          englishLabel={t(lang, "english")}
        />
      </div>
      <p>{t(lang, "pos_preview_desc")}</p>
      <p>
        <Link
          href="/preview/pos/settings"
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: 44,
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "#fff"
          }}
        >
          {t(lang, "common_settings")}
        </Link>
      </p>
      <PosPreviewBoard lang={lang} />
    </main>
  );
}

