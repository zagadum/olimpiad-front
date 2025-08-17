import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppRouter } from "../router";
import { queryClient } from "@/shared/api/query-client";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export const Providers = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");
    if (lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
        <ToastContainer />
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
