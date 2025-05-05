import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
    }
    navigate('/olympiads/all');
  }, [navigate]);

  return <div>Проверка авторизации...</div>;
};

export default AuthPage;
