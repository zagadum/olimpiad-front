import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Select, SelectOption } from "@/shared/ui/select";
import { OlympiadsCard } from "@/widgets/olympiads-card";
import international from "@/shared/assets/icons/international-mini.png";
import ukrainian from "@/shared/assets/icons/ukrainian.svg";
import polish from "@/shared/assets/icons/polish.svg";
import announce from "@/shared/assets/icons/announce.png";
import spacem from "@/shared/assets/icons/space-m.png";
import cupsBg from "@/shared/assets/images/cups-bg.png";
import { useDimensions } from "@/shared/hooks";
import { useOlympiadsQuery } from "@/entities/olympiads/query";
import { useTranslation } from "react-i18next";
import { useCurrentUserQuery } from "@/entities/auth";
import { useLanguage } from "@/widgets/olympiads-card/hooks";

export const AllOlympiadsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const lang = useLanguage();

  const { data: user } = useCurrentUserQuery();

  const { isMobile, isTablet } = useDimensions();

  const [selectedFilter, setSelectedFilter] = useState<string | number>();
  const [isInternational, setIsInternational] = useState<number>();
  const [promotion, setPromotion] = useState<string>();

  const { data: rawData, error } = useOlympiadsQuery({
    lang,
    isInternational,
    promotion,
  });

  const data = useMemo(() => {
    if (!rawData) return rawData;
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    return rawData.filter((o) => {
      if (!o.end_date) return true;
      if (o.status !== "completed") return true;
      const endTime = new Date(o.end_date).getTime();
      return now - endTime <= sevenDays;
    });
  }, [rawData]);

  const handleFilterChange = (value?: string | number) => {
    switch (value) {
      case 0:
      case 1:
        setPromotion(undefined);
        setIsInternational(value);
        setSelectedFilter(value);
        break;
      case "ads":
      case "olympiad":
        setIsInternational(undefined);
        setPromotion(value);
        setSelectedFilter(value);
        break;
      default:
        setIsInternational(undefined);
        setPromotion(undefined);
        setSelectedFilter(undefined);
    }
  };

  const onOlympiadsCardClick = (id: number) => {
    navigate(`/olympiads/${id}`);
  };

  const olympiadTypes: SelectOption[] = [
    {
      id: "0",
      label: t("olympiadTypes.all"),
    },
    {
      id: "1",
      label: t("olympiadTypes.international"),
      icon: international,
      value: 1,
    },
    {
      id: "2",
      label:
        user?.domain === "pl"
          ? t("olympiadTypes.polish")
          : t("olympiadTypes.ukrainian"),
      icon: user?.domain === "pl" ? polish : ukrainian,
      value: 0,
    },
    {
      id: "3",
      label: t("olympiadTypes.ads"),
      icon: announce,
      value: "ads",
    },
    {
      id: "4",
      label: t("olympiadTypes.olympiad"),
      icon: spacem,
      value: "olympiad",
    },
  ];

  if (error) return <div>{t("global.fetchError")}</div>;

  return (
    <>
      {!isMobile && !isTablet && (
        <img
          src={cupsBg}
          alt=""
          className="pointer-events-none fixed -top-10 right-16 z-[-1] w-[388px] rotate-[-15deg] opacity-30"
        />
      )}
      <div className="mb-8 flex items-center justify-between space-y-0">
        <Select
          options={olympiadTypes}
          value={selectedFilter}
          onChange={handleFilterChange}
          placeholder="Оберіть тип"
        />
      </div>
      <div className="space-y-6 pb-20 md:space-y-8 lg:pb-10">
        {data?.length ? (
          data.map((o) => (
            <OlympiadsCard
              key={o.id}
              olympiad={o}
              onCardClick={onOlympiadsCardClick}
              variant="all"
            />
          ))
        ) : (
          <div>{t("allOlympiads.emptyData")}</div>
        )}
      </div>
      {/* Footer links */}
      <footer className="w-full flex flex-wrap gap-4 justify-start items-center py-6 text-sm pl-[0px]" style={{color: '#FFFFFF'}}>
        <a href="/docs/Regulamin-Olimpiady-2026.html" className="footer-link" target="_blank" rel="noopener noreferrer">Regulamin</a>
        <a href="/docs/Klauzula_RODO.html" className="footer-link" target="_blank" rel="noopener noreferrer">Klauzula RODO</a>
        <a href="/docs/Polityka_Prywatności.html" className="footer-link" target="_blank" rel="noopener noreferrer">Polityka prywatności</a>
        <a href="/docs/Ochrona_Małoletnich.html" className="footer-link" target="_blank" rel="noopener noreferrer">Ochrona Małoletnich</a>
        <a href="/docs/ODSTĄPIENIA-OD-UMOWY.html" className="footer-link" target="_blank" rel="noopener noreferrer">Oświadczenie o odstąpieniu</a>
        <a href="/docs/Regulamin_Serwisu.html" className="footer-link" target="_blank" rel="noopener noreferrer">Regulamin Serwisu</a>

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
