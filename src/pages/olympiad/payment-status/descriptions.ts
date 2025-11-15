import i18n from "@/shared/i18n";
import { useLanguage } from "@/widgets/olympiads-card/hooks";

const ukSuccess = `
<p>Ваш платіж успішно оброблено.</p>
<br />
<p>📩 Що далі?</p>
<ul>
  <li>Ми відправили ваш код учасника на електронну пошту.</li>
  <li>Питання? office@space-memory.com</li>
</ul>
`;
const plSuccess = `
<p>Twoja płatność została pomyślnie przetworzona.</p>
<br />
<p>📩 Co dalej?</p>
<ul>
  <li>Wysłaliśmy Twój kod uczestnika na e-mail.</li>
  <li>Pytania? office@space-memory.com</li>
</ul>
`;
const ukFail = `
<p>Оплату не вдалося обробити. Спробуйте ще раз.</p>
<p>Якщо проблема повторюється: 📞 (+48) 733 805 610 • 📧 office@space-memory.com</p>
`;
const plFail = `
<p>Płatność nieudana. Spróbuj ponownie.</p>
<p>Jeśli problem trwa: 📞 (+48) 733 805 610 • 📧 office@space-memory.com</p>
`;

export const successDescription: Record<string, string> = {
  uk: ukSuccess,
  pl: plSuccess,
};
export const failDescription: Record<string, string> = {
  uk: ukFail,
  pl: plFail,
};

export const useLocalizedDescription = (map: Record<string, string>) => {
  const lang = useLanguage();
  return map[lang] ?? map[i18n.language] ?? "";
};
