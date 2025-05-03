import React, { useState } from "react";
import { Button } from "@/shared/ui/button";
import { useTranslation } from "react-i18next";
import { Select, SelectOption } from "@/shared/ui/select";

const data = [
  {
    title: "Числа 00-30",
    description: "Запомни, а после впиши в правильной последовательности",
    rows: 10,
    time: 5,
    capacity: [
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
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
    <div className="mt-8 rounded-3xl bg-gradient-to-t from-[#082536] to-[#193C4D] p-9 shadow-[-1px_-1px_1px_-0px_#657E8A]">
      <div className="mb-10">
        <h2 className="mb-4 text-3xl font-bold">
          {t("olympiadTraining.title", { count: 7 })}
        </h2>
        <p className="text-xl font-light">
          {t("olympiadTraining.category")}{" "}
          <span className="text-[#FF9A26]">Basic</span>
        </p>
      </div>
      <div className="flex flex-col gap-6 p-4">
        {/*{data.map((item) => {*/}
        {/*  return (*/}
        {/*    <div className="bg-[--color-5] rounded-3xl p-6 flex items-center justify-between gap-5">*/}
        {/*      <div className="flex items-center gap-5">*/}
        {/*        <div className="flex-1 flex-wrap">*/}
        {/*          <h3 className="text-xl font-medium">{item.title}</h3>*/}
        {/*          <p className="text-xl font-light text-[#A5A5A5]">*/}
        {/*            {item.description}*/}
        {/*          </p>*/}
        {/*        </div>*/}
        {/*        <div className="flex-1 flex-nowrap">*/}
        {/*          {item?.rows && (*/}
        {/*            <p className="text-xl">*/}
        {/*              Кількість рядків:{" "}*/}
        {/*              <span className="text-[#E79600]">{item?.rows}</span>*/}
        {/*            </p>*/}
        {/*          )}*/}
        {/*          {item?.amount && (*/}
        {/*            <p className="text-xl">*/}
        {/*              Кількість:{" "}*/}
        {/*              <span className="text-[#E79600]">{item?.amount}</span>*/}
        {/*            </p>*/}
        {/*          )}*/}
        {/*        </div>*/}
        {/*        <div className="flex-1 flex-nowrap">*/}
        {/*          <p className="text-xl">*/}
        {/*            Час на запам'ятовування:{" "}*/}
        {/*            <span className="text-[#E79600]">5 хв</span>*/}
        {/*          </p>*/}
        {/*        </div>*/}
        {/*        <div className="flex-1 flex-nowrap">*/}
        {/*          {item?.capacity && (*/}
        {/*            <Select options={item?.capacity} placeholder="без поділу" />*/}
        {/*          )}*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <Button variant="secondary">*/}
        {/*        {t("olympiadTraining.startTraining")}*/}
        {/*      </Button>*/}
        {/*    </div>*/}
        {/*  );*/}
        {/*})}*/}
        <table className="table-auto border-separate border-spacing-y-4">
          <tbody>
            {data.map((item) => {
              return (
                <tr>
                  <td className="rounded-l-xl bg-[--color-5] py-6 pl-6 pr-2.5">
                    <h3 className="text-xl font-medium">{item.title}</h3>
                    <p className="max-w-[395px] text-xl font-light text-[#A5A5A5]">
                      {item.description}
                    </p>
                  </td>
                  <td className="bg-[--color-5] px-2.5 py-6">
                    {item?.rows && (
                      <p className="text-xl">
                        Кількість рядків:{" "}
                        <span className="text-[#E79600]">{item?.rows}</span>
                      </p>
                    )}
                    {item?.amount && (
                      <p className="text-xl">
                        Кількість:{" "}
                        <span className="text-[#E79600]">{item?.amount}</span>
                      </p>
                    )}
                  </td>
                  <td className="bg-[--color-5] p-6 px-2.5">
                    <p className="text-xl">
                      Час на запам'ятовування:{" "}
                      <span className="text-nowrap text-[#E79600]">
                        {item?.time} хв
                      </span>
                    </p>
                  </td>
                  <td className="bg-[--color-5] p-6 px-2.5">
                    {item?.capacity && (
                      <Select
                        variant="secondary"
                        value={selectedCapacity}
                        onChange={(value) => setSelectedCapacity(value)}
                        options={item?.capacity}
                        placeholder="без поділу"
                      />
                    )}
                  </td>
                  <td className="rounded-r-xl bg-[--color-5] p-6 pl-2.5 pr-6">
                    <Button variant="secondary">
                      {t("olympiadTraining.startTraining")}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
