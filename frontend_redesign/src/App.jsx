import React, { useState } from 'react';

import { Routes, Route } from "react-router-dom";

import { Header } from '~/components/layout/Header';
import { Footer } from '~/components/layout/Footer'; // Используем экспорт по умолчанию
import { HomePage } from './pages/HomePage';
import { NewsPage } from './pages/NewsPage';

import { CallbackModal } from '~/components/ui/modal/CallbackModal';

import { Stp } from '~/components/ui/Stp';

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative flex flex-col  min-h-screen bg-[#0C0E15] text-white"> {/* Можете добавить фон здесь */}
      <Header onOpenModalCallBack={() => setIsModalOpen(true)} navIsActive={true} />
      <Stp />
      <Routes>
        <Route path="/" element={<HomePage onOpenModalCallBack={() => setIsModalOpen(true)} />} />
        <Route path="/news" element={<NewsPage />} />
      </Routes>

      <Footer onOpenModalCallBack={() => setIsModalOpen(true)} />

      <CallbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>


  );
}

export default App;

