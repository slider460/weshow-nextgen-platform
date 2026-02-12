export type LetterType = "letter" | "certificate" | "award" | "diploma";

export interface Letter {
  id: string;
  title: string;
  issuer: string;
  description?: string;
  type: LetterType;
  issued_date?: string | null;
  document_url?: string;
  is_visible: boolean;
  sort_order: number;
}

export const lettersData: Letter[] = [
  {
    id: "letter-1",
    title: "Благодарственное письмо от Министерства Туризма Самарской области",
    issuer: "Министерство туризма Самарской области",
    description:
      "За высокий профессионализм, личный вклад в подготовку и проведение региональной выставки «Самара».",
    type: "letter",
    issued_date: "2025-02-01",
    document_url: "/testimonials/pdf/museum-samara-thank-you.pdf",
    is_visible: true,
    sort_order: 1,
  },
  {
    id: "letter-2",
    title: "Благодарственное письмо от ТРЦ Саларис",
    issuer: 'АО "ЛАУТ"',
    description: "Благодарственное письмо по результату годовых проектов.",
    type: "letter",
    issued_date: "2018-04-01",
    document_url: "/testimonials/pdf/salaris-thank-you.pdf",
    is_visible: true,
    sort_order: 2,
  },
  {
    id: "letter-3",
    title: "Технический продакшн",
    issuer: 'Премия событийной индустрии "Многогранность"',
    description: "1 место в номинации «Технический продакшн / продюсирование».",
    type: "award",
    issued_date: "2024-01-01",
    document_url: "/testimonials/pdf/event-industry-award.pdf",
    is_visible: true,
    sort_order: 3,
  },
  {
    id: "letter-4",
    title: "Поставщик технических инновационных продуктов",
    issuer: 'Премия событийной индустрии "Многогранность"',
    description: "1 место в номинации «Поставщик технических инновационных продуктов».",
    type: "award",
    issued_date: "2024-01-01",
    document_url: "/testimonials/pdf/technical-innovations-award.pdf",
    is_visible: true,
    sort_order: 4,
  },
];

export const getVisibleLetters = (): Letter[] =>
  lettersData
    .filter((letter) => letter.is_visible)
    .sort((a, b) => a.sort_order - b.sort_order);



