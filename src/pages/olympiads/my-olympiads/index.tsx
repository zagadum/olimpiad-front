import React, { useMemo } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { getMyOlympiads, getOlympiadRatingTop } from "@/entities/olympiads";
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

  const doneOlympiads = useMemo(
    () =>
      (data ?? []).filter(
        (o) =>
          o.is_done === 1 &&
          (o.is_public_result === 1 || o.is_show_result === 1),
      ),
    [data],
  );

  const ratingQueries = useQueries({
    queries: doneOlympiads.map((o) => ({
      queryKey: ["olympiad-rating", o.id],
      queryFn: () => getOlympiadRatingTop(String(o.id)),
      enabled: true,
      staleTime: 5 * 60 * 1000,
    })),
  });

  const enrichedData = useMemo(() => {
    if (!data) return undefined;

    const ratingMap = new Map<
      number,
      { rank: number; score: number; medal: string }
    >();

    doneOlympiads.forEach((o, idx) => {
      const result = ratingQueries[idx];
      if (result?.data?.data?.rating) {
        const practicantId = o.subscribe?.practicant_id;
        const myEntry = result.data.data.rating.find(
          (r) => r.participantId === practicantId,
        );
        if (myEntry) {
          ratingMap.set(o.id, {
            rank: myEntry.rank,
            score: myEntry.score,
            medal: myEntry.medal,
          });
        }
      }
    });

    return data.map((o) => {
      const rating = ratingMap.get(o.id);
      if (rating) {
        return {
          ...o,
          user_rank: rating.rank,
          user_score: rating.score,
          user_medal: rating.medal,
        };
      }
      return o;
    });
  }, [data, doneOlympiads, ratingQueries]);

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
    } else if (enrichedData?.length) {
      return enrichedData.map((olympiad) => (
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
