import React, { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  // getOlympiadsTask,
  registerForOlympiad,
} from "@/entities/olympiads";
import { Button } from "@/shared/ui/button";
import warningIcon from "@/shared/assets/icons/error-rounded.svg";
import { cn } from "@/shared/lib/cn";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useCurrentUserQuery } from "@/entities/auth";
import { getLang } from "@/shared/lib/getLang.ts";
import { getCityList, getCountryList, getRegionList } from "@/entities/guide";
import { differenceInYears, isValid } from "date-fns";
import PhoneInputWithCountry, {
  Country,
} from "react-phone-number-input/react-hook-form";
import "./style.css";

type FormInputs = {
  surname: string;
  lastname: string;
  country_id: number;
  region_id: number;
  city_id: number;
  school: string;
  email: string;
  phone: string;
  age_id: number;
  language: string;
  stages_level: string;
  stages_num?: number;
};

const languages = [
  { value: "uk", label: "Українська" },
  { value: "pl", label: "Polski" },
];

const yearIntervals = [
  { min: 9, max: 12 }, // індекс 0
  { min: 13, max: 15 }, // індекс 1
  { min: 16, max: 17 }, // індекс 2
  { min: 18, max: 100 }, // індекс 3
];

const ageOptions = yearIntervals.map(({ min, max }, index) => ({
  value: index,
  label: min < 18 ? `${min} - ${max}` : "18+",
}));

const calcAge = (date: string) => {
  const dateNow = Date.now();
  const parsedDate = Date.parse(date);
  const isDateValid = isValid(parsedDate);
  if (isDateValid) {
    return differenceInYears(dateNow, parsedDate);
  }
  return 0;
};

function getAgeIntervalIndex(age: number): number {
  if (age < yearIntervals[0].min) return 0;
  if (age > yearIntervals[yearIntervals.length - 1].max)
    return yearIntervals.length - 1;

  return yearIntervals.findIndex(
    (interval) => age >= interval.min && age <= interval.max,
  );
}

const getAgeTab = (min: number, max: number) => `${min}-${max}`;

const stagesLevelOptions = [
  { label: "Basic", value: "basic" },
  { label: "Intermediate", value: "intremedia" },
  { label: "Pro", value: "pro" },
];

const stageItems = [
  { id: 1, name: "ЧЛК 00-30", tags: ["Картинки", "Слова"] },
  { id: 2, name: "ЧЛК 00-50", tags: ["Картинки", "Слова"] },
  { id: 3, name: "ЧЛК 00-70", tags: ["Картинки", "Слова"] },
];

export const RegisterFormPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { olympiadId } = useParams<{ olympiadId: string }>();
  const lang = getLang();

  const { data: user } = useCurrentUserQuery();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      lastname: user?.lastname,
      surname: user?.surname,
      school: user?.school,
      email: user?.email,
      phone: user?.phone,
      age_id: getAgeIntervalIndex(calcAge(user?.dob ?? "")) ?? user?.age_id,
      language: lang === "pl" ? "pl" : "uk",
    },
  });

  const ageField = watch("age_id");
  const stagesLevelField = watch("stages_level");
  const stagesNumField = watch("stages_num");
  const countryField = watch("country_id");
  const regionField = watch("region_id");

  const { data: countryList = [] } = useQuery({
    queryKey: ["guide", "get-country-list", { language: lang }],
    queryFn: () => getCountryList({ language: lang }),
    select: (response) =>
      response.data_list.map((item) => ({ value: item.id, label: item.name })),
  });

  const { data: regionList = [] } = useQuery({
    queryKey: ["guide", "get-region-list", countryField, { language: lang }],
    queryFn: () => getRegionList(countryField, { language: lang }),
    enabled: !!countryField,
    select: (response) =>
      response.data_list.map((item) => ({ value: item.id, label: item.name })),
  });

  const { data: cityList = [] } = useQuery({
    queryKey: ["guide", "get-city-list", regionField, { language: lang }],
    queryFn: () => getCityList(regionField, { language: lang }),
    enabled: !!regionField,
    select: (response) =>
      response.data_list.map((item) => ({ value: item.id, label: item.name })),
  });

  // const { data: taskList = [] } = useQuery({
  //   queryKey: [
  //     "olympiads",
  //     "get-task",
  //     {
  //       language: lang,
  //       olympiad_id: olympiadId,
  //       stages_level: stagesLevelField,
  //       age_tab: getAgeTab(
  //         yearIntervals[ageField].min,
  //         yearIntervals[ageField].max,
  //       ),
  //     },
  //   ],
  //   queryFn: () =>
  //     getOlympiadsTask({
  //       language: lang,
  //       olympiad_id: olympiadId,
  //       stages_level: stagesLevelField,
  //       age_tab: getAgeTab(
  //         yearIntervals[ageField].min,
  //         yearIntervals[ageField].max,
  //       ),
  //     }),
  //   enabled: !!(olympiadId && stagesLevelField),
  //   select: (response) =>
  //     response.data_list,
  // });
  //
  // console.log('taskList', taskList);

  useEffect(() => {
    setValue("region_id", 0);
    setValue("city_id", 0);
  }, [countryField]);

  useEffect(() => {
    if (user) {
      setValue("lastname", user.lastname);
      setValue("surname", user.surname);
      setValue("school", user.school);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("country_id", user.country_id);
      setValue("region_id", user.region_id);
      setValue("city_id", user.city_id);
      setValue(
        "age_id",
        getAgeIntervalIndex(calcAge(user?.dob ?? "")) ?? user?.age_id,
      );
    }
  }, [user]);

  const onChangeStagesNum = (id: number) => () => {
    setValue("stages_num", id);
  };

  const mutation = useMutation({
    mutationFn: registerForOlympiad,
    onSuccess: () => {
      // Після успішної реєстрації переходимо до сторінки з умовами
      navigate("../terms");
    },
    onError: (error) => {
      console.error("Помилка реєстрації:", error);
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const { age_id, ...formData } = data;
    const ageTab = yearIntervals[age_id];
    mutation.mutate({
      ...formData,
      olympiad_id: olympiadId,
      practicant_id: user?.id,
      student_id: user?.student_id,
      patronymic: user?.patronymic,
      phone_country: user?.phone_country,
      age_tab: getAgeTab(ageTab.min, ageTab.max),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 pb-20 lg:pb-10 lg:py-10 md:px-4 md:py-20"
    >
      <div
        className={cn(
          "radial-gradient-bg rounded-xl px-4 py-10 shadow-[-1px_-1px_1px_-0px_#657E8A]",
          "md:rounded-3xl md:px-8 md:py-16",
          "lg:px-8 lg:py-12",
          "xl:px-20 xl:py-16",
        )}
      >
        <h2 className="mb-10 text-2xl md:mb-16 md:text-3xl">
          {t("registerForm.title")}
        </h2>
        <div className="grid gap-y-6 md:grid-cols-2 md:gap-x-6 md:gap-y-8 lg:gap-x-8 xl:gap-x-16">
          <div className="order-1 md:order-1">
            <input
              {...register("lastname", { required: true })}
              autoComplete="off"
              placeholder={t("registerForm.lastname")}
              className={cn(
                "w-full rounded-full border border-transparent bg-[--color-5] px-4 py-2.5 text-base leading-4 text-[#F2F2F2]",
                "md:px-6 md:py-5 md:text-xl md:leading-6",
                "placeholder:font-light placeholder:text-[#A5A5A5] focus-within:border-[--color-1]",
                errors.lastname &&
                  "border-[--color-error] focus-within:border-[--color-error]",
              )}
            />
            {errors.lastname && (
              <span className="pl-4 text-[10px] font-light leading-3 text-[--color-error] md:text-base md:leading-6">
                {t("registerForm.errors.fieldRequired")}
              </span>
            )}
          </div>
          <div className="order-2 md:order-3">
            <input
              {...register("surname", { required: true })}
              autoComplete="off"
              placeholder={t("registerForm.surname")}
              className={cn(
                "w-full rounded-full border border-transparent bg-[--color-5] px-4 py-2.5 text-base leading-4 text-[#F2F2F2]",
                "md:px-6 md:py-5 md:text-xl md:leading-6",
                "placeholder:font-light placeholder:text-[#A5A5A5] focus-within:border-[--color-1]",
                errors.surname &&
                  "border-[--color-error] focus-within:border-[--color-error]",
              )}
            />
            {errors.surname && (
              <span className="pl-4 text-base font-light leading-6 text-[--color-error]">
                {t("registerForm.errors.fieldRequired")}
              </span>
            )}
          </div>
          <div className="order-5 md:order-2">
            <Controller
              control={control}
              name="country_id"
              rules={{ required: t("registerForm.errors.fieldRequired") }}
              render={({ field, fieldState }) => (
                <CustomSelect<FormInputs, "country_id", number>
                  field={field}
                  error={fieldState.error}
                  options={countryList}
                  placeholder={t("registerForm.country")}
                  fullWidth
                />
              )}
            />
          </div>
          <div className="order-7 md:order-6">
            <Controller
              control={control}
              name="city_id"
              rules={{ required: t("registerForm.errors.fieldRequired") }}
              render={({ field, fieldState }) => (
                <CustomSelect<FormInputs, "city_id", number>
                  field={field}
                  error={fieldState.error}
                  options={cityList}
                  placeholder={t("registerForm.city")}
                  disabled={!regionField}
                  fullWidth
                />
              )}
            />
          </div>
          <div className="order-4 md:order-7">
            <input
              {...register("school", { required: true })}
              autoComplete="off"
              placeholder={t("registerForm.schoolName")}
              className={cn(
                "w-full rounded-full border border-transparent bg-[--color-5] px-4 py-2.5 text-base leading-4 text-[#F2F2F2]",
                "md:px-6 md:py-5 md:text-xl md:leading-6",
                "placeholder:font-light placeholder:text-[#A5A5A5] focus-within:border-[--color-1]",
                errors.school &&
                  "border-[--color-error] focus-within:border-[--color-error]",
              )}
            />
            {errors.school && (
              <span className="pl-4 text-base font-light leading-6 text-[--color-error]">
                {t("registerForm.errors.fieldRequired")}
              </span>
            )}
          </div>
          <div className="order-8 md:order-8">
            <input
              type="email"
              {...register("email", { required: true })}
              autoComplete="off"
              placeholder={t("registerForm.email")}
              className={cn(
                "w-full rounded-full border border-transparent bg-[--color-5] px-4 py-2.5 text-base leading-4 text-[#F2F2F2]",
                "md:px-6 md:py-5 md:text-xl md:leading-6",
                "placeholder:font-light placeholder:text-[#A5A5A5] focus-within:border-[--color-1]",
                errors.email &&
                  "border-[--color-error] focus-within:border-[--color-error]",
              )}
            />
            {errors.email && (
              <span className="pl-4 text-base font-light leading-6 text-[--color-error]">
                {t("registerForm.errors.fieldRequired")}
              </span>
            )}
          </div>
          <div className="order-9 md:order-10">
            <PhoneInputWithCountry
              defaultCountry={(user?.phone_country as Country) || "UA"}
              international
              name="phone"
              placeholder={t("registerForm.phone")}
              countryCallingCodeEditable={false}
              control={control}
              rules={{ required: t("registerForm.errors.fieldRequired") }}
              className={cn(
                "PhoneInputRoot flex gap-3",
                errors.phone && "border-red-500",
              )}
              countrySelectProps={{
                className:
                  "rounded-full border border-transparent outline-none bg-[--color-5] text-base md:text-xl leading-4 md:leading-6 text-[#F2F2F2] focus:border-[--color-1]",
              }}
              numberInputProps={{
                className:
                  "w-full rounded-full border border-transparent bg-[--color-5] px-4 py-2.5 text-base leading-4 md:px-6 md:py-5 md:text-xl md:leading-6 text-[#F2F2F2] placeholder:font-light placeholder:text-[#A5A5A5] focus:border-[--color-1]",
              }}
            />
            {errors.phone && (
              <span className="pl-4 text-[10px] font-light leading-4 text-[--color-error] md:text-base md:leading-6">
                {t("registerForm.errors.fieldRequired")}
              </span>
            )}
          </div>
          <div className="order-3 flex gap-3 md:order-5">
            <div className="min-w-36">
              <Controller
                control={control}
                name="age_id"
                rules={{ required: t("registerForm.errors.fieldRequired") }}
                render={({ field, fieldState }) => (
                  <CustomSelect<FormInputs, "age_id", number>
                    field={field}
                    error={fieldState.error}
                    options={ageOptions}
                    placeholder={t("registerForm.age")}
                    fullWidth
                  />
                )}
              />
            </div>
            <div className="flex-1">
              <Controller
                control={control}
                name="language"
                rules={{ required: t("registerForm.errors.fieldRequired") }}
                render={({ field, fieldState }) => (
                  <CustomSelect<FormInputs, "language">
                    field={field}
                    error={fieldState.error}
                    options={languages}
                    placeholder={t("registerForm.olympiadLanguage")}
                    fullWidth
                  />
                )}
              />
            </div>
          </div>
          <div className="order-6 md:order-4">
            <Controller
              control={control}
              name="region_id"
              rules={{ required: t("registerForm.errors.fieldRequired") }}
              render={({ field, fieldState }) => (
                <CustomSelect<FormInputs, "region_id", number>
                  field={field}
                  error={fieldState.error}
                  options={regionList}
                  placeholder={t("registerForm.region")}
                  disabled={!countryField}
                  fullWidth
                />
              )}
            />
          </div>
          <div className="order-9">
            <Controller
              control={control}
              name="stages_level"
              rules={{ required: t("registerForm.errors.fieldRequired") }}
              render={({ field, fieldState }) => (
                <CustomSelect<FormInputs, "stages_level">
                  field={field}
                  error={fieldState.error}
                  options={stagesLevelOptions}
                  placeholder={t("registerForm.stagesLevel")}
                  disabled={ageField < 0}
                  fullWidth
                />
              )}
            />
          </div>
        </div>
        {stagesLevelField && (
          <div className="mt-6 flex justify-between gap-3 md:mt-8 md:gap-4">
            {stageItems.map(({ id, name, tags }, i) => (
              <div
                key={id}
                className={cn(
                  "flex-1 cursor-pointer rounded-xl border border-transparent bg-[--color-5] px-2 py-4 transition duration-300 md:rounded-3xl md:px-6 md:py-6",
                  "hover:border-[--color-1]",
                  stagesNumField === id &&
                    "border-[--color-1] bg-gradient-to-t from-[#00C0CA00] to-[#193C4D]",
                )}
                onClick={onChangeStagesNum(id)}
              >
                <div className="mb-6 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-t from-[#24566F] to-[#1F4258] md:h-9 md:w-9">
                  <span className="text-xs font-bold leading-3 md:text-2xl md:leading-6">
                    {i + 1}
                  </span>
                </div>
                <p className="mb-4 text-base font-bold leading-4 md:text-2xl md:leading-6">
                  {name}
                </p>
                <div className="flex flex-col text-xs leading-3 md:text-xl md:leading-6">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="md:px-20">
        <div className="mb-6 flex gap-3 md:mb-4">
          <img src={warningIcon} alt="" />
          <p className="text-xs font-light leading-4 md:text-base md:leading-6">
            {t("registerForm.warning")}
          </p>
        </div>
        <Button className="w-full text-base leading-4 md:w-auto" type="submit">
          Підтвердити
        </Button>
      </div>
    </form>
  );
};
