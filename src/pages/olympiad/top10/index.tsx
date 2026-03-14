import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getOlympiadRatingTop, RatingParticipant } from "@/entities/olympiads";
import spacemLogo from "@/shared/assets/images/spacem-logo.svg";
import firstPlace from "@/shared/assets/images/first-place.png";
import secondPlace from "@/shared/assets/images/second-place.png";
import thirdPlace from "@/shared/assets/images/third-place.png";
import superPlace from "@/shared/assets/images/super-place.png";

// Canvas святкування (конфетті + феєрверки)
const CelebrationCanvas: React.FC<{ active: boolean }> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type ParticleType = "confetti" | "firework";

    class Particle {
      x: number;
      y: number;
      color: string;
      type: ParticleType;
      size: number;
      speedX: number;
      speedY: number;
      gravity = 0.12;
      opacity = 1;
      rotation: number;
      rotationSpeed: number;

      constructor(x: number, y: number, color: string, type: ParticleType) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.type = type;
        this.size =
          type === "confetti"
            ? Math.random() * 10 + 8
            : Math.random() * 3 + 2;
        this.speedX =
          (Math.random() - 0.5) * (type === "confetti" ? 10 : 12);
        this.speedY =
          (Math.random() - 0.5) * (type === "confetti" ? 10 : 12) -
          (type === "confetti" ? 2 : 4);
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 15;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;
        this.opacity -= 0.006;
        this.rotation += this.rotationSpeed;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        if (this.type === "confetti") {
          ctx.fillRect(
            -this.size / 2,
            -this.size / 4,
            this.size,
            this.size / 2,
          );
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    let particles: Particle[] = [];
    let animationId: number;
    let isCelebrating = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const createFirework = (x: number, y: number) => {
      const colors = ["#FFD700", "#FFFFFF", "#00E5FF", "#FF007A"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, color, "firework"));
      }
    };

    const createConfetti = () => {
      if (!isCelebrating) return;
      const colors = ["#FFD700", "#C0C0C0", "#00E5FF", "#FF007A"];
      if (particles.length < 250) {
        for (let i = 0; i < 4; i++) {
          particles.push(
            new Particle(
              Math.random() * canvas.width,
              -20,
              colors[Math.floor(Math.random() * colors.length)],
              "confetti",
            ),
          );
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (isCelebrating && Math.random() < 0.02) {
        createFirework(
          Math.random() * canvas.width,
          Math.random() * (canvas.height * 0.4),
        );
      }
      createConfetti();
      particles = particles.filter((p) => p.opacity > 0);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();
    const timer = setTimeout(() => {
      isCelebrating = false;
    }, 5000);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      clearTimeout(timer);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};

// Рядок учасника
const RankingRow: React.FC<{
  data: RatingParticipant;
  isChampion?: boolean;
}> = ({ data, isChampion = false }) => {
  const rankIcons: Record<number, string> = {
    1: firstPlace,
    2: secondPlace,
    3: thirdPlace,
  };

  return (
    <div
      className={`flex items-center p-3 px-5 rounded-2xl transition-all duration-300 border ${
        isChampion
          ? "bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border-yellow-500/40 mb-3 scale-[1.02] shadow-lg shadow-yellow-500/10"
          : "bg-white/[0.03] border-transparent hover:bg-white/[0.06] hover:border-white/10"
      }`}
      style={{
        animation: `top10FadeInRow 0.5s ease forwards`,
        animationDelay: `${0.3 + data.rank * 0.05}s`,
        opacity: 0,
      }}
    >
      <div className="w-10 h-10 flex items-center justify-center mr-4 shrink-0">
        {isChampion ? (
          <img
            src={superPlace}
            alt="Чемпіон"
            className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(255,215,0,0.6)] top10-pulse-slow"
          />
        ) : rankIcons[data.rank] ? (
          <img
            src={rankIcons[data.rank]}
            alt={String(data.rank)}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="text-slate-500 font-bold border border-white/10 rounded-full w-8 h-8 flex items-center justify-center text-xs">
            {data.rank}
          </span>
        )}
      </div>

      <div className="flex-grow text-left">
        <span className="font-bold text-sm md:text-base block text-white leading-tight">
          {data.fullName}
        </span>
        <div className="flex items-center gap-1 text-[10px] md:text-xs text-slate-400 mt-0.5">
          <span className="text-sm">📍</span>{" "}
          {data.city ? `${data.city}, ${data.country}` : data.country}
        </div>
      </div>

      <div
        className={`font-black text-lg ${isChampion ? "text-yellow-400" : "text-yellow-500/80"}`}
      >
        {data.score}
      </div>
    </div>
  );
};

export const Top10Page: React.FC = () => {
  const { t } = useTranslation();
  const { olympiadId } = useParams<{ olympiadId: string }>();

  const { data: ratingData } = useQuery({
    queryKey: ["olympiad-rating-top", olympiadId],
    queryFn: () => getOlympiadRatingTop(olympiadId!),
    enabled: !!olympiadId,
  });

  const olympiad = ratingData?.data?.olympiad;
  const rating = ratingData?.data?.rating ?? [];
  const champion = rating.length > 0 ? rating[0] : null;
  const participants = rating.slice(1);

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      {/* Фонове свічення */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,_rgba(26,58,79,0.5)_0%,_rgba(7,30,44,1)_70%)]" />
      </div>

      <CelebrationCanvas active={true} />

      <main className="max-w-[600px] mx-auto px-5 py-12 relative z-10 text-center">
        {/* Логотип */}
        <div className="mb-8 top10-fade-in-down">
          <img
            src={spacemLogo}
            alt="Logo"
            className="w-32 md:w-36 mx-auto drop-shadow-2xl transition-all duration-500 hover:scale-105"
          />
        </div>

        <header className="mb-8">
          <span className="block text-[1.8rem] font-bold uppercase tracking-[2px] mb-[2px] bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
            {t("top10Page.title")}
          </span>
          {olympiad && (
            <>
              <h1 className="text-[1.3rem] font-black uppercase tracking-[1px] my-[5px] bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                {olympiad.title.uk || olympiad.title.pl || olympiad.title.en}
              </h1>
              <p className="text-[0.9rem] text-white/60 mt-[5px]">
                {olympiad.ageGroup}
                {olympiad.end_date &&
                  ` | ${new Date(olympiad.end_date).toLocaleDateString("uk-UA")}`}
              </p>
            </>
          )}
        </header>

        {/* Таблиця лідерів */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[20px] p-2 backdrop-blur-2xl shadow-2xl">
          {champion && <RankingRow data={champion} isChampion={true} />}

          <div className="flex flex-col gap-2">
            {participants.map((participant) => (
              <RankingRow key={participant.participantId} data={participant} />
            ))}
          </div>
        </div>
      </main>

      <style>{`
        .top10-pulse-slow {
          animation: top10PulseSlow 3s infinite ease-in-out;
        }
        @keyframes top10PulseSlow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(255,215,0,0.4)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 15px rgba(255,215,0,0.7)); }
        }
        .top10-fade-in-down {
          animation: top10FadeInDown 0.8s ease-out;
        }
        @keyframes top10FadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes top10FadeInRow {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
