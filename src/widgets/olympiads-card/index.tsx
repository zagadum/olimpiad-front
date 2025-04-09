import React from "react";
import { useNavigate } from "react-router-dom";
import {
  // formatDistanceToNow,
  // isAfter,
  isValid,
  format
} from "date-fns";
// import { uk } from 'date-fns/locale/uk'
// import { ru } from "date-fns/locale/ru";
import { Button } from "@/shared/ui/button";
import { Olympiad, OLYMPIAD_TYPES } from "@/entities/olympiads";
import placeholderImg from "@/shared/assets/images/olympiad-placeholder.jpeg";

type OlympiadsCardProps = {
  olympiad: Olympiad;
};

// const calcDays = (date: string) => {
//   const dateNow = Date.now();
//   const parsedDate = Date.parse(date);
//   const isDateValid = isValid(parsedDate);
//   if (isDateValid && isAfter(parsedDate, dateNow)) {
//     return formatDistanceToNow(parsedDate, { locale: ru });
//   }
//   return "";
// };

const formatDate = (date: string) => {
  const parsedDate = Date.parse(date);
  const isDateValid = isValid(parsedDate);
  if (isDateValid) {
    return format(parsedDate, "dd.MM.yyyy");
  }
  return date;
};

export const OlympiadsCard: React.FC<OlympiadsCardProps> = ({ olympiad }) => {
  const navigate = useNavigate();
  const goToRegister = () => navigate(`/olympiads/${olympiad.id}/register`);

  const formattedStartDate = formatDate(olympiad.startDate);
  const formattedEndDate = formatDate(olympiad.endDate ?? "");

  // const startDateDistance = calcDays(olympiad.startDate);
  // const endDateDistance = calcDays(olympiad.endDate ?? "");

  return (
    <div className="flex items-center justify-between gap-8 rounded-3xl bg-gradient-to-t from-[#082536] to-[#193C4D] p-6 shadow-[-1px_-1px_1px_-0px_#657E8A]">
      {/* Зображення */}
      <div className="hidden overflow-hidden rounded-2xl xl:block">
        <img
          className="h-[11.5rem] w-80 object-cover"
          src={olympiad.imageUrl || placeholderImg}
          alt={olympiad.title}
        />
      </div>
      {/* Основна інформація */}
      <div className="h-48 flex-1">
        <div className="mb-2 flex h-full flex-col justify-between">
          <h3 className="line-clamp-2 text-2xl font-bold leading-5 text-[--color-3]">
            {olympiad.title}
          </h3>
          {/* Короткий опис */}
          <p className="mb-2 line-clamp-2 text-xl leading-5 text-[--color-3]">
            {olympiad.description}
          </p>
          {/* Тип олімпіади */}
          <div className="flex gap-3">
            {OLYMPIAD_TYPES.filter((type) =>
              olympiad.type.some((item) => item === type.value),
            ).map(({ label, icon, id }) => (
              <div
                key={id}
                className="flex w-max items-center gap-2 rounded-full bg-[#0C464F] px-4 py-2 text-xs text-white"
              >
                <img
                  src={icon}
                  alt={label}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-nowrap text-xl text-[--color-3]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Правий блок: дата, ціна, кнопки дій */}
      <div className="flex h-48 flex-col items-end justify-between space-y-2">
        {/* Дата (або період проведення) */}
        <div className="text-right">
          <span className="text-xl leading-4 text-[--color-3]">
            {olympiad.endDate
              ? `${formattedStartDate} - ${formattedEndDate}`
              : formattedStartDate}
          </span>
          {/*{olympiad.isPaid && (*/}
          {/*  <div className="mt-3 text-xl leading-4 text-[--color-3] text-nowrap">*/}
          {/*    {startDateDistance && (*/}
          {/*      <>*/}
          {/*        <span>Начало через </span>*/}
          {/*        <span className="text-xl leading-4 text-[#E79600]">*/}
          {/*          {startDateDistance}*/}
          {/*        </span>*/}
          {/*      </>*/}
          {/*    )}*/}
          {/*    {startDateDistance && endDateDistance && " | "}*/}
          {/*    {endDateDistance && (*/}
          {/*      <>*/}
          {/*        <span>Конец через </span>*/}
          {/*        <span className="text-xl leading-4 text-[#E79600]">*/}
          {/*          {endDateDistance}*/}
          {/*        </span>*/}
          {/*      </>*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
        <div className="flex items-center justify-end gap-4 flex-wrap">
          {/* Відображення кнопок дій в залежності від статусу оплати */}
          {olympiad.isPaid ? (
            <>
              <Button variant="secondary">
                Тренироваться ({olympiad.trainingCount || 0})
              </Button>
              <Button onClick={goToRegister}>Начать</Button>
            </>
          ) : (
            <>
              {/* Ціна, якщо вона є */}
              {olympiad.price && (
                <span className="text-nowrap rounded-full border border-[--color-2] px-7 py-5 text-xl leading-4 text-[--color-3]">
                  {olympiad.price} {olympiad.currency ?? "₴"}
                </span>
              )}
              <Button onClick={goToRegister}>Участвовать</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
