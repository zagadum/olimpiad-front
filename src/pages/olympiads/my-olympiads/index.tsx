import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyOlympiads } from "@/entities/olympiads";
import { OlympiadsCard } from "@/widgets/olympiads-card";
import { useNavigate } from "react-router-dom";
import certificateBg from "@/shared/assets/images/certificate-bg.png";
import { useDimensions } from "@/shared/hooks";
import { useTranslation } from "react-i18next";

export const MyOlympiadsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isMobile, isTablet } = useDimensions();

  const { data, isLoading, error } = useQuery({
    queryKey: ["my-olympiads"],
    queryFn: getMyOlympiads,
    select: (value) => value.data_list,
  });

  const onOlympiadsCardClick = (id: number) => {
    navigate(`/olympiads/${id}`);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-[50vh] w-full items-center justify-center">
          <p>{t("global.loading")}</p>
        </div>
      );
    } else if (error) {
      return (
        <div className="flex h-[50vh] w-full items-center justify-center">
          <p>{t("global.fetchError")}</p>
        </div>
      );
    } else if (data?.length) {
      return data.map((olympiad) => (
        <OlympiadsCard
          key={olympiad.id}
          olympiad={olympiad}
          onCardClick={onOlympiadsCardClick}
        />
      ));
    } else {
      return (
        <div className="flex h-[50vh] w-full items-center justify-center">
          <p>{t("myOlympiads.empty")}</p>
        </div>
      );
    }
  };

  return (
    <>
      {!isMobile && !isTablet && (
        <img
          src={certificateBg}
          alt=""
          className="pointer-events-none fixed -top-10 right-12 z-[-1] w-[388px] rotate-[-15deg] opacity-30"
        />
      )}
      <div className="space-y-8">{renderContent()}</div>
    </>
  );
};
