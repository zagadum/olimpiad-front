import React, { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { useTranslation } from "react-i18next";
import { Select, SelectOption, Value } from "@/shared/ui/select";
import { cn } from "@/shared/lib/cn.ts";
import { getOlympiadsTaskList, runOlympiad } from "@/entities/olympiads";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getLang } from "@/shared/lib/getLang.ts";

const capacity = [
  { value: "без поділу" },
  { value: 2 },
  { value: 4 },
  { value: 6 },
] as SelectOption[];

const groupCards = [
  { value: "без поділу" },
  { value: 1 },
  { value: 2 },
  { value: 3 },
] as SelectOption[];

const showGroups = [
  { value: "без поділу" },
  { value: "2" },
  { value: "3" },
  { value: "4" },
] as SelectOption[];

const categoryBinaryFlag = [
  { value: "1", label: "Рядок" },
  { value: "2", label: "Стовпчик" },
] as SelectOption[];

export const TrainingPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCapacity, setSelectedCapacity] = useState<Value>();
  const [selectedGroupCards, setSelectedGroupCards] = useState<Value>();
  const [selectedShowGroups, setSelectedShowGroups] = useState<Value>();
  const [selectedCategoryBinnaryFlag, setSelectedCategoryBinnaryFlag] =
    useState<Value>();

  const { olympiadId } = useParams<{ olympiadId: string }>();
  const lang = getLang();

  const { data: taskList = [] } = useQuery({
    queryKey: [
      "olympiads",
      "get-task-list",
      {
        language: lang,
        olympiad_id: olympiadId,
      },
    ],
    queryFn: () =>
      getOlympiadsTaskList({
        language: lang,
        olympiad_id: olympiadId,
      }),
    enabled: !!olympiadId,
    select: (response) => response.data_list,
  });

  console.log("taskList", taskList);

  const mutation = useMutation({
    mutationFn: runOlympiad,
    onSuccess: (data) => {
      // Після успішної реєстрації переходимо до сторінки з умовами
      console.log("runOlympiad onSuccess", data);
      window.open(data.data_list.ret_url, "_self");
    },
    onError: (error) => {
      console.error("Помилка реєстрації:", error);
    },
  });

  const onSubmit = (data: unknown) => () => {
    mutation.mutate(data);
  };

  useEffect(() => {
    taskList.forEach((item) => {
      setSelectedCapacity(item?.params_json.capacity);
      setSelectedGroupCards(item?.params_json.group_cards);
      setSelectedShowGroups(item?.params_json.show_groups);
      setSelectedCategoryBinnaryFlag(item?.params_json.categoryBinaryFlag);
    });
  }, [taskList]);

  return (
    <div
      className={cn(
        "mt-8 rounded-xl bg-gradient-to-t from-[#082536] to-[#193C4D] px-4 py-8 shadow-[-1px_-1px_1px_-0px_#657E8A]",
        "lg:rounded-3xl lg:px-9 lg:py-9",
      )}
    >
      <div className="mb-6 md:mb-10">
        <h2 className="mb-4 text-xl font-bold md:text-3xl">
          {t("olympiadTraining.title")}
        </h2>
        <p className="text-base font-light md:text-xl">
          {t("olympiadTraining.category")}{" "}
          <span className="text-[#FF9A26]">Basic</span>
        </p>
      </div>
      {/*<div className="overflow-x-auto">*/}
      <div className="">
        <div className="relative min-w-fit">
          <table className="table-auto border-separate border-spacing-y-6">
            <tbody>
              {taskList.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className="rounded-l-xl bg-[--color-5] py-4 pl-4 pr-2.5 lg:py-6 lg:pl-6">
                      <h3 className="text-sm font-medium lg:text-xl">
                        {item.name}
                      </h3>
                      <p className="max-w-[395px] text-xs font-light text-[#A5A5A5] lg:text-xl">
                        {item.descr}
                      </p>
                    </td>
                    <td className="bg-[--color-5] px-2.5 py-4 lg:py-6">
                      <p className="text-sm lg:text-xl">
                        Кількість: {/*{item?.rows && (*/}
                        {/*  <span className="text-[#E79600]">{item.rows}</span>*/}
                        {/*)}*/}
                        {/*{item?.amount && (*/}
                        {/*  <span className="text-[#E79600]">{item.amount}</span>*/}
                        {/*)}*/}
                        <span className="text-[#E79600]">
                          {item.params_json.digit_number}
                        </span>
                      </p>
                    </td>
                    <td className="bg-[--color-5] px-2.5 py-4 lg:py-6">
                      <p className="text-sm lg:text-xl">
                        Запам’ятати за:{" "}
                        <span className="text-nowrap text-[#E79600]">
                          {item?.params_json.interval_memory_list.label}
                        </span>
                      </p>
                      <p className="text-sm lg:text-xl">
                        Згадати за:{" "}
                        <span className="text-nowrap text-[#E79600]">
                          {item?.params_json.interval_list.label}
                        </span>
                      </p>
                    </td>
                    <td className="bg-[--color-5] px-2.5 py-4 lg:py-6">
                      {item?.table_name === "olympiad_memory" && (
                        <Select
                          variant="secondary"
                          value={selectedCapacity}
                          onChange={(value) => setSelectedCapacity(value)}
                          options={capacity}
                          placeholder="Розрядність"
                          targetClassName="min-w-[165px]"
                          dropdownClassName="w-full"
                        />
                      )}
                    </td>
                    <td className="bg-[--color-5] px-2.5 py-4 lg:py-6">
                      {item?.table_name === "olympiad_binnary" && (
                        <Select
                          variant="secondary"
                          value={selectedCategoryBinnaryFlag}
                          onChange={(value) =>
                            setSelectedCategoryBinnaryFlag(value)
                          }
                          options={categoryBinaryFlag}
                          placeholder="Відображення"
                          targetClassName="min-w-[165px]"
                          dropdownClassName="w-full"
                        />
                      )}
                    </td>
                    <td className="bg-[--color-5] px-2.5 py-4 lg:py-6">
                      {item?.table_name === "olympiad_binnary" && (
                        <Select
                          variant="secondary"
                          value={selectedShowGroups}
                          onChange={(value) => setSelectedShowGroups(value)}
                          options={showGroups}
                          placeholder="Групування"
                          targetClassName="min-w-[165px]"
                          dropdownClassName="w-full"
                        />
                      )}
                      {item?.table_name === "olympiad_cards" && (
                        <Select
                          variant="secondary"
                          value={selectedGroupCards}
                          onChange={(value) => setSelectedGroupCards(value)}
                          options={groupCards}
                          placeholder="Групування"
                          targetClassName="min-w-[165px]"
                          dropdownClassName="w-full"
                        />
                      )}
                    </td>
                    <td className="rounded-r-xl bg-[--color-5] py-4 pl-2.5 pr-4 lg:py-6 lg:pr-6">
                      <Button
                        variant="secondary"
                        onClick={onSubmit({
                          olympiad_id: olympiadId,
                          params_id: item.id,
                          is_self: 1,
                          add_params: JSON.stringify({
                            capacity: selectedCapacity,
                            show_groups: selectedShowGroups,
                            categoryBinaryFlag: selectedCategoryBinnaryFlag,
                            group_cards: selectedGroupCards,
                          }),
                          language: lang,
                        })}
                      >
                        {t("olympiadTraining.startTraining", { count: item?.cnt_repeat })}
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
