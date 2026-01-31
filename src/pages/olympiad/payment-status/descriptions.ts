import i18n from "@/shared/i18n";
import { useLanguage } from "@/widgets/olympiads-card/hooks";

const ukSuccess = `
<p>Ура! Ваш платіж успішно оброблено!</p>
<br />
<p>Ми надіслали підтвердження оплати на вашу електронну пошту.</p>
<br />
<p>Тепер ви готові до тренувань і захоплюючих пригод цієї олімпіади! 🚀</p>
<p>Віримо в вас — вперед до нових відкриттів і перемог!</p>
<br />
<p>Якщо виникнуть питання, пишіть нам на space.memory.com@gmail.com — ми завжди раді допомогти</p>
`;
const plSuccess = `
<p>Hurra! Twoja płatność została pomyślnie zrealizowana!</p>
<br />
<p>Wysłaliśmy potwierdzenie na Twój adres e-mail.</p>
<p>Teraz możesz zacząć treningi i wyruszyć w ekscytującą przygodę tej olimpiady! 🚀</p>
<p>Trzymamy za Ciebie kciuki — przed Tobą nowe odkrycia i sukcesy!</p>
<br />
<p>Jeśli masz pytania, napisz do nas na akademiaspacememory@gmail.com — zawsze chętnie pomożemy.</p>
`;

const enSuccess = `
<p>Hooray! Your payment has been successfully processed!</p>
<br />
<p>We’ve sent a confirmation to your email.</p>
<p>Now you can start training and embark on an exciting adventure in this olympiad! 🚀</p>
<p>We’re cheering for you — new discoveries and victories await!</p>
<br />
<p>If you have any questions, write to us at akademia spacememory@gmail.com — we’re always happy to help.</p>
`;

const ukFail = `
<p>Оплату не вдалося обробити. Спробуйте ще раз.</p>
<p>Якщо проблема повторюється: 📞 (+48) 733 805 610 • 📧 office@space-memory.com</p>
`;
const plFail = `
<p>Płatność nieudana. Spróbuj ponownie.</p>
<p>Jeśli problem trwa: 📞 (+48) 733 805 610 • 📧 office@space-memory.com</p>
`;

const enFail = `
<p>Payment failed. Please try again.</p>
<p>If the problem persists: 📞 (+48) 733 805 610 • 📧 office@space-memory.com</p>
`;

export const successDescription: Record<string, string> = {
  uk: ukSuccess,
  pl: plSuccess,
  en: enSuccess,
};
export const failDescription: Record<string, string> = {
  uk: ukFail,
  pl: plFail,
  en: enFail,
};

export const useLocalizedDescription = (map: Record<string, string>) => {
  const lang = useLanguage();
  return map[lang] ?? map[i18n.language] ?? "";
};
