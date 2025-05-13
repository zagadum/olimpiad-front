import React, { useState } from "react";
import { Button } from "@/shared/ui/button";
import { useTranslation } from "react-i18next";
import { Select, SelectOption } from "@/shared/ui/select";
import { cn } from "@/shared/lib/cn.ts";

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

export const TrainingPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCapacity, setSelectedCapacity] = useState<string | number>();
  return (
    <div
      className={cn(
        "mt-8 rounded-xl bg-gradient-to-t from-[#082536] to-[#193C4D] px-4 py-8 shadow-[-1px_-1px_1px_-0px_#657E8A]",
        "lg:rounded-3xl lg:px-9 lg:py-9",
      )}
    >
      <div className="mb-6 md:mb-10">
        <h2 className="mb-4 text-xl md:text-3xl font-bold">
          {t("olympiadTraining.title")}
        </h2>
        <p className="text-base md:text-xl font-light">
          {t("olympiadTraining.category")}{" "}
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
                    <td className="rounded-l-xl bg-[--color-5] py-4 pl-4 lg:py-6 lg:pl-6 pr-2.5">
                      <h3 className="text-sm lg:text-xl font-medium">{item.title}</h3>
                      <p className="max-w-[395px] text-xs lg:text-xl font-light text-[#A5A5A5]">
                        {item.description}
                      </p>
                    </td>
                    <td className="bg-[--color-5] px-2.5 py-4 lg:py-6">
                      {item?.rows && (
                        <p className="text-sm lg:text-xl">
                          Кількість рядків:{" "}
                          <span className="text-[#E79600]">{item?.rows}</span>
                        </p>
                      )}
                      {item?.amount && (
                        <p className="text-sm lg:text-xl">
                          Кількість:{" "}
                          <span className="text-[#E79600]">{item?.amount}</span>
                        </p>
                      )}
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
                    <td className="rounded-r-xl bg-[--color-5] pl-2.5 pr-4 lg:pr-6 py-4 lg:py-6">
                      <Button variant="secondary">
                        {t("olympiadTraining.startTraining", { count: 7 })}
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
