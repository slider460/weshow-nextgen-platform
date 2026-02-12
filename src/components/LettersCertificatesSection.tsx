import { useMemo, useState, type ReactNode } from "react";
import { Award, ExternalLink, FileText, GraduationCap, Trophy } from "lucide-react";
import { getVisibleLetters } from "../data/letters";
import type { Letter } from "../data/letters";
import AchievementModal from "./AchievementModal";

const typeStyles: Record<Letter["type"] | "default", { icon: ReactNode; wrapper: string; iconColor: string }> = {
  letter: {
    icon: <FileText className="h-5 w-5" />,
    wrapper: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  certificate: {
    icon: <Award className="h-5 w-5" />,
    wrapper: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  award: {
    icon: <Trophy className="h-5 w-5" />,
    wrapper: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  diploma: {
    icon: <GraduationCap className="h-5 w-5" />,
    wrapper: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  default: {
    icon: <FileText className="h-5 w-5" />,
    wrapper: "bg-slate-200",
    iconColor: "text-slate-600",
  },
};

const formatDate = (value?: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("ru-RU", { month: "long", year: "numeric" });
};

const LettersCertificatesSection = () => {
  const letters = useMemo(() => getVisibleLetters(), []);
  const [selected, setSelected] = useState<Letter | null>(null);
  const [open, setOpen] = useState(false);

  if (!letters.length) return null;

  return (
    <section className="relative overflow-hidden bg-[#f6f5f8] py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-36 h-[34rem] w-[34rem] rounded-full bg-violet-200 blur-3xl opacity-60" />
        <div className="absolute -bottom-24 -right-36 h-[30rem] w-[30rem] rounded-full bg-indigo-200 blur-3xl opacity-60" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Наши <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">достижения</span>
          </h2>
          <p className="mt-4 text-base text-gray-600 md:text-lg">
            Признание нашей работы от ведущих компаний и организаций
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {letters.map((letter) => {
            const styles = typeStyles[letter.type] ?? typeStyles.default;
            return (
              <button
                type="button"
                key={letter.id}
                onClick={() => {
                  setSelected(letter);
                  setOpen(true);
                }}
                className="flex h-full flex-col rounded-3xl bg-white p-6 text-left shadow-lg shadow-gray-500/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-gray-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-4"
              >
                <div className="mb-4 flex items-center gap-4">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles.wrapper}`}>
                    <span className={styles.iconColor}>{styles.icon}</span>
                  </span>
                  <p className="text-sm text-gray-500">
                    {formatDate(letter.issued_date) || "Дата не указана"}
                  </p>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{letter.title}</h3>
                {letter.issuer && <p className="text-sm font-medium text-gray-600">{letter.issuer}</p>}
                {letter.description && <p className="mt-3 text-sm text-gray-600">{letter.description}</p>}
                <div className="mt-6 flex items-center justify-between text-sm font-semibold text-blue-600">
                  <span>Узнать подробнее</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </button>
            );
          })}
        </div>

        <AchievementModal letter={selected} open={open} onOpenChange={setOpen} />
      </div>
    </section>
  );
};

export default LettersCertificatesSection;
