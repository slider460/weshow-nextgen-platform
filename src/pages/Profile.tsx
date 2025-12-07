import { useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";

const Profile = () => {
  const { user, profile, signOut } = useAuth();

  const displayName = useMemo(() => {
    if (profile?.full_name) return profile.full_name;
    if (user?.name) return user.name;
    return "Гость";
  }, [profile?.full_name, user?.name]);

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white py-24 px-4">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">WeShow Playlab</p>
          <h1 className="text-4xl font-black tracking-tight">
            Профиль&nbsp;
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              пользователя
            </span>
          </h1>
          <p className="text-base text-white/70">
            Сайт работает в локальном режиме, поэтому данные авторизации сохраняются на устройстве. Вы можете
            обновить имя компании для персонализации отображения в шапке.
          </p>
        </header>

        <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.8)] md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-wide text-white/60">Имя</p>
            <p className="text-2xl font-semibold text-white">{displayName}</p>

            <p className="text-sm uppercase tracking-wide text-white/60">Компания</p>
            <p className="text-lg text-white">
              {profile?.company_name || "Компания не указана"}
            </p>

            <p className="text-sm uppercase tracking-wide text-white/60">Email</p>
            <p className="text-lg text-white">{user?.email || "guest@weshow.local"}</p>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/30 p-6 space-y-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-white/60">Статус</p>
              <p className="text-lg font-semibold text-white">{profile?.role || "guest"}</p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-wide text-white/60">Последнее обновление</p>
              <p className="text-lg text-white">
                {profile?.updated_at
                  ? new Date(profile.updated_at).toLocaleString("ru-RU")
                  : "—"}
              </p>
            </div>

            <Button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:from-cyan-400 hover:to-purple-500"
            >
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;








