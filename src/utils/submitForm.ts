export type SubmitPayload = Record<string, string | number | boolean | null | undefined>;

export interface SubmitResult {
  success: boolean;
  message?: string;
}

export const submitForm = async (form: string, payload: SubmitPayload): Promise<SubmitResult> => {
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
