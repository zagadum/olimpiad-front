import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOlympiadDetail } from "@/entities/olympiads";
import { Button } from "@/shared/ui/button";
import { getLang } from "@/shared/lib/getLang.ts";
import { useTranslation } from "react-i18next";
import "./style.css";

export const OverviewPage: React.FC = () => {
  const lang = getLang();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { olympiadId } = useParams<{ olympiadId: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["olympiad", olympiadId],
    queryFn: () => getOlympiadDetail(olympiadId!),
    select: (value) => value.data_list[0],
    enabled: !!olympiadId,
  });

  const goToRegister = () => {
    navigate(`/olympiads/${olympiadId}/register`);
  };

  const goToTraining = () => {
    navigate(`/olympiads/${olympiadId}/training`);
  };

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка завантаження даних</div>;

  return (
    <div className="olympiad-overview mt-8 rounded-3xl bg-gradient-to-t from-[#082536] to-[#193C4D] p-9 shadow-[-1px_-1px_1px_-0px_#657E8A]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="mb-4 text-3xl font-bold">
          {t("olympiadOverview.title")}
        </h2>
        <div className="mb-4 flex space-x-8">
          {(!data?.payment_status || data?.payment_status === "none") && (
            <Button onClick={goToRegister}>
              {t("olympiadOverview.participate")}
            </Button>
          )}
          {data?.payment_status !== "ok" && (
            <>
              <Button variant="secondary" onClick={goToTraining}>
                {t("olympiadOverview.startTraining")}
              </Button>
              <Button>{t("olympiadOverview.start")}</Button>
            </>
          )}
        </div>
      </div>
      <div
        className="full-description rounded-3xl bg-[--color-5] p-4 text-xl font-light text-[#A5A5A5]"
        dangerouslySetInnerHTML={{
          // __html: data?.full_description[lang] ?? "",
          __html: getMockText(lang) ?? "",
        }}
      ></div>
    </div>
  );
};

const getMockText = (lang: string) =>
  lang
    ? `
<h3>Тренировка</h3>
<p>После регистриции на платформе Олимпиады, вы можете тренироваться 7 раз в день.</p>
<p>Доступ открыт с 25.04.2025 - 05.05.2025г.</p>
<br/>
<h3>Прохождение олимпиады</h3>
<p>Пройти Олимпиаду вы можете только один раз, нажав кнопку «Начать Олимпиаду».</p>
<p>Доступ открыт с 01.05.2025 - 05.05.2025г.</p>
<br/>
<h3>Олимпиаду можно пройти используя:</h3>
<ul>
<li>Компьютер</li>
<li>Ноутбук</li>
<li>Планшет</li>
</ul>
<br/>
<h5>Запрещено проходить олимпиаду на телефоне!</h5>
<br/>
<h3>Во время прохождения онлайн олимпиады обязательно делать видеозапись!</h3> 
<p>На видео должен быть четко виден ребенок, экран, и четко зафиксирован результат прохождения олимпиады. Видео должно быть со звуком и без монтажа, сниматься непрерывно от начала и до конца олимпиады. Участник должен быть без наушников!</p>  
`
    : "";
