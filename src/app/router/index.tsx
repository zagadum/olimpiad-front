import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { AllOlympiadsPage } from "@/pages/olympiads/all-olympiads";
import { MyOlympiadsPage } from "@/pages/olympiads/my-olympiads";
import { RankingPage } from "@/pages/olympiads/ranking";
import { OverviewPage } from "@/pages/olympiad/overview";
import { RegisterFormPage } from "@/pages/olympiad/register-form";
import { TermsPage } from "@/pages/olympiad/terms-page";
import { PaymentStatusPage } from "@/pages/olympiad/payment-status";
import { TrainingPage } from "@/pages/olympiad/training";
import { OlympiadsLayout } from "@/app/layouts/olympiads";
import { MainLayout } from "@/app/layouts/main";
import { OlympiadLayout } from "@/app/layouts/olympiad";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/olympiads" element={<OlympiadsLayout />}>
          <Route index element={<Navigate to="all" />} />
          <Route path="all" element={<AllOlympiadsPage />} />
          <Route path="my" element={<MyOlympiadsPage />} />
          <Route path="ranking" element={<RankingPage />} />
        </Route>
        <Route path="/olympiads/:olympiadId" element={<OlympiadLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="register" element={<RegisterFormPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="payment-status" element={<PaymentStatusPage />} />
          <Route path="training" element={<TrainingPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
