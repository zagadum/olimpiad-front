import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn.ts";

type Props = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export const CustomCheckbox: React.FC<Props> = ({
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div
      className={cn(
        "flex h-8 w-8 cursor-pointer items-center justify-center",
        "rounded-xl border border-[--color-1] bg-[--color-5] transition-colors",
        disabled && "cursor-not-allowed opacity-70",
        checked && "bg-gradient-to-b from-[#26F9FF] to-[#179599]",
      )}
      onClick={() => onChange?.(!checked)}
    >
      {checked && (
        <svg
          className="h-3 w-3 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  const [agree, setAgree] = useState(false);

  const handleAccept = () => {
    // Після прийняття умов переходимо до сторінки оплати
    navigate("../payment-status");
  };

  return (
    <>
      <div
        className={cn(
          "mt-6 rounded-xl bg-gradient-to-t from-[#082536] to-[#193C4D] px-4 py-8 shadow-[-1px_-1px_1px_-0px_#657E8A]",
          "md:mt-8 md:rounded-3xl md:px-9 md:py-9",
        )}
      >
        <div className="mb-10">
          <h2 className={cn("text-xl font-bold", "md:text-3xl")}>
            Умови олімпіади перед оплатою
          </h2>
        </div>
        <div
          className="rounded-xl bg-[--color-white] p-4 text-sm text-[--color-5] md:rounded-3xl md:text-base"
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        ></div>
      </div>
      <div className="mt-10 md:px-4">
        <p className="mb-6 flex items-center gap-4 text-sm font-light text-[--color-3] md:text-xl">
          <CustomCheckbox checked={agree} onChange={setAgree} />
          <div className="flex flex-col md:flex-row md:gap-4">
            <span>Я прочитав і приймаю умови олімпіади</span>
            <span className="text-[--color-error]">
              *Прийняття умов Олімпіади обов'язкове
            </span>
          </div>
        </p>
        <Button
          className="w-full text-base lg:text-base lg:px-8 lg:py-3 md:w-auto"
          onClick={handleAccept}
          disabled={!agree}
        >
          Прийняти
        </Button>
      </div>
    </>
  );
};

const text = `
<p>Настоящий документ устанавливает условия участия в онлайн-Олимпиаде по быстрому запоминанию (далее — Олимпиада). Участвуя в Олимпиаде, участник подтверждает свое согласие с нижеприведёнными условиями.</p>
<br />
<p>1. ОБЩИЕ ПОЛОЖЕНИЯ</p>
<p>1.1. Организатором Олимпиады является Space Memory (далее — Организатор). 1.2. Олимпиада проводится в онлайн-формате на платформе space-memory-olympiad.com. 1.3. К участию допускаются лица, зарегистрировавшиеся на сайте и оплатившие участие (если предусмотрено).</p>
<br />
<p>2. РЕГИСТРАЦИЯ И УЧАСТИЕ</p>
<p>2.1. Для участия необходимо заполнить регистрационную форму и, в случае необходимости, оплатить участие. 2.2. Участник обязан предоставлять достоверную информацию при регистрации. 2.3. Организатор оставляет за собой право отказать в участии в случае нарушения условий.</p>
<br />
<p>3. ПРОВЕДЕНИЕ ОЛИМПИАДЫ</p>
<p>3.1. Дата и время проведения Олимпиады указываются на официальном сайте. 3.2. Олимпиада состоит из нескольких этапов, задания выполняются в онлайн-режиме. 3.3. Время выполнения заданий ограничено. Несоблюдение временных рамок может повлечь за собой дисквалификацию.</p>
<br />
<p>4. ОЦЕНИВАНИЕ И НАГРАДЫ</p>
<p>4.1. Результаты Олимпиады определяются на основе объективных критериев, установленных Организатором. 4.2. Победители получают дипломы, сертификаты или другие награды (если предусмотрено). 4.3. Решение Организатора по итогам Олимпиады является окончательным и пересмотру не подлежит.</p>
<br />
<p>5. ОБЯЗАННОСТИ И ОТВЕТСТВЕННОСТЬ</p>
<p>5.1. Участник обязуется не использовать постороннюю помощь и соблюдать честность в выполнении заданий. 5.2. Запрещается передавать третьим лицам логин и пароль для участия в Олимпиаде.</p>
`;
