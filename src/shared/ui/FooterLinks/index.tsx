import React from "react";
import { useLanguage } from "@/widgets/olympiads-card/hooks";

export const FooterLinks: React.FC = () => {
  const lang = useLanguage();

  const regulaminHref =
    lang === "uk"
      ? "/docs/Regulamin-Olimpiady-2026_ua.html"
      : "/docs/Regulamin-Olimpiady-2026.html";

  return (
    <>
      <footer
        className="w-full flex flex-wrap gap-4 justify-start items-center py-6 text-sm pl-[0px]"
        style={{ color: "#FFFFFF" }}
      >
        <a
          href={regulaminHref}
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Regulamin
        </a>
        <a
          href="/docs/Klauzula_RODO.html"
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Klauzula RODO
        </a>
        <a
          href="/docs/Polityka_Prywatności.html"
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Polityka prywatności
        </a>
        <a
          href="/docs/Ochrona_Małoletnich.html"
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ochrona Małoletnich
        </a>
        <a
          href="/docs/ODSTĄPIENIA-OD-UMOWY.html"
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Oświadczenie o odstąpieniu
        </a>
        <a
          href="/docs/Regulamin_Serwisu.html"
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Regulamin Serwisu
        </a>
      </footer>
      <style>{`
        .footer-link {
          color: #FFFFFF;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: #26F9FF;
        }
      `}</style>
    </>
  );
};
