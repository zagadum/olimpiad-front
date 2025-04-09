import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerForOlympiad } from "@/entities/olympiads";
import { useNavigate } from "react-router-dom";

type FormInputs = {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  schoolName: string;
  email: string;
  phone: string;
  age: number;
  olympiadLanguage: string;
  region: string;
  difficultyLevel: "Basic" | "Intermediate" | "Pro" | "";
  olympiadOption?: string;
};

export const RegisterFormPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerForOlympiad,
    onSuccess: () => {
      // Після успішної реєстрації переходимо до сторінки з умовами
      navigate("/terms");
    },
    onError: (error) => {
      console.error("Помилка реєстрації:", error);
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    mutation.mutate(data);
  };

  const difficulty = watch("difficultyLevel");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div>
        <label>Ім'я</label>
        <input
          {...register("firstName", { required: true })}
          className="w-full border p-2 bg-transparent"
        />
        {errors.firstName && <span>Це поле обов'язкове</span>}
      </div>
      <div>
        <label>Прізвище</label>
        <input
          {...register("lastName", { required: true })}
          className="w-full border p-2 bg-transparent"
        />
        {errors.lastName && <span>Це поле обов'язкове</span>}
      </div>
      <div>
        <label>Країна</label>
        <input
          {...register("country", { required: true })}
          className="w-full border p-2 bg-transparent"
        />
        {errors.country && <span>Це поле обов'язкове</span>}
      </div>
      <div>
        <label>Місто</label>
        <input
          {...register("city", { required: true })}
          className="w-full border p-2 bg-transparent"
        />
        {errors.city && <span>Це поле обов'язкове</span>}
      </div>
      <div>
        <label>Назва школи</label>
        <input
          {...register("schoolName", { required: true })}
          className="w-full border p-2 bg-transparent"
        />
        {errors.schoolName && <span>Це поле обов'язкове</span>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full border p-2 bg-transparent"
        />
        {errors.email && <span>Це поле обов'язкове</span>}
      </div>
      <div>
        <label>Номер телефону</label>
        <input
          {...register("phone", { required: true })}
          className="w-full border p-2 bg-transparent"
        />
        {errors.phone && <span>Це поле обов'язкове</span>}
      </div>
      <div>
        <label>Вік</label>
        <select
          {...register("age", { required: true })}
          className="w-full border p-2 bg-transparent"
        >
          {Array.from({ length: 16 }, (_, i) => i + 5).map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Мова олімпіади</label>
        <select
          {...register("olympiadLanguage", { required: true })}
          className="w-full border p-2 bg-transparent"
        >
          <option value="Українська">Українська</option>
          <option value="Польська">Польська</option>
          <option value="Англійська">Англійська</option>
        </select>
      </div>
      <div>
        <label>Область</label>
        <input
          {...register("region", { required: true })}
          className="w-full border p-2 bg-transparent"
        />
        {errors.region && <span>Це поле обов'язкове</span>}
      </div>
      <div>
        <label>Рівень складності</label>
        <select
          {...register("difficultyLevel", { required: true })}
          className="w-full border p-2 bg-transparent"
        >
          <option value="">Виберіть рівень</option>
          <option value="Basic">Basic</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Pro">Pro</option>
        </select>
      </div>
      {difficulty && (
        <div>
          <label>Вибір варіанту олімпіади</label>
          <select
            {...register("olympiadOption", { required: true })}
            className="w-full border p-2 bg-transparent"
          >
            <option value="">Виберіть варіант</option>
            <option value="Option1">Варіант 1</option>
            <option value="Option2">Варіант 2</option>
            <option value="Option3">Варіант 3</option>
          </select>
        </div>
      )}
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Підтвердити
      </button>
    </form>
  );
};
