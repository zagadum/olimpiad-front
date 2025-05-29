import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrentUserQuery } from "@/entities/auth";

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const { data: user } = useCurrentUserQuery();

  return (
    <>
      <main className="flex-1 p-6 overflow-auto">
        {/* Верхній блок з даними користувача */}
        <div className="flex items-center mb-8">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-1">{user?.lastname ?? ''} {user?.surname ?? ''}</h2>
            <span className="text-sm text-gray-300 mb-1">{t('userInfo.role')}</span>
            <span className="text-sm text-gray-300">{t('userInfo.phone')}</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center bg-[#1A1F25] px-3 py-1 rounded">
              <img src="/assets/coin-icon.png" alt="Space Coins" className="w-5 h-5 mr-2" />
              <span className="font-semibold">1449</span>
            </div>
            <div>
              <img src="/assets/user-avatar.jpg" alt="User Avatar"
                   className="w-12 h-12 rounded-full object-cover border-2 border-white" />
            </div>
          </div>
        </div>

        {/* Центральний контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Блок зі статистикою */}
          <div className="bg-[#1A1F25] rounded p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('stats.avgTime')}</h3>
              <p className="text-4xl font-bold mb-4">12 {t('stats.minutes')}</p>
            </div>
            <div className="flex space-x-6">
              <div className="text-center">
                <img src="/assets/stats-icon.png" alt="Statistics Icon" className="w-10 h-10 mx-auto mb-2" />
                <p className="text-sm">{t('stats.statistics')}</p>
              </div>
              <div className="text-center">
                <img src="/assets/book-icon.png" alt="Homework Icon" className="w-10 h-10 mx-auto mb-2" />
                <p className="text-sm">{t('stats.homework')}</p>
              </div>
              <div className="text-center">
                <img src="/assets/join-icon.png" alt="Join Icon" className="w-10 h-10 mx-auto mb-2" />
                <p className="text-sm">{t('stats.joinIdea')}</p>
              </div>
            </div>
          </div>

          {/* Блок з рейтингом */}
          <div className="bg-[#1A1F25] rounded p-4">
            <h3 className="text-lg font-semibold mb-2">{t('rating.title')}</h3>
            <ul className="space-y-2">
              <li className="flex justify-between border-b border-gray-600 pb-2">
                <span>Adam Kowalska</span>
                <span>950</span>
              </li>
              <li className="flex justify-between border-b border-gray-600 pb-2">
                <span>Marina Koval</span>
                <span>920</span>
              </li>
              <li className="flex justify-between border-b border-gray-600 pb-2">
                <span>Maks Nowak</span>
                <span>880</span>
              </li>
            </ul>
          </div>

          {/* Блок новин */}
          <div className="bg-[#1A1F25] rounded p-4 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-2">{t('news.title')}</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div>• {t('news.item1')}</div>
              <div>• {t('news.item2')}</div>
              <div>• {t('news.item3')}</div>
            </div>
          </div>
        </div>
      </main>

      {/* Персонаж праворуч */}
      <aside className="hidden xl:flex flex-col items-center justify-center p-4 bg-[#0B0E13]">
        <img src="/assets/cat-character.png" alt="Character" className="w-48 h-auto" />
      </aside>
    </>
  );
};
