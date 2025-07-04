import React, { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import { useTranslation } from "react-i18next";
import { Select, SelectOption, Value } from "@/shared/ui/select";
import { cn } from "@/shared/lib/cn.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getOlympiadDetail,
  getOlympiadsTaskList,
  runOlympiad,
} from "@/entities/olympiads";
import { useParams } from "react-router-dom";
import { getLang } from "@/shared/lib/getLang.ts";

type StateOption = {
  id: number;
  value?: Value;
};

const capacity = [
  { value: 1, label: "без поділу" },
  { value: 2, label: "2" },
  { value: 4, label: "4" },
  { value: 6, label: "6" },
] as SelectOption[];

const groupCards = [
  { value: 1, label: "без групування" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
] as SelectOption[];

const showGroups = [
  { value: "без поділу" },
  { value: "2" },
  { value: "3" },
  { value: "4" },
] as SelectOption[];

const categoryBinary = [
  { value: "1", label: "Рядок" },
  { value: "2", label: "Стовпчик" },
] as SelectOption[];

export const StartPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCapacity, setSelectedCapacity] = useState<StateOption[]>([]);
  const [selectedGroupCards, setSelectedGroupCards] = useState<StateOption[]>(
    [],
  );
  const [selectedShowGroups, setSelectedShowGroups] = useState<StateOption[]>(
    [],
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    StateOption[]
  >([]);

  const { olympiadId } = useParams<{ olympiadId: string }>();
  const lang = getLang();

  const { data: olympiad } = useQuery({
    queryKey: ["olympiad", olympiadId],
    queryFn: () => getOlympiadDetail(olympiadId!),
    select: (value) => value.data_list[0],
    enabled: !!olympiadId,
  });

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
      setSelectedCapacity((prev) => [
        ...prev,
        { id: item.id, value: item?.params_json.capacity },
      ]);
      setSelectedGroupCards((prev) => [
        ...prev,
        { id: item.id, value: item?.params_json.group_cards },
      ]);
      setSelectedShowGroups((prev) => [
        ...prev,
        { id: item.id, value: item?.params_json.show_groups },
      ]);
      setSelectedCategoryId((prev) => [
        ...prev,
        { id: item.id, value: item?.params_json.category_id },
      ]);
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
          {t("olympiadStart.title")}
        </h2>
        <p className="text-base font-light md:text-xl">
          {t("olympiadStart.category")}{" "}
          <span className="capitalize text-[#FF9A26]">
            {olympiad?.subscribe?.stages_level}{" "}
            {olympiad?.subscribe?.stages_num}
          </span>{" "}
          |{" "}
          <span className="text-[#FF9A26]">{olympiad?.subscribe?.age_tab}</span>{" "}
          |{" "}
          <span className="text-[#FF9A26]">
            {olympiad?.subscribe?.practicant_id}
          </span>
        </p>
      </div>
      <div className="overflow-x-auto">
        <div className="relative min-w-fit">
          <table className="table-auto border-separate border-spacing-y-6 md:min-w-full">
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
                        {t(
                          item?.table_name === "olympiad_cards"
                            ? "olympiadTraining.decks"
                            : "olympiadTraining.quantity",
                        )}
                        <span className="text-[#E79600]">
                          {item.params_json.digit_number}
                        </span>
                      </p>
                    </td>
                    <td className="bg-[--color-5] px-2.5 py-4 lg:py-6">
                      <p className="text-sm lg:text-xl">
                        {t("olympiadTraining.memorizeIn")}
                        <span className="text-nowrap text-[#E79600]">
                          {item?.params_json.interval_memory_list.label}
                        </span>
                      </p>
                      <p className="text-sm lg:text-xl">
                        {t("olympiadTraining.recallIn")}
                        <span className="text-nowrap text-[#E79600]">
                          {item?.params_json.interval_list.label}
                        </span>
                      </p>
                    </td>
                    <td className="max-w-full space-x-5 whitespace-nowrap bg-[--color-5] px-2.5 py-4 text-right lg:py-6">
                      {(item?.table_name === "olympiad_memory" ||
                        item?.table_name === "olympiad_number_letter") && (
                        <Select
                          variant="secondary"
                          value={
                            selectedCapacity.find(({ id }) => id === item.id)
                              ?.value
                          }
                          onChange={(value) =>
                            setSelectedCapacity((prev) =>
                              prev.map((elem) =>
                                elem.id === item.id
                                  ? { ...elem, value: value }
                                  : elem,
                              ),
                            )
                          }
                          options={capacity}
                          placeholder="Розрядність"
                          targetClassName="min-w-[165px]"
                          dropdownClassName="w-full"
                        />
                      )}
                      {item?.table_name === "olympiad_binnary" && (
                        <Select
                          variant="secondary"
                          value={
                            selectedCategoryId.find(({ id }) => id === item.id)
                              ?.value
                          }
                          onChange={(value) =>
                            setSelectedCategoryId((prev) =>
                              prev.map((elem) =>
                                elem.id === item.id
                                  ? { ...elem, value: value }
                                  : elem,
                              ),
                            )
                          }
                          options={categoryBinary}
                          placeholder="Відображення"
                          targetClassName="min-w-[165px]"
                          dropdownClassName="w-full"
                        />
                      )}
                      {item?.table_name === "olympiad_binnary" && (
                        <Select
                          variant="secondary"
                          value={
                            selectedShowGroups.find(({ id }) => id === item.id)
                              ?.value
                          }
                          onChange={(value) =>
                            setSelectedShowGroups((prev) =>
                              prev.map((elem) =>
                                elem.id === item.id
                                  ? { ...elem, value: value }
                                  : elem,
                              ),
                            )
                          }
                          options={showGroups}
                          placeholder="Групування"
                          targetClassName="min-w-[165px]"
                          dropdownClassName="w-full"
                        />
                      )}
                      {item?.table_name === "olympiad_cards" && (
                        <Select
                          variant="secondary"
                          value={
                            selectedGroupCards.find(({ id }) => id === item.id)
                              ?.value
                          }
                          onChange={(value) =>
                            setSelectedGroupCards((prev) =>
                              prev.map((elem) =>
                                elem.id === item.id
                                  ? { ...elem, value: value }
                                  : elem,
                              ),
                            )
                          }
                          options={groupCards}
                          placeholder="Групування"
                          targetClassName="min-w-[165px]"
                          dropdownClassName="w-full"
                        />
                      )}
                    </td>
                    <td className="rounded-r-xl bg-[--color-5] py-4 pl-2.5 pr-4 text-right lg:py-6 lg:pr-6">
                      <Button
                        disabled={item.btn_allow !== 1}
                        onClick={onSubmit({
                          olympiad_id: olympiadId,
                          params_id: item.id,
                          is_self: 0,
                          add_params: JSON.stringify({
                            capacity: selectedCapacity.find(
                              ({ id }) => id === item.id,
                            )?.value,
                            show_groups: selectedShowGroups.find(
                              ({ id }) => id === item.id,
                            )?.value,
                            group_cards: selectedGroupCards.find(
                              ({ id }) => id === item.id,
                            )?.value,
                            category_id: selectedCategoryId.find(
                              ({ id }) => id === item.id,
                            )?.value,
                          }),
                          language: lang,
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
