import React, { useState } from "react";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { API_URL } from "../config";

const schema = z.object({
  name: z.string().min(2, "Введите ваше имя"),
  phone: z
    .string()
    .min(10, "Введите корректный номер телефона")
    .regex(/^[0-9+\s()-]+$/, "Некорректный формат номера"),
  email: z.string().email("Введите корректный email"),
  budget: z.string().min(1, "Укажите ваш бюджет"),
  city: z.string().min(2, "Укажите ваш город"),
  contactMethod: z.enum(["whatsapp", "telegram", "phone"], {
    required_error: "Выберите способ связи",
  }),
});

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/notification/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setError("Ошибка при отправке формы. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-8 md:py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-200"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="bg-white/90 dark:bg-gray-800/90 p-4 md:p-8 rounded-2xl backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Наши менеджеры
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  С 10:00 до 01:00 (по Владивостоку)
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Связаться с нами
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  sgvautoimport@gmail.com <br />
                  +7 (914) 074-43-00
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Заходите к нам
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  г. Владивосток, ул. Русская 99 <br />
                  <span className="text-sm">
                    (Встреча в офисе по предварительной записи)
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/90 dark:bg-gray-800/90 p-4 md:p-8 rounded-2xl backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Задумались об авто? Давайте поможем выбрать →
            </h2>

            {success && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg">
                Спасибо за заявку! Мы свяжемся с вами в ближайшее время.
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {[
                { name: "name", placeholder: "Ваше имя" },
                { name: "phone", placeholder: "Номер телефона", type: "tel" },
                {
                  name: "email",
                  placeholder: "Электронная почта",
                  type: "email",
                },
                { name: "budget", placeholder: "Ваш бюджет" },
                { name: "city", placeholder: "Ваш город" },
              ].map(({ name, placeholder, type = "text" }) => (
                <div key={name}>
                  <input
                    type={type}
                    placeholder={placeholder}
                    {...register(name)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  {errors[name] && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors[name]?.message}
                    </p>
                  )}
                </div>
              ))}

              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {["whatsapp", "telegram", "phone"].map((method) => (
                  <label key={method} className="relative flex cursor-pointer">
                    <input
                      type="radio"
                      value={method}
                      {...register("contactMethod")}
                      className="peer sr-only"
                    />
                    <div className="flex items-center justify-center w-full p-2 md:p-3 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg peer-checked:border-red-500 peer-checked:bg-red-50 dark:peer-checked:bg-red-900/20 peer-checked:text-red-500">
                      <span className="text-sm capitalize">
                        {method === "phone" ? "Звонок" : method}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
              {errors.contactMethod && (
                <p className="mt-1 text-sm text-red-500">
                  Выберите способ связи
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span>Отправка...</span>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </>
                ) : (
                  <>
                    <span>Отправить</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                Отправляя данные, вы соглашаетесь с&nbsp;
                <a
                  href="/docs/user-agreement.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-red-500 transition-colors"
                >
                  пользовательским соглашением
                </a>
                &nbsp;и&nbsp;
                <a
                  href="/docs/privacy-policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-red-500 transition-colors"
                >
                  политикой обработки персональных данных
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
