import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppRouter } from "../router";
import { queryClient } from "@/shared/api/query-client";
import { ToastContainer } from "react-toastify";

export const Providers = () => {
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
