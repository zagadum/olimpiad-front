import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token); // Сохраняем токен
      navigate('/olympiads/all'); // Перенаправляем на нужную страницу
    } else {
      navigate('/login'); // Если токена нет — на страницу логина
    }
  }, [navigate]);

  return <div>Проверка авторизации...</div>;
};

export default AuthPage;
