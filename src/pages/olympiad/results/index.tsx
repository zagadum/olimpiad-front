import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import confetti from "canvas-confetti";
import { getOlympiadRatingTop } from "@/entities/olympiads";
import { useCurrentUserQuery } from "@/entities/auth";
import spacemLogo from "@/shared/assets/images/spacem-logo.svg";

export const ResultsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { olympiadId } = useParams<{ olympiadId: string }>();

  const [displayScore, setDisplayScore] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const { data: user } = useCurrentUserQuery();

  const { data: ratingData } = useQuery({
    queryKey: ["olympiad-rating-top", olympiadId],
    queryFn: () => getOlympiadRatingTop(olympiadId!),
    enabled: !!olympiadId,
  });

  // Знаходимо результат поточного учасника за його ID
  const myRating = ratingData?.data?.rating?.find(
    (r) => r.participantId === user?.id,
  );
  const myScore = myRating?.score ?? ratingData?.data?.rating?.[0]?.score ?? 0;

  // Анімація лічильника балів
  useEffect(() => {
    if (myScore === 0) return;

    const duration = 2000;
    const range = myScore;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setDisplayScore(current);
      if (current >= myScore) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [myScore]);

  // Ефекти святкування
  useEffect(() => {
    if (myScore === 0) return;

    const sideConfettiTimer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#FFD700", "#4CAF50"],
      });
    }, 500);

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
    };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const fireworkInterval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(fireworkInterval);

      const particleCount = 50 * (timeLeft / duration);

      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#FFD700", "#FF0000", "#FFFFFF", "#00FF00"],
        }),
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#00FFFF", "#FF00FF", "#FFFF00"],
        }),
      );
    }, 250);

    return () => {
      clearTimeout(sideConfettiTimer);
      clearInterval(fireworkInterval);
    };
  }, [myScore]);

  const handleShare = async () => {
    const shareText = `Я набрав ${myScore} балів в Олімпіаді з пам'яті!`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Моя Олімпіада",
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // cancelled by user
      }
    } else {
      await navigator.clipboard.writeText(shareUrl).catch(() => {});
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleMainMenu = () => {
    navigate("/olympiads/my");
  };

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center relative">
      {/* Фонове свічення */}
      <div className="absolute inset-0 pointer-events-none results-glow-bg" />

      {/* Toast повідомлення */}
      <div
        className={`fixed top-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${showToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}`}
      >
        <div className="bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg shadow-emerald-500/20 font-medium text-sm">
          {t("resultsPage.linkCopied")}
        </div>
      </div>

      {/* Основна картка */}
      <div className="relative z-10 w-full max-w-md mx-4 p-8 rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-center results-fade-in-up">
        {/* Логотип */}
        <div className="flex justify-center mb-6">
          <div className="results-logo-bounce p-3 rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
            <img
              src={spacemLogo}
              alt="logo SpaceM"
              className="w-32 h-auto object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* Текст привітання */}
        <h1 className="text-3xl md:text-4xl text-white results-heading-font tracking-wide mb-2">
          {t("resultsPage.congratulations")}
        </h1>
        <p className="text-slate-300 text-lg mb-8 font-light">
          {t("resultsPage.successMessage")}
        </p>

        {/* Блок з результатом */}
        <div className="bg-[#051520]/60 rounded-3xl p-6 mb-8 border border-white/10 shadow-inner">
          <p className="text-xs text-slate-400 uppercase tracking-[0.2em] mb-2 font-medium">
            {t("resultsPage.yourResult")}
          </p>
          <div className="flex items-baseline justify-center">
            <span className="text-6xl md:text-7xl results-heading-font results-text-gradient drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
              {displayScore}
            </span>
          </div>
          <p className="text-emerald-400 text-sm mt-3 font-bold tracking-wide animate-pulse">
            {t("resultsPage.greatJob")}
          </p>
        </div>

        {/* Кнопки дій */}
        <div className="space-y-3">
          <button
            onClick={handleMainMenu}
            className="w-full py-4 px-6 rounded-2xl bg-white/5 border border-white/20 hover:bg-white/10 text-white font-medium transition-all active:scale-95"
          >
            {t("resultsPage.mainMenu")}
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
        .results-heading-font {
          font-family: 'Russo One', sans-serif;
        }
        .results-fade-in-up {
          animation: resultsFadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        @keyframes resultsFadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .results-glow-bg {
          background: radial-gradient(circle at center, rgba(76, 175, 80, 0.12) 0%, rgba(7, 30, 44, 0) 70%);
        }
        .results-logo-bounce {
          animation: resultsBounceLogo 3.5s infinite ease-in-out;
        }
        @keyframes resultsBounceLogo {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.2)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.5)); }
        }
        .results-text-gradient {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .results-btn-share {
          background: linear-gradient(to top, #074B4D, #00C3C9);
          border: 1px solid #009397;
          color: #FFFFFF;
        }
        .results-btn-share:hover {
          filter: brightness(1.15);
        }
      `}</style>
    </div>
  );
};
