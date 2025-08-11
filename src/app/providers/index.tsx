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
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  console.log('env.DEV', import.meta.env.DEV);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
        <ToastContainer />
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
