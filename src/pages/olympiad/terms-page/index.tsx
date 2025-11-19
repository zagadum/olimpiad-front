import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn.ts";
import { useQuery } from "@tanstack/react-query";
import { getLang } from "@/shared/lib/getLang.ts";
import { useTranslation } from "react-i18next";
import { getOlympiadAgreement } from "@/entities/olympiads";
import { CustomCheckbox } from "@/shared/ui/CustomCheckbox";

export const TermsPage: React.FC = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const lang = getLang(i18n.language);
  const { olympiadId } = useParams<{ olympiadId: string }>();

  const { data } = useQuery({
    queryKey: ["agreement", olympiadId, { language: lang }],
    queryFn: () => getOlympiadAgreement(olympiadId!, { language: lang }),
    select: (value) => value.data_list[0],
    enabled: !!olympiadId,
  });

  const [agree, setAgree] = useState(false);

  const handleAccept = () => {
    // Після прийняття умов переходимо до сторінки оплати
    //old
    navigate("../payment-status", { replace: true });
    //navigate("../payment", { replace: true });
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
            {t('termsPage.title')}
          </h2>
        </div>
        {!!data?.agreement && (
          <div
            className="rounded-xl bg-[--color-white] p-4 text-sm text-[--color-5] md:rounded-3xl md:text-base"
            dangerouslySetInnerHTML={{
              __html: data?.agreement,
            }}
          ></div>
        )}
      </div>
      <div className="mt-10 pb-20 md:px-4 md:pb-5">
        <p className="mb-6 flex items-center gap-4 text-sm font-light text-[--color-3] md:text-xl">
          <CustomCheckbox checked={agree} onChange={setAgree} />
          <div className="flex flex-col md:flex-row md:gap-4">
            <span>{t('termsPage.agree')}</span>
            <span className="text-[--color-error]">
              {t('termsPage.required')}
            </span>
          </div>
        </p>
        <Button
          className="w-full text-base md:w-auto lg:px-8 lg:py-3 lg:text-base"
          onClick={handleAccept}
          disabled={!agree}
        >
          {t('termsPage.accept')}
        </Button>
      </div>
    </>
  );
};
