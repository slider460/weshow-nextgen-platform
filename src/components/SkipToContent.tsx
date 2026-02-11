/**
 * Ссылка «Перейти к контенту» для доступности (клавиатура, скринридеры).
 * Скрыта визуально, видна при фокусе (Tab).
 */
const SkipToContent = () => (
  <a
    href="#main"
    className="fixed left-2 top-2 z-[9999] -translate-y-[200%] rounded-md bg-slate-900 px-4 py-2 text-white shadow-lg outline-none focus:translate-y-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform"
  >
    Перейти к контенту
  </a>
);

export default SkipToContent;
