import { AlertCircle } from "lucide-react";

export const SanctionedWarning = () => (
  <div className="p-4 bg-primary-red rounded-lg flex gap-4 justify-center items-center">
    <AlertCircle className="w-5 h-5 text-white flex-shrink-0" />
    <div className="text-sm text-white">
      Данный автомобиль попадает под санкционные ограничения.
      Расчёт будет произведён по тарифам для санкционных автомобилей.
    </div>
  </div>
);