import React, { useState } from "react";
import { Button } from "@/shared/ui/button";
import { useTranslation } from "react-i18next";
import { Select, SelectOption } from "@/shared/ui/select";
import { cn } from "@/shared/lib/cn.ts";
import { useMutation } from "@tanstack/react-query";
import { runOlympiad } from "@/entities/olympiads";

const data = [
  {
    title: "Числа 00-30",
    description: "Запомни, а после впиши в правильной последовательности",
    rows: 10,
    time: 5,
    capacity: [
      { value: "без поділу" },
      { value: 2 },
      { value: 4 },
    ] as SelectOption[],
  },
  {
    title: "Картинки",
    description:
      "Запомни картинки, а после впиши номера в правильной последовательности",
    amount: 30,
    time: 5,
  },
  {
    title: "Слова",
    description: "Запомни, а после впиши в правильной последовательности",
    amount: 40,
    time: 5,
  },
];

export const StartPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCapacity, setSelectedCapacity] = useState<string | number>();

  const mutation = useMutation({
    mutationFn: runOlympiad,
    onSuccess: (data) => {
      // Після успішної реєстрації переходимо до сторінки з умовами
      console.log('runOlympiad onSuccess', data);
      // window.open(data.data_list.ret_url, '_self')
      window.open(data.data_list.ret_url)
    },
    onError: (error) => {
      console.error("Помилка реєстрації:", error);
    },
  });

  const onSubmit = (data: unknown) => () => {
    mutation.mutate(data);
  };

  return (
    <div
      className={cn(
        "mt-8 rounded-xl bg-gradient-to-t from-[#082536] to-[#193C4D] px-4 py-8 shadow-[-1px_-1px_1px_-0px_#657E8A]",
        "lg:rounded-3xl lg:px-9 lg:py-9",
      )}
    >
      <div className="mb-6 md:mb-10">
        <h2 className="mb-4 text-xl font-bold md:text-3xl">
          {t("olympiadStart.title")}
        </h2>
        <p className="text-base font-light md:text-xl">
          {t("olympiadStart.category")}{" "}
          <span className="text-[#FF9A26]">Basic</span>
        </p>
      </div>
      <div className="overflow-x-auto">
        <div className="relative min-w-fit">
          <table className="table-auto border-separate border-spacing-y-6">
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item.title}>
                    <td className="rounded-l-xl bg-[--color-5] py-4 pl-4 pr-2.5 lg:py-6 lg:pl-6">
                      <h3 className="text-sm font-medium lg:text-xl">
                        {item.title}
                      </h3>
                      <p className="max-w-[395px] text-xs font-light text-[#A5A5A5] lg:text-xl">
                        {item.description}
                      </p>
                    </td>
                    <td className="bg-[--color-5] px-2.5 py-4 lg:py-6">
                      <p className="text-sm lg:text-xl">
                        Кількість:{" "}
                        {item?.rows && <span className="text-[#E79600]">{item.rows}</span>}
                        {item?.amount && <span className="text-[#E79600]">{item.amount}</span>}
                        <span className="text-[#E79600]">{item?.amount}</span>
                      </p>
                    </td>
                    <td className="bg-[--color-5] px-2.5 py-4 lg:py-6">
                      <p className="text-sm lg:text-xl">
                        Час на запам'ятовування:{" "}
                        <span className="text-nowrap text-[#E79600]">
                          {item?.time} хв
                        </span>
                      </p>
                    </td>
                    <td className="bg-[--color-5] px-2.5 py-4 lg:py-6">
                      {item?.capacity && (
                        <Select
                          variant="secondary"
                          value={selectedCapacity}
                          onChange={(value) => setSelectedCapacity(value)}
                          options={item?.capacity}
                          placeholder="без поділу"
                          targetClassName="min-w-[165px]"
                          dropdownClassName="w-full"
                        />
                      )}
                    </td>
                    <td className="bg-[--color-5] px-2.5 py-4 lg:py-6">
                      {item?.capacity && (
                        <Select
                          variant="secondary"
                          value={selectedCapacity}
                          onChange={(value) => setSelectedCapacity(value)}
                          options={item?.capacity}
                          placeholder="без поділу"
                          targetClassName="min-w-[165px]"
                          dropdownClassName="w-full"
                        />
                      )}
                    </td>
                    <td className="rounded-r-xl bg-[--color-5] py-4 pl-2.5 pr-4 lg:py-6 lg:pr-6">
                      <Button
                        onClick={onSubmit({
                          olympiad_id: 1,
                          params_id: 1,
                          is_self: 0,
                          add_params: "json",
                          language: "uk",
                        })}
                      >
                        {t("olympiadStart.start")}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
