import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AuthPage = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    const lang = params.get("lang");
    if (lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = i18n.language;
    if (token) {
      localStorage.setItem('token', token);
    }
    navigate('/olympiads/all');
  }, [navigate,i18n.language]);

  return <div>Проверка авторизации...</div>;
};

export default AuthPage;
