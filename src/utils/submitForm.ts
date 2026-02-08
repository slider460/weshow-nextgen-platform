export type SubmitPayload = Record<string, string | number | boolean | null | undefined>;

export interface SubmitResult {
  success: boolean;
  message?: string;
}

export const defaultSuccessMessage = "Спасибо за вашу заявку, мы свяжемся с вами в ближайшее время.";

/** Сообщение после успешной подписки на рассылку */
export const subscriptionSuccessMessage = "Спасибо за подписку! Теперь вы будете получать информацию о новостях, последних технологиях и специальных предложениях.";

export const submitForm = async (form: string, payload: SubmitPayload): Promise<SubmitResult> => {
  if (typeof window !== "undefined") {
    const localHosts = new Set(["localhost", "127.0.0.1"]);
    if (localHosts.has(window.location.hostname)) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return { success: true, message: defaultSuccessMessage };
    }
  }

  const response = await fetch('/mail/send.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      form,
      ...payload,
    }),
  });

  let result: SubmitResult = { success: false, message: 'Ошибка отправки' };
  try {
    result = await response.json();
  } catch (error) {
    result = { success: false, message: 'Некорректный ответ сервера' };
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Ошибка отправки');
  }

  return result;
};
