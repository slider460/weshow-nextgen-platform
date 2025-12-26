import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "../../contexts/AuthContext";

type AuthMode = "signin" | "signup" | "reset";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

const initialForm = {
  email: "",
  password: "",
  full_name: "",
  company_name: "",
};

export const AuthModal = ({ isOpen, onClose, initialMode = "signin" }: AuthModalProps) => {
  const { login, signUp, resetPassword } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
    setMessage(null);
  }, [initialMode, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm);
      setLoading(false);
      setMessage(null);
    }
  }, [isOpen]);

  const title = useMemo(() => {
    switch (mode) {
      case "signup":
        return "Создать аккаунт";
      case "reset":
        return "Восстановление доступа";
      default:
        return "Войти в аккаунт";
    }
  }, [mode]);

  const handleChange = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (mode === "signin") {
        const result = await login(form.email, form.password);
        if (!result.success) {
          setMessage(result.error || "Не удалось войти");
          setLoading(false);
          return;
        }
        onClose();
      } else if (mode === "signup") {
        await signUp(form.email, form.password, {
          full_name: form.full_name,
          company_name: form.company_name,
        });
        onClose();
      } else {
        await resetPassword(form.email);
        setMessage("Ссылка для восстановления отправлена (демо-режим).");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Что-то пошло не так");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-[130] w-full max-w-md rounded-3xl border border-white/10 bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">WeShow Portal</p>
            <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Закрыть окно авторизации"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {(mode === "signin" || mode === "signup" || mode === "reset") && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={handleChange("email")}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                placeholder="you@example.com"
              />
            </div>
          )}

          {(mode === "signin" || mode === "signup") && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">Пароль</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={handleChange("password")}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                placeholder="Введите пароль"
              />
            </div>
          )}

          {mode === "signup" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Имя</label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={handleChange("full_name")}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                  placeholder="Иван Иванов"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Компания</label>
                <input
                  type="text"
                  value={form.company_name}
                  onChange={handleChange("company_name")}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                  placeholder="WeShow"
                />
              </div>
            </>
          )}

          {message && <p className="text-sm text-rose-500">{message}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500"
          >
            {loading ? "Обработка..." : mode === "signup" ? "Создать аккаунт" : mode === "reset" ? "Восстановить" : "Войти"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          {mode === "signin" && (
            <>
              <button className="text-cyan-600 hover:underline" onClick={() => setMode("reset")} type="button">
                Забыли пароль?
              </button>
              <div className="mt-2">
                Нет аккаунта?{" "}
                <button className="text-cyan-600 hover:underline" onClick={() => setMode("signup")} type="button">
                  Зарегистрируйтесь
                </button>
              </div>
            </>
          )}
          {mode === "signup" && (
            <button className="text-cyan-600 hover:underline" onClick={() => setMode("signin")} type="button">
              Уже есть аккаунт? Войдите
            </button>
          )}
          {mode === "reset" && (
            <button className="text-cyan-600 hover:underline" onClick={() => setMode("signin")} type="button">
              Вернуться к входу
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;









