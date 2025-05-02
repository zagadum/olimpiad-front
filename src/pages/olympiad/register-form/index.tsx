import React, { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { registerForOlympiad } from "@/entities/olympiads";
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
import "./styles.css";

type FormInputs = {
  surname: string;
  lastname: string;
  country: number;
  region: number;
  city: number;
  schoolName: string;
  email: string;
  phone: string;
  age: number;
  olympiadLanguage: string;
  difficultyLevel: string;
  olympiadOption?: number;
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

const difficultyLevelOptions = [
  { label: "Basic", value: "basic" },
  { label: "Intermediate", value: "intermediate" },
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
      schoolName: user?.school,
      email: user?.email,
      phone: user?.phone,
      age: getAgeIntervalIndex(calcAge(user?.dob ?? "")) || user?.age_id,
      olympiadLanguage: lang === "pl" ? "pl" : "uk",
    },
  });

  const ageField = watch("age");
  const difficultyField = watch("difficultyLevel");
  const olympiadOptionField = watch("olympiadOption");
  const countryField = watch("country");
  const regionField = watch("region");

  const { data: countryList = [] } = useQuery({
    queryKey: ["guide/get-country-list", { language: lang }],
    queryFn: () => getCountryList({ language: lang }),
    select: (response) =>
      response.data_list.map((item) => ({ value: item.id, label: item.name })),
  });

  const { data: regionList = [] } = useQuery({
    queryKey: ["guide/get-country-list", countryField, { language: lang }],
    queryFn: () => getRegionList(countryField, { language: lang }),
    enabled: !!countryField,
    select: (response) =>
      response.data_list.map((item) => ({ value: item.id, label: item.name })),
  });

  const { data: cityList = [] } = useQuery({
    queryKey: ["guide/get-country-list", regionField, { language: lang }],
    queryFn: () => getCityList(regionField, { language: lang }),
    enabled: !!regionField,
    select: (response) =>
      response.data_list.map((item) => ({ value: item.id, label: item.name })),
  });

  useEffect(() => {
    if (user) {
      setValue("lastname", user.lastname);
      setValue("surname", user.surname);
      setValue("schoolName", user.school);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("age", user.age_id);
    }
  }, [user]);

  const onChangeOlympiadOption = (option: number) => () => {
    setValue("olympiadOption", option);
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
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 px-4 py-20">
      <div className="radial-gradient-bg rounded-3xl px-20 py-16 shadow-[-1px_-1px_1px_-0px_#657E8A]">
        <h2 className="mb-16 text-3xl">{t("registerForm.title")}</h2>
        <div className="grid grid-cols-2 gap-x-16 gap-y-8">
          <div className="order-1">
            <input
              {...register("lastname", { required: true })}
              placeholder={t("registerForm.lastname")}
              className={cn(
                "w-full rounded-full border border-transparent bg-[--color-5] px-6 py-5 text-xl leading-6 text-[#F2F2F2]",
                "placeholder:font-light placeholder:text-[#A5A5A5] focus-within:border-[--color-1]",
                errors.lastname &&
                  "border-[--color-error] focus-within:border-[--color-error]",
              )}
            />
            {errors.lastname && (
              <span className="pl-4 text-base font-light leading-6 text-[--color-error]">
                {t("registerForm.errors.fieldRequired")}
              </span>
            )}
          </div>
          <div className="order-3">
            <input
              {...register("surname", { required: true })}
              placeholder={t("registerForm.surname")}
              className={cn(
                "w-full rounded-full border border-transparent bg-[--color-5] px-6 py-5 text-xl leading-6 text-[#F2F2F2]",
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
          <div className="order-2">
            <Controller
              control={control}
              name="country"
              rules={{ required: t("registerForm.errors.fieldRequired") }}
              render={({ field, fieldState }) => (
                <CustomSelect<FormInputs, "country", number>
                  field={field}
                  error={fieldState.error}
                  options={countryList}
                  placeholder={t("registerForm.country")}
                  fullWidth
                />
              )}
            />
          </div>
          <div className="order-6">
            <Controller
              control={control}
              name="city"
              rules={{ required: t("registerForm.errors.fieldRequired") }}
              render={({ field, fieldState }) => (
                <CustomSelect<FormInputs, "city", number>
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
          <div className="order-7">
            <input
              {...register("schoolName", { required: true })}
              placeholder={t("registerForm.schoolName")}
              className={cn(
                "w-full rounded-full border border-transparent bg-[--color-5] px-6 py-5 text-xl leading-6 text-[#F2F2F2]",
                "placeholder:font-light placeholder:text-[#A5A5A5] focus-within:border-[--color-1]",
                errors.schoolName &&
                  "border-[--color-error] focus-within:border-[--color-error]",
              )}
            />
            {errors.schoolName && (
              <span className="pl-4 text-base font-light leading-6 text-[--color-error]">
                {t("registerForm.errors.fieldRequired")}
              </span>
            )}
          </div>
          <div className="order-8">
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder={t("registerForm.email")}
              className={cn(
                "w-full rounded-full border border-transparent bg-[--color-5] px-6 py-5 text-xl leading-6 text-[#F2F2F2]",
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
          <div className="order-10">
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
                  "rounded-full border border-transparent outline-none bg-[--color-5] text-xl leading-6 text-[#F2F2F2] focus:border-[--color-1]",
              }}
              numberInputProps={{
                className:
                  "w-full rounded-full border border-transparent bg-[--color-5] px-6 py-5 text-xl leading-6 text-[#F2F2F2] placeholder:font-light placeholder:text-[#A5A5A5] focus:border-[--color-1]",
              }}
            />
            {errors.phone && (
              <span className="pl-4 text-base font-light leading-6 text-[--color-error]">
                {t("registerForm.errors.fieldRequired")}
              </span>
            )}
          </div>
          <div className="order-5 flex gap-3">
            <div className="min-w-36">
              <Controller
                control={control}
                name="age"
                rules={{ required: t("registerForm.errors.fieldRequired") }}
                render={({ field, fieldState }) => (
                  <CustomSelect<FormInputs, "age", number>
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
                name="olympiadLanguage"
                rules={{ required: t("registerForm.errors.fieldRequired") }}
                render={({ field, fieldState }) => (
                  <CustomSelect<FormInputs, "olympiadLanguage">
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
          <div className="order-4">
            <Controller
              control={control}
              name="region"
              rules={{ required: t("registerForm.errors.fieldRequired") }}
              render={({ field, fieldState }) => (
                <CustomSelect<FormInputs, "region", number>
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
              name="difficultyLevel"
              rules={{ required: t("registerForm.errors.fieldRequired") }}
              render={({ field, fieldState }) => (
                <CustomSelect<FormInputs, "difficultyLevel">
                  field={field}
                  error={fieldState.error}
                  options={difficultyLevelOptions}
                  placeholder={t("registerForm.difficultyLevel")}
                  disabled={ageField < 0}
                  fullWidth
                />
              )}
            />
          </div>
        </div>
        {difficultyField && (
          <div className="mt-8 flex justify-between gap-4">
            {stageItems.map(({ id, name, tags }, i) => (
              <div
                key={id}
                className={cn(
                  "flex-1 cursor-pointer rounded-3xl border border-transparent bg-[--color-5] p-6 transition duration-300",
                  "hover:border-[--color-1]",
                  olympiadOptionField === id &&
                    "bg-gradient-to-t from-[#00C0CA00] to-[#193C4D]",
                )}
                onClick={onChangeOlympiadOption(id)}
              >
                <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-t from-[#24566F] to-[#1F4258]">
                  <span className="text-2xl font-bold leading-6">{i + 1}</span>
                </div>
                <p className="mb-4 text-2xl font-bold leading-6">{name}</p>
                <div className="flex flex-col">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="px-20">
        <div className="mb-4 flex gap-3">
          <img src={warningIcon} alt="" />
          <p className="text-base font-light leading-6">
            {t("registerForm.warning")}
          </p>
        </div>
        <Button type="submit">Підтвердити</Button>
      </div>
    </form>
  );
};
